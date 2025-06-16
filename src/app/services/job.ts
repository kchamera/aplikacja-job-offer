import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Job } from './../models/job.model';

const STORAGE_KEY = 'job_offers';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jobsSubject = new BehaviorSubject<Job[]>(this.loadJobs());
  jobs$ = this.jobsSubject.asObservable();

  addJob(job: Job): void {
    const currentJobs = this.jobsSubject.value;
    const updatedJobs = [...currentJobs, job];
    this.jobsSubject.next(updatedJobs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJobs));
  }

  private loadJobs(): Job[] {
    const jobsJson = localStorage.getItem(STORAGE_KEY);

    if (jobsJson) {
      return JSON.parse(jobsJson);
    }

    const defaultJobs: Job[] = [
      {
        title: 'Frontend Developer',
        company: 'Frima 1',
        location: 'Warszawa',
      },
      {
        title: 'Backend Developer',
        company: 'Firma 2',
        location: 'Kraków',
      },
      {
        title: 'UX Designer',
        company: 'Firma 3',
        location: 'Zdalnie',
      },
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultJobs));
    return defaultJobs;
  }
}
