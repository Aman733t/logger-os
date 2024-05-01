import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PackagesModule } from '../../libs/packages/packages.module';
import { ApiService } from '../../services/api.service';
import { TerminalComponent } from '../terminal/terminal.component';
@Component({
  selector: 'app-logger',
  standalone: true,
  imports: [PackagesModule,TerminalComponent],
  providers: [ApiService],
  templateUrl: './logger.component.html',
  styleUrl: './logger.component.scss'
})
export class LoggerComponent {
  public queryParams:any;
  public displayedColumns: string[] = ['id', 'name', 'namespace', 'version','mode','pid','uptime','status','cpu','mem','user','watching','action'];
  public dataSource:any = [];
  public serverInfo:any;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private _snackBar: MatSnackBar, public dialog: MatDialog){

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (Object.keys(params).length > 0) {
        this.queryParams = params;
        this.getServerInfo();
        this.refresh();
      } else {
        this.router.navigate(['/']);
      }
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
    this.api.getServerInfo(this.queryParams.serverid).subscribe((response:any)=>{
      if(response['code'] == 1){
        this.serverInfo = response['result'][0];
        this.getServices();
      } else {
        this._snackBar.open(response['msg'],'OK');
      }
    })
  }

  getServices(){
    if(Object.keys(this.serverInfo)){
      let baseUrl:any = this.serverInfo['server_url'];
      this.api.getServices(baseUrl).subscribe((response:any)=>{
        let processArr:any = [];
        response.forEach((process:any)=>{
          if(process['name'] != 'logger_api'){
            let serviceObj:any = {};
            serviceObj['id'] = process['pm_id'];
            serviceObj['name'] = process['name'];
            serviceObj['namespace'] = process['pm2_env']['namespace'];
            serviceObj['version'] = process['pm2_env']['version'];
            serviceObj['mode'] = null;
            serviceObj['pid'] = process['pid'];
            serviceObj['uptime'] = process['pm2_env']['pm_uptime'];
            serviceObj['status'] = process['pm2_env']['status'];
            serviceObj['cpu'] = process['monit']['cpu']+'%';
            serviceObj['mem'] = process['monit']['memory'];
            serviceObj['user'] = process['pm2_env']['username'];
            serviceObj['watching'] = process['pm2_env']['watch'];
            serviceObj['out_log'] = process['pm2_env']['pm_out_log_path'];
            serviceObj['error_log'] = process['pm2_env']['pm_err_log_path'];
            processArr.push(serviceObj);
          }
        })
        this.dataSource = [...processArr]
      })
    } else {
      this._snackBar.open('No Server Info Found..','OK');
    }
  }

  openTerminal(log:any,logType:any){
    let params:any ={
      serverid:this.queryParams.serverid,
      baseurl:this.serverInfo['server_url'],
      processid:log.id,
      type:logType,
      out_log:log.out_log,
      error_log:log.error_log,
      name:log.name
    }
    this.router.navigate(['/terminal'],{queryParams:params})
  }

  processAction(process:any,action:any){
    let baseUrl = this.serverInfo['server_url'];
    let processId = process.id;
    this.api.loggerAction(baseUrl,action,processId).subscribe((response:any)=>{
      console.log(response);
    })
  }

  bytesToSize(bytes:any) {
    let kilobyte = 1024
    let megabyte = kilobyte * 1024
    let gigabyte = megabyte * 1024
    let terabyte = gigabyte * 1024
    if ((bytes >= 0) && (bytes < kilobyte)) {
      return bytes + 'b '
    } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
      return (bytes / kilobyte).toFixed(2) + 'kb '
    } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
      return (bytes / megabyte).toFixed(2) + 'mb '
    } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
      return (bytes / gigabyte).toFixed(2) + 'gb '
    } else if (bytes >= terabyte) {
      return (bytes / terabyte).toFixed(2) + 'tb '
    } else {
      return bytes + 'b '
    }
  }



}
