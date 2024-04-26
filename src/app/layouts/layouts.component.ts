import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PackagesModule } from '../libs/packages/packages.module';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [PackagesModule],
  providers:[ApiService],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss'
})
export class LayoutsComponent {
  public queryParams:any;
  public username: any = 'Admin';

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private _snackBar: MatSnackBar, public dialog: MatDialog){

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      // if (Object.keys(params).length > 0) {
      //   this.queryParams = params;
      // } else {
      //   this.router.navigate(['/']);
      // }
    });
  }

  home(){
    sessionStorage.clear();
    this.router.navigate(['/dashboard']);
  }


}
