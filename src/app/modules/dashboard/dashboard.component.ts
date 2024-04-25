import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PackagesModule } from '../../libs/packages/packages.module';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PackagesModule],
  providers: [ApiService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public queryParams:any;
  public serversList: any = [
    {
      id:1,
      server_name: 'Live Server 1',
      server_ip: 'XXX.XXX.XXX.XXX',
      server_url: '',
      server_description: 'dashboard server',
      server_status: 'online',
    }, {
      id:2,
      server_name: 'Live Server 2',
      server_ip: 'XXX.XXX.XXX.XXX',
      server_url: '',
      server_description: '',
      server_status: 'offline'
    }, {
      id:3,
      server_name: 'Stage Server 1',
      server_ip: 'XXX.XXX.XXX.XXX',
      server_url: '',
      server_description: '',
      server_status: 'online'
    }, {
      id:4,
      server_name: 'Stage Server 2',
      server_ip: 'XXX.XXX.XXX.XXX',
      server_url: '',
      server_description: '',
      server_status: 'online'
    }, {
      id:5,
      server_name: 'Stage Server 3',
      server_ip: 'XXX.XXX.XXX.XXX',
      server_url: '',
      server_description: '',
      server_status: 'online'
    }
  ]

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private _snackBar: MatSnackBar, public dialog: MatDialog) { 
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (Object.keys(params).length > 0) {
        this.queryParams = params;
      } else {
        console.log('add token on login')
      }
    });
  }

  connectToServer(server: any) {
    console.log(server);
    this.router.navigate(['/logger/'],{ queryParams: { id:server.id } })
  }

}
