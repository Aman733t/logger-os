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
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private _snackBar: MatSnackBar, public dialog: MatDialog){

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (Object.keys(params).length > 0) {
        this.queryParams = params;
        this.getServices();
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  getServices(){
    this.api.getServices().subscribe((response:any)=>{
      let processArr:any = [];
      response.forEach((process:any)=>{
        if(process['name'] != 'logger_API'){
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
      console.log(this.dataSource)
    })
  }

  clearSession(){
    sessionStorage.clear();
  }

  openTerminal(log:any,logType:any){
    this.clearSession();
    sessionStorage.setItem(`log_${log.id}`,JSON.stringify(log))
    this.router.navigate(['/terminal'],{queryParams:{id:log.id,type:logType}})
  }



}
