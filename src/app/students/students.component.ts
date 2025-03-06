import { Component } from '@angular/core';
import { Student } from '../../Student';
import { SrudentDetailsComponent } from '../srudent-details/student-details.component'; 
import { NewStudentComponent } from '../new-student/new-student.component';
import { InfromationCardComponent } from '../infromation-card/infromation-card.component';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [StudentsComponent,SrudentDetailsComponent,NewStudentComponent ,InfromationCardComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {
     flagS:boolean = false;
     flagDeleted:boolean = false;
    stude: Student[] = [new Student("moshenko", 15, "Moscow", 8975555555, true, 85, undefined, false),
    new Student("tulsi", 17, "Pune", 98744, false, 85, undefined, false), new Student("maz", 16, "yoly", 98744, true, 85, undefined, false)];
  
    deleteStudent(item: Student) {
      item.DeleteStudent=true; 
    }
    Delete=(e:Student) => {
      this.stude = this.stude.filter(s => s.id !== e.id);
    }
    
    updateStudent(item: Student) {
      item.flag = true
    }
     addStudent() {
           this.flagS=true
     }
     saveStud=(e:Student) => {
          this.stude.push(e)
          this.flagS=false
     }
}
