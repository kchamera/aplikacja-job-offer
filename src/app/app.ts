import { Component } from '@angular/core';
import { JobFormComponent } from './components/job-form/job-form';
import { JobListComponent } from './components/job-list/job-list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JobFormComponent, JobListComponent, MatCardModule, MatDividerModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  clearStorage() {
    localStorage.clear(); 
    window.location.reload(); 
  }
}

