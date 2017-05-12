import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {
  RouterModule,
  Routes
} from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';

import { RestService } from './services/RestService';
import { HelperService } from './services/HelperService';
import { SimpleRouterComponent } from './simple-router/simple-router.component';
import { QuestionsIndexComponent } from './questions-index/questions-index.component';
import { QuestionShowComponent } from './questions-show/questions-show.component';
import { QuestionNewComponent } from './questions-new/questions-new.component';
import { QuestionEditComponent } from './questions-edit/questions-edit.component';
import { QuestionsFormComponent } from './questions-form/questions-form.component';

const routes: Routes = [
  { path: 'api/questions/index', component: QuestionsIndexComponent },
  { path: 'api/questions/new', component: QuestionNewComponent },
  { path: 'api/questions/show/:id', component: QuestionShowComponent },
  { path: 'api/questions/:id/edit', component: QuestionEditComponent }

];

@NgModule(
{
  declarations: [
    AppComponent,
    SimpleRouterComponent,
    QuestionsIndexComponent,
    QuestionShowComponent,
    QuestionNewComponent,
    QuestionEditComponent,
    QuestionsFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
    , RouterModule.forRoot(routes) // <-- routes      
  ],

  providers: [ RestService, HelperService ],

  bootstrap: [AppComponent]
})
export class AppModule { }
