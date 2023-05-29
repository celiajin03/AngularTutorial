import {Component, OnInit} from '@angular/core';
import {JobService} from "../Core/Services/job.service";
import {Job} from "../Shared/Models/Job";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  availableJobs:Job[] = [];
  exampleVariable:string='example string';
  constructor(private jobService: JobService) {}

  ngOnInit():void {
    setTimeout(()=>{
      this.exampleVariable = "the new data"
    }, 200);
    // this.jobService.getAllJobs().subscribe(data=> this.availableJobs = data);
  }
}
