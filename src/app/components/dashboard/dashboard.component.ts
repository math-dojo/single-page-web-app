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
      title: 'pure-mathematics',
      body: 'I am  bit hard',
      userProgress: 0.3
    }),
    new Topic({
      title: 'geometry',
      body: 'I am  bit hard',
      userProgress: 0.5
    }),
    new Topic({
      title: 'statistics',
      body: 'I am  bit hard',
      userProgress: 0.9
    }),
    new Topic({
      title: 'pure-mathematics',
      body: 'I am  bit hard',
      userProgress: 0.3
    }),
    new Topic({
      title: 'geometry',
      body: 'I am  bit hard',
      userProgress: 0.5
    }),
    new Topic({
      title: 'statistics',
      body: 'I am  bit hard',
      userProgress: 0.9
    })
  ];

  constructor() { }

  ngOnInit() {
  }

}
