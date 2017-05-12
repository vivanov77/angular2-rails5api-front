export class Question {
  // Здесь (и только здесь) прописывается структура модели Question, получаемой от 
  // (и отправляемой на) Ruby on Rails.
  // n: number; // пример поля числового типа
  id: string;
  title: string;  
  createdAt: Date;
  updatedAt: Date;
// http://stackoverflow.com/questions/332422/how-do-i-get-the-name-of-an-objects-type-in-javascript  
  className: string = "Question"; // простой и надёжный костыль для JS runtime получения имени класса

  // constructor(data: any) {
  constructor(obj: any) {    

    // this.n      = obj && obj.n          || 0;
    // this.id        = data && data.id         || '';
    this.id        = obj && obj.id         || '';    

    // let obj = data["attributes"];

    this.title     = obj && obj.title      || '';
    this.createdAt = obj && obj.created_at || null;
    this.updatedAt = obj && obj.updated_at || null;
  }
}