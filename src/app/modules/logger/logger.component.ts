import { Component } from '@angular/core';
import { PackagesModule } from '../../libs/packages/packages.module';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-logger',
  standalone: true,
  imports: [PackagesModule],
  providers: [ApiService],
  templateUrl: './logger.component.html',
  styleUrl: './logger.component.scss'
})
export class LoggerComponent {

}
