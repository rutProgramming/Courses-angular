import { Component } from '@angular/core';
import { CoursesServiceService } from '../Services/CoursesService/courses-service.service';
import { Course } from '../../Modules/Course';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserDetailsService } from '../Services/userDetailsService/user-details.service';
import { Observable } from 'rxjs';
import { User } from '../../Modules/User';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-courses',
  imports: [CommonModule,MatCardModule, MatButtonModule, RouterLink, RouterOutlet],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courses: Course[] = [];
  user$:Observable<Partial<User>>;
  flagAdd: boolean = false;
  constructor(private coursesService: CoursesServiceService, private userDetailsService: UserDetailsService,private router:Router) {
    this.coursesService.getCourses().subscribe(courses => this.courses = courses);
    this.user$ = this.userDetailsService.getUser();
  }
  joinToCourse(courseId: string) {
    this.userDetailsService.getUser().subscribe(user => {
      if (user.userId)
        this.coursesService.joinStudentToCourse(courseId, user.userId).subscribe(({
          error: () => {
            alert("can't join course")
          }
        }));

    });
  }
  leaveTheCourse(courseId: string) {
    this.userDetailsService.getUser().subscribe(user => {
      if (user.userId)
        this.coursesService.leaveCourse(courseId, user.userId).subscribe({
          error: () => {
            alert("can't leave course")
          }
        });
    });
  }
  deleteTheCourse(courseId: string) {
    this.coursesService.deleteCourse(courseId).subscribe({
      next:(response)=>{
        console.log(response);
      },
      error: () => {
        alert("can't delete course")
      }
    });
  }
  editTheCourse(courseId: string) {
    this.router.navigate(['update', courseId]);
  }
  addNewCourse() {
    this.router.navigate(['add']);
  }
}
