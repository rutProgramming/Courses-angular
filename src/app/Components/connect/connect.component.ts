import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { LoginComponent } from '../login/login.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
@Component({
  standalone: true,
  selector: 'app-connect',
  imports: [ MatDialogModule,MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.css'
})
export class ConnectComponent {
  private dialog = inject(MatDialog); 
  SignUp() {
    this.dialog.open(SignUpComponent);
  }
  SignIn() {
    this.dialog.open(LoginComponent);
  }
}
