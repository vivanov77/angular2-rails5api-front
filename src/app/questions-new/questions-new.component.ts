import { Component, OnInit } from '@angular/core';
import {
  Http, 
  Response,
  RequestOptions
} from '@angular/http';

import {RestService} from '../services/RestService';

import {Question} from '../models/question';

import { Router } from '@angular/router';

@Component({
  selector: 'app-question-new',
  templateUrl: './questions-new.component.html',
  styleUrls: ['./questions-new.component.css']
})
export class QuestionNewComponent implements OnInit {
  loading: boolean;
  question: Question = new Question({});
  form_submit_button_name: string = "Создать вопрос";

  redirectToShow(id: string): void {

    this.router.navigateByUrl(`/api/questions/show/${id}`);
  }  

  constructor(private http: Http
    , private restService: RestService
    , private router: Router
    ) {
  }

  createQuestion(question: Question): void {

    this.loading = true;

    this.restService
      .create(question)
      .subscribe((res: any) => this.redirectToShow(res.json()["data"]["id"]));
  }  

  ngOnInit() {
  }

  questionWasSubmitted(question: Question): void {

    this.createQuestion(question);
  }    

}