import { Routes } from '@angular/router';
import { CoursesComponent } from './Components/courses/courses.component';
import { ConnectComponent } from './Components/connect/connect.component';
import { ShowCourseComponent } from './Components/show-course/show-course.component';
import { CourseFormComponentComponent } from './course-form-component/course-form-component.component';

export const routes: Routes = [
    { path: '', component: ConnectComponent },
    {
        path: 'courses', component: CoursesComponent, children: [
            { path: ':id', component: ShowCourseComponent } 
        ]
    },
    { path: 'add', component: CourseFormComponentComponent },
    { path: 'update/:id', component: CourseFormComponentComponent }, 

];
