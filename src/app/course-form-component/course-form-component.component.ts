import { Component, Input } from '@angular/core';
import { CoursesServiceService } from '../Components/Services/CoursesService/courses-service.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course } from '../Modules/Course';
import { MatCardModule } from '@angular/material/card';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-course-form-component',
  imports: [ReactiveFormsModule,MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule,MatButtonModule,FormsModule ],
  templateUrl: './course-form-component.component.html',
  styleUrl: './course-form-component.component.css'
})
export class CourseFormComponentComponent {
  @Input() action = ""; 
  courseId: string | null = null;

  courseForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    teacherId: new FormControl<string>('', [Validators.required])
  });

  constructor(private CoursesService: CoursesServiceService, private router: ActivatedRoute,private routerLinks: Router) 
  {
    this.router.paramMap.subscribe(params => {
      this.courseId = params.get('id');
      if (this.courseId) {
        this.action = 'update';
        this.loadCourseData(this.courseId); 
      } else {
        this.action = 'add';
      }
    });
  }

  loadCourseData(id: string) {
    this.CoursesService.getCourseById(id).subscribe(course => {
      this.courseForm.patchValue(course); 
    });
  }

  sent() {
    if (this.action === "add") {
      this.add();
    } else {
      this.update();
    }
  }

  add() {
    if (this.courseForm.valid) {
      this.CoursesService.addCourse(this.courseForm.value as Partial<Course>).subscribe({
        next: (response) => {
          alert("Course added");
          this.routerLinks.navigate(['courses']);
        },
        error: (err) => {
          alert("can't add course");
        }
      });
    }
  }

  update() {
    if (this.courseForm.valid && this.courseId) {
      this.CoursesService.updateCourse(this.courseForm.value as Partial<Course>,this.courseId).subscribe({
        next: (response) => {
          alert("Course updated");
          this.routerLinks.navigate(['courses']);
        },
        error: (err) => {
          alert("can't update course");
        }
      });
    }
  }

}
