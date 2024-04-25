import { Component } from '@angular/core';
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
  public username: any = 'Admin';
}
