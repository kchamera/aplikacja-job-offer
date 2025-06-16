import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [CommonModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './job-form.html',
  styleUrl: './job-form.css'
})
export class JobFormComponent implements OnInit {
  jobForm!: FormGroup;

  constructor(private fb: FormBuilder, private jobService: JobService) { }

  ngOnInit() {
    this.jobForm = this.fb.group({
      title: [''],
      company: [''],
      location: [''],
    });

    this.jobForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });

  }

  errorMessage: string = '';


  onAddJob() {
    const title = this.jobForm.get('title')?.value.trim();
    const company = this.jobForm.get('company')?.value.trim();
    const location = this.jobForm.get('location')?.value.trim();

    if (!title || !company || !location) {
      this.errorMessage = 'Wszystkie pola są wymagane!';
      return;
    }

    this.errorMessage = '';
    this.jobService.addJob(this.jobForm.value);


    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      location: ['', Validators.required],
    });
  }


  onSubmit() {
    if (this.jobForm.valid) {

      this.jobService.addJob(this.jobForm.value as any);
      this.jobForm.reset();
      this.jobForm.markAsPristine();
      this.jobForm.markAsUntouched();

    }
  }
}
