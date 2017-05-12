import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

import { Validators } from '@angular/forms';

const isProduction: boolean = false;

@Injectable()
export class HelperService {
  static BASE_URL: string = isProduction ? 
  'https://rails-api-only-demo.herokuapp.com/questions' :
  'http://localhost:3000/api/questions';

  static HEADERS: any = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });  

  constructor()  {
  }

  model2jsonapi(obj: any): any {

    let obj_name = obj.className.toLowerCase();

    let param_obj: Object = {};

    param_obj["data"] = {};

    // param_obj["type"] = "questions";
    param_obj["data"]["type"] = obj["className"].toLowerCase() + "s"

    param_obj["data"]["attributes"] = {};    

    Object.keys(obj).forEach(function(key) {
      if (
        key != "id" && key != "className" && key != "createdAt" && key != "updatedAt"
        ) // old browser support - no "indexOf"      
      {
        param_obj["data"]["attributes"][key] = obj[key];
      }      
    });

    return JSON.stringify(param_obj);
  }

  jsonapi2json(obj: any): any {

    return obj["data"];
  }  

  json2model(obj: any): any {

    let param_obj: Object = {};

    param_obj["id"] = obj["id"]

    Object.keys(obj["attributes"]).forEach(function(key) {
      {
        param_obj[key] = obj["attributes"][key];
      }      
    });

    return param_obj;
  }  

  to_form_fields(obj: any): any {

    let param_obj: Object = {};

    Object.keys(obj).forEach(function(key) {
      if (
        key != "id" && key != "className" && key != "createdAt" && key != "updatedAt"
        ) // old browser support - no "indexOf"
        { 
        param_obj[key] = ['', Validators.required];
      }      
    });

    return param_obj;
  }
}