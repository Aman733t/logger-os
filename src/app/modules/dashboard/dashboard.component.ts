import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PackagesModule } from '../../libs/packages/packages.module';
import { ApiService } from '../../services/api.service';
import { MatDrawer } from '@angular/material/sidenav';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PackagesModule],
  providers: [ApiService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  @ViewChild(MatDrawer) drawer!: MatDrawer;
  public queryParams:any;
  public serversList: any = []
  public hostObj:any = {};
  public loader:any
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private _snackBar: MatSnackBar, public dialog: MatDialog) { 
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.getServerInfo()
      // if (Object.keys(params).length > 0) {
      //   this.queryParams = params;
      // } else {
      //   console.log('add token on login')
      // }
    });
  }


  refresh(){
    this.api.refreshNeeded().subscribe((response) => {
      setTimeout(() => {
        this.getServerInfo();
      }, 200)
    })
  }

  getServerInfo(){
    this.api.getServerInfo(null).subscribe((response:any)=>{
      if(response['code'] == 1){
        this.serversList = [...response['result']]
      } else {
        this._snackBar.open(response['msg'],'OK');
      }
    })
  }

  checkConnection(){
    if(this.serversList.length > 0){
      this.serversList.forEach((server:any) => {
        console.log(server);
      });
    }
  }

  getSeverHeartBeat(id:any){
    
  }

  deleteServer(server:any){

  }


  saveInstance(){
    if(Object.keys(this.hostObj).length > 0){
      this.api.saveServerInfo(this.hostObj).subscribe((response:any)=>{
        if(response['code'] != 1){
          this._snackBar.open(response['msg'],'OK');
        }
      })
    }
  }

  connectToServer(server: any) {
    this.router.navigate(['/logger/'],{ queryParams: { serverid:server.id } })
  }

}
