export default class Task{
 //Simple data model for Task
  constructor( date, title, desc, completed ) {
    this.date = date;
    this.title = title;
    this.desc = desc;
    this.completed = completed;
  }
}
