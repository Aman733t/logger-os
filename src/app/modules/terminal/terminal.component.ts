import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PackagesModule } from '../../libs/packages/packages.module';
import { ApiService } from '../../services/api.service';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [PackagesModule],
  providers: [ApiService],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss'
})
export class TerminalComponent {
  public queryParams:any;
  public term: any = new Terminal({ cursorBlink: true,rows:30,cols:100});
  public fitAddon: any = new FitAddon();
  public offset:any = 1;
  public messageArr: any = [{
    "type": "sent",
    "user": "bot",
    "body": "Hello",
    "img":""
  }];
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private _snackBar: MatSnackBar, public dialog: MatDialog){
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (Object.keys(params).length > 0) {
        this.queryParams = params;
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  ngAfterViewInit():void{
    this.initSHELL();
  }

  initSHELL() {
    this.offset = 1;
    let attID = "terminal_"+this.queryParams.processid;
    this.term.open(document.getElementById(attID));
    this.term.loadAddon(this.fitAddon);
    this.fitAddon.fit();
    this.getLogger();
    this.term.onKey((keyPress:any)=>{
      if(keyPress['key'] == '\r'){
        this.term.writeln(keyPress['key'])
      }
    })
  }

  getLogger(){
    console.log(this.queryParams);
    let log:any = {
      file_path:this.queryParams[this.queryParams.type],
      offset:this.offset
    }
    let baseUrl = this.queryParams.baseurl;
    this.api.getLogger(baseUrl,log).subscribe((response:any)=>{
      if(response['lines']){
        let lines = response['lines'].split('\n');
        lines.forEach((line:any) => this.term.writeln(line));
      }
    })
  }

  processAction(action:any){
    let baseUrl = this.queryParams.baseurl;
    let processId = this.queryParams.processid;
    this.api.loggerAction(baseUrl,action,processId).subscribe((response:any)=>{
      console.log(response);
      this.getLogger();
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
}
