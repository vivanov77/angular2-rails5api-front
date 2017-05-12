import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import {RestService} from '../services/RestService';
import {HelperService} from '../services/HelperService';

import {Question} from '../models/question';

import 'rxjs/Rx';

@Component({
  selector: 'questions-index',
  templateUrl: './questions-index.component.html',
  styleUrls: ['./questions-index.component.css']
})
export class QuestionsIndexComponent implements OnInit {
  // data: Object;
  loading: boolean;
  questions: Array<Question>;

  renderResponse(res: any): void {
    // this.questions = res.json();
    this.loading = false;

    let tmp = this.helper.jsonapi2json(res.json());

    this.questions = tmp.map(this.helper.json2model).map(function(x) {
      return new Question(x);
    });

    // this.questions = res.json().map(function(x) {
    //   return new Question(x);
    // });
  }

  redirectToShow(id: string): void {
    this.router.navigateByUrl(`/api/questions/show/${id}`);
  }  

  constructor(private http: Http
    , private restService: RestService
    , private helper: HelperService    
    , private router: Router) {
  }

  ngOnInit() {

    this.loading = true;

    this.restService
      .index()
      .subscribe((res: any) => this.renderResponse(res));
  }

  destroyQuestion(id: string): boolean {

    this.restService
      .destroy(id)
      .subscribe(
        _ => this.restService
        .index()
        .subscribe( (res: any) => this.renderResponse(res) ), _ => this.redirectToShow(id)
      );

    return false;
  }
  
}