import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetailsService } from '../userDetailsService/user-details.service';
import { Course } from '../../Modules/Course';
import { Lesson } from '../../Modules/Lesson';

@Injectable({
  providedIn: 'root'
})
export class CoursesServiceService {
  private apiUrl = 'http://localhost:3000/api/courses';
  constructor(private http: HttpClient, private userDetailsService: UserDetailsService) { }

  private getHeaders(): HttpHeaders {
    let token = this.userDetailsService.getToken();
    console.log(token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl, { headers: this.getHeaders() });
  }
  getLessons(id: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.apiUrl}/:${id}/lessons`, { headers: this.getHeaders() });
  }
  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
  addCourse(course: Partial<Course>): Observable<any> {
    return this.http.post(this.apiUrl, course, { headers: this.getHeaders() });
  }

  deleteCourse(id: string|undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
  }

  updateCourse(course: Partial<Course>, id: string|undefined): Observable<Partial<Course>> {
    return this.http.put(`${this.apiUrl}/${id}`,course,{  headers: this.getHeaders() })
  }

  joinStudentToCourse(courseId: string, userId: string): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/${courseId}/enroll`, { userId }, { headers: this.getHeaders() });
  }
  leaveCourse(courseId: string, userId: string): Observable<Course> {
    const url = `${this.apiUrl}/${courseId}/unenroll`;
    const body = { userId }; 
    return this.http.delete<Course>(url, { body, headers: this.getHeaders() });
  }
}
