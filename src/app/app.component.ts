import { Component } from '@angular/core';
import { QuestionBase }    from './shared/question-base';
import { QuestionService } from './shared/question.service';
import { Observable }      from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [QuestionService]
})
export class AppComponent  {
  name = 'Angular';
   questions$: Observable<QuestionBase<any>[]>;

  constructor(service: QuestionService) {
    this.questions$ = service.getQuestions();
  }
}
