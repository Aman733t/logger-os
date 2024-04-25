import { Component } from '@angular/core';
import { PackagesModule } from '../../libs/packages/packages.module';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [PackagesModule],
  providers: [ApiService],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

}
