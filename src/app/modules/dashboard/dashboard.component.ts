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

  getServerInfo(){
    if(localStorage.getItem('server_info')){
      console.log('called..')
      let hostInfo:any = localStorage.getItem('server_info');
      let serverInfo:any = JSON.parse(hostInfo);
      this.serversList.push(serverInfo);
    }
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
    console.log(server);
    let id = server.id;
    let serverdb:any = localStorage.getItem('server_info');
    let db = JSON.parse(serverdb);
    db.forEach((list:any)=>{
      console.log(list);
    })
  }


  saveInstance(){
    let serverArr = [];
    this.hostObj.id = this.serversList.length ? this.serversList.length + 1 : 1
    serverArr.push(this.hostObj)
    localStorage.setItem('server_info',JSON.stringify(this.hostObj));
    this.hostObj = {};
    this.drawer.toggle();
  }

  connectToServer(server: any) {
    console.log(server);
    this.router.navigate(['/logger/'],{ queryParams: { serverid:server.id } })
  }

}
