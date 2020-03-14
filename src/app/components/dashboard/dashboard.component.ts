import { Component, OnInit } from '@angular/core';
import { Topic } from '../../models/topic';
import { Observable } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  topics$: Observable<Topic[]>

  constructor(
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.topics$ = this.questionService.getTopics();
  }

}
