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
  public term: any = new Terminal({ cursorBlink: true,rows:38,cols:100});
  public fitAddon: any = new FitAddon();
  public offset:any = 1;
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
      let attID = "terminal_"+this.queryParams.id;
      console.log(document.getElementById(attID));
      this.term.open(document.getElementById(attID));
      this.term.loadAddon(this.fitAddon);
      this.fitAddon.fit();
      this.getLogger();
  }

  getLogger(){
    this.api.getLogger({file_name:'logger-API-out-0.log',offset:this.offset}).subscribe((response:any)=>{
      if(response['log']){
        const lines = response['log'].split('\n');
        lines.forEach((line:any) => this.term.writeln(line));
        // this.offset = response['chunk'];
        setTimeout(()=>{
          this.getLogger();
        },2000)
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
}
