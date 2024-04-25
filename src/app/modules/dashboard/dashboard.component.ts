import { Component } from '@angular/core';
import { PackagesModule } from '../../libs/packages/packages.module';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PackagesModule],
  providers:[ApiService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public serversList:any = [
    {
      server_name:'Live Server 1',
      server_ip:'XXX.XXX.XXX.XXX',
      server_url:'',
      server_description:'dashboard server'
    },{
      server_name:'Live Server 2',
      server_ip:'XXX.XXX.XXX.XXX',
      server_url:'',
      server_description:''
    },{
      server_name:'Stage Server 1',
      server_ip:'XXX.XXX.XXX.XXX',
      server_url:'',
      server_description:''
    },{
      server_name:'Stage Server 2',
      server_ip:'XXX.XXX.XXX.XXX',
      server_url:'',
      server_description:''
    },{
      server_name:'Stage Server 3',
      server_ip:'XXX.XXX.XXX.XXX',
      server_url:'',
      server_description:''
    },{
      server_name:'Stage Server 4',
      server_ip:'XXX.XXX.XXX.XXX',
      server_url:'',
      server_description:''
    },{
      server_name:'Stage Server 5',
      server_ip:'XXX.XXX.XXX.XXX',
      server_url:'',
      server_description:''
    },{
      server_name:'Stage Server 6',
      server_ip:'XXX.XXX.XXX.XXX',
      server_url:'',
      server_description:''
    },{
      server_name:'Stage Server 7',
      server_ip:'XXX.XXX.XXX.XXX',
      server_url:'',
      server_description:''
    },{
      server_name:'Stage Server 8',
      server_ip:'XXX.XXX.XXX.XXX',
      server_url:'',
      server_description:''
    },{
      server_name:'Stage Server 9',
      server_ip:'XXX.XXX.XXX.XXX',
      server_url:'',
      server_description:''
    }
  ]

  constructor(){
    
  }

}