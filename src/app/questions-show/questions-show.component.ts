import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Http, 
  Response,
  RequestOptions,
  Headers
} from '@angular/http';

import {RestService} from '../services/RestService';
import {HelperService} from '../services/HelperService';

import {Question} from '../models/question';

// https://angular-2-training-book.rangle.io/handout/routing/routeparams.html
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-show',
  templateUrl: './questions-show.component.html',
  styleUrls: ['./questions-show.component.css']
})
export class QuestionShowComponent implements OnInit, OnDestroy {
  loading: boolean;
  headers: any;
  private sub: any;
  question: Question;
  error_data: Object = null;

  renderResponse(res: any): void {
    let tmp = this.helper.jsonapi2json(res.json());
    
    this.question = new Question(this.helper.json2model(tmp));
    this.loading = false;
  }

  renderError(err: any): void {
    this.question = null;
    this.loading = false;
    this.error_data = err;
  }

  constructor(private http: Http, private route: ActivatedRoute
    , private restService: RestService
    , private helper: HelperService
    ) {
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe((params: any) => this.getQuestion(params));
  }

  getQuestion (params) {

    let id = params['id'];

    this.loading = true;

    this.restService
      .show(id)
      .subscribe((res: any) => this.renderResponse(res), (err: any) => this.renderError(err));
    }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
