import { Component, Input } from '@angular/core';
import { QuestionService } from './shared/question.service';
import { QuestionBase }    from './shared/question-base';
import { Observable }      from 'rxjs';
@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`],
  providers: [QuestionService]
})
export class HelloComponent  {
  @Input() name: string;
}
