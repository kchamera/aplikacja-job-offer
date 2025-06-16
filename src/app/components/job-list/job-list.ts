import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { JobService } from '../../services/job';
import { Job } from '../../models/job.model';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './job-list.html',
  styleUrl: './job-list.css'
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  filterText: string = '';   
  filteredJobs: Job[] = [];

  constructor(private jobService: JobService) { }

  
 ngOnInit(): void {
  const savedFilter = localStorage.getItem('jobFilterText');
  if (savedFilter) {
    this.filterText = savedFilter;
  }

  this.jobService.jobs$.subscribe((data) => {
    this.jobs = data;
    this.applyFilter(); 
  });
}


  applyFilter() {
    const filter = this.filterText.toLowerCase();
    this.filteredJobs = this.jobs.filter(job =>
      job.title.toLowerCase().includes(filter)
    );

    localStorage.setItem('jobFilterText', this.filterText); 
  }



}

