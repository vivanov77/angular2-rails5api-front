import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Http, 
  Response,
  RequestOptions,
  Headers
} from '@angular/http';

import {RestService} from '../services/RestService';
import {HelperService} from '../services/HelperService';

// https://angular-2-training-book.rangle.io/handout/routing/routeparams.html
import { ActivatedRoute, Router } from '@angular/router';

import {Question} from '../models/question';

@Component({
  selector: 'app-question-edit',
  templateUrl: './questions-edit.component.html',
  styleUrls: ['./questions-edit.component.css']
})
export class QuestionEditComponent implements OnInit, OnDestroy {
  loading: boolean;
  private sub: any;
  question: Question;
  form_submit_button_name: string = "Обновить вопрос";

  renderResponse(res: any): void {

    let tmp = this.helper.jsonapi2json(res.json());
    
    this.question = new Question(this.helper.json2model(tmp));

    this.loading = false;
  }

  redirectToShow(id: string): void {
    this.router.navigateByUrl(`api/questions/show/${id}`);
  }

  constructor(private http: Http, private route: ActivatedRoute, 
    private restService: RestService
    , private router: Router
    , private helper: HelperService    
     )
  {

  }

  ngOnInit() {

    this.sub = this.route.params.subscribe((params: any) => this.getQuestion(params));
  }

  getQuestion (params) {

    let id = params['id'];

    this.loading = true;

    this.restService
      .show(id)
      .subscribe((res: any) => this.renderResponse(res), _ => this.redirectToShow(id));
  }  

  updateQuestion(question: Question): void { 

    let id = this.question.id; 

    this.loading = true;

    this.restService
      .update(id, question)
      .subscribe(_ => this.redirectToShow(id));
  }  

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  questionWasSubmitted(question: Question): void {

    this.updateQuestion(question);
  }  

}