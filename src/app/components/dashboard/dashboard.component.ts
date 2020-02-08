import { Component, OnInit } from '@angular/core';
import { Topic } from '../../models/topic';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  topics: Topic[] = [
    new Topic({
      name: 'Pure Mathematics',
      topicDescription: 'I am  bit hard',
      userProgress: 0.3
    }),
    new Topic({
      name: 'Geometry',
      topicDescription: 'I am  bit hard',
      userProgress: 0.5
    }),
    new Topic({
      name: 'Statistics',
      topicDescription: 'I am  bit hard',
      userProgress: 0.9
    })
  ];

  constructor() { }

  ngOnInit() {
  }

}
