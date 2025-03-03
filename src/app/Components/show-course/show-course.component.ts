import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoursesServiceService } from '../Services/CoursesService/courses-service.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../Modules/Course';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../Modules/User';
import { UserService } from '../Services/UserService/user.service';
import { CommonModule } from '@angular/common';
import { Lesson } from '../../Modules/Lesson';
import { log } from 'console';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';

@Component({
  imports: [CommonModule,MatCardModule,MatDivider  ],
  selector: 'app-show-course',
  templateUrl: './show-course.component.html',
  styleUrls: ['./show-course.component.css']
})
export class ShowCourseComponent implements OnInit, OnDestroy {
  course?: Course;
  teacher$!: Observable<User>;
  lessons$!: Observable<Lesson[]>;

  private subscription = new Subscription();

  constructor(private coursesService: CoursesServiceService, private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.subscription.add(
      this.activatedRoute.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.subscription.add(
            this.coursesService.getCourseById(id).subscribe(course => {
              this.course = course;
              if (this.course.teacherId) {
                this.teacher$ = this.userService.GetUserById(this.course.teacherId);
              }
              if (this.course.id) {
                this.lessons$ = this.coursesService.getLessons(this.course.id);
              }
            })
          );
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}