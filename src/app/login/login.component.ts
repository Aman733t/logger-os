import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PackagesModule } from '../libs/packages/packages.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PackagesModule],
  providers: [ApiService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public company_name: any;
  public user_email: any;
  public user_password: any;
  public loader: any = false;
  public pass_type: any = 'password';
  public show_password: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  login() {
    if (this.user_email && this.user_password) {
      this.api.getUserLogin(this.user_email,this.user_password).subscribe((response:any)=>{
        console.log(response);
        if(response['code'] == 1){
          localStorage.setItem('logger_token',response['token']);
          localStorage.setItem('logger_user_email',response['result']['user_email'])
          localStorage.setItem('logger_user_name',response['result']['user_name'])
          this.router.navigate(['/dashboard']);
        } else {
          this.openSnackBar(response['msg'],'OK');
        }
      })
    } else {
      this.openSnackBar('Email Or Password Missing..', 'OK');
    }
  }

  showPassword(text: any) {
    if (text == 'off') {
      this.show_password = true;
      this.pass_type = 'text';
    } else if (text == 'on') {
      this.show_password = false;
      this.pass_type = 'password';
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

}
