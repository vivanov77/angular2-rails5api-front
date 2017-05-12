import { Component, OnInit, EventEmitter } from '@angular/core';

import {
  FormBuilder
  ,FormGroup
  // ,Validators
} from '@angular/forms';

import {Question} from '../models/question';

import {HelperService} from '../services/HelperService';

@Component({
  selector: 'questions-form',
  inputs: ['question','submit_button_name'],
  outputs: ['onQuestionSubmitted'],
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.css']
})
export class QuestionsFormComponent implements OnInit {
  question_form: FormGroup;
  question: Question;
  action: string;
  submit_button_name: string;

  onQuestionSubmitted: EventEmitter<Question>;

  constructor(
    private fb: FormBuilder
    , private helper: HelperService    
    )
  {

    let obj: Question = new Question({});

    this.question_form = fb.group(

      this.helper.to_form_fields(obj)

    );

    this.onQuestionSubmitted = new EventEmitter();
  }

  ngOnInit() {
  }

  onSubmit(value: string) {

    // let question = new Question(this.helper.from_form_fields(value)); // проверка формата полей входящих данных
    let question = new Question(value); // проверка формата полей входящих данных

    this.onQuestionSubmitted.emit(question);
  }

}
