import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Course } from '../../Modules/Course';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CoursesServiceService } from '../../Services/CoursesService/courses-service.service';
import { map, catchError, of } from 'rxjs';
import { UserService } from '../../Services/UserService/user.service';

@Component({
  selector: 'app-course-form-component',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
  templateUrl: './course-form-component.component.html',
  styleUrl: './course-form-component.component.css'
})
export class CourseFormComponentComponent {
  action: string = "";
  courseId: string | null = null;

  courseForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    teacherId: new FormControl<string>('', [Validators.required], [this.teacherIdExistsValidator()]),
    lessons: new FormArray<FormGroup>([])
  });

  constructor(private CoursesService: CoursesServiceService, private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id');
      if (this.courseId) {
        this.action = 'update';
        this.loadCourseData(this.courseId);
      } else {
        this.action = 'add';
      }
    });
  }

  get lessons(): FormArray {
    return this.courseForm.get('lessons') as FormArray;
  }

  addLesson(): void {
    this.lessons.push(new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    }));
  }

  removeLesson(index: number): void {
    this.lessons.removeAt(index);
  }

  loadCourseData(id: string): void {
    this.CoursesService.getCourseById(id).subscribe(course => {
      this.courseForm.patchValue({
        title: course.title,
        description: course.description,
        teacherId: course.teacherId,
      });

      this.lessons.clear();

      if (course.lessons && course.lessons.length > 0) {
        course.lessons.forEach(lesson => {
          this.lessons.push(new FormGroup({
            title: new FormControl(lesson.title, Validators.required),
            content: new FormControl(lesson.content, Validators.required)
          }));
        });
      }

      console.log('Course loaded:', this.courseForm.value);
    });
  }

  send(): void {
    console.log('Form before submit:', this.courseForm.value);
    console.log(this.action);

    const preparedData = this.prepareCourseData();
    console.log('Prepared data:', preparedData);

    if (this.action === "add") {
      this.add();
    } else {
      this.update();
    }
  }

  private prepareCourseData(): Partial<Course> {
    return {
      title: this.courseForm.value.title ?? undefined,
      description: this.courseForm.value.description ?? undefined,
      teacherId: this.courseForm.value.teacherId ?? undefined,
      lessons: this.lessons.controls.map(control => control.value)
    };
  }

  add(): void {
    console.log('Form after submit:', this.courseForm.value);
    if (this.courseForm.valid) {
      this.CoursesService.addCourse(this.prepareCourseData()).subscribe({
        next: () => {
          alert("Course added");
          this.router.navigate(['courses']);
        },
        error: () => {
          alert("Can't add course");
        }
      });
    }
  }

  update(): void {
    if (this.courseForm.valid && this.courseId) {
      this.CoursesService.updateCourse(this.prepareCourseData(), this.courseId).subscribe({
        next: () => {
          alert("Course updated");
          this.router.navigate(['courses']);
        },
        error: () => {
          alert("Can't update course");
        }
      });
    }
  }

  teacherIdExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | any => {
      return this.userService.GetUserById(control.value).pipe(
        map(user => {
          return user ? null : { teacherIdNotExists: true };
        }),
        catchError(() => {
          return of({ teacherIdNotExists: true });
        })
      );
    };
  }
}