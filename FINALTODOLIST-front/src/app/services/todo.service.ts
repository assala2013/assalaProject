import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _addTodoUrl = "http://localhost:3000/todo/addTodo";

  constructor(private http: HttpClient) { }

  addTodo(todo) {
    return this.http.post<any>(this._addTodoUrl,todo);
  }

  listTodo(iduser){
    return this.http.post<any>(`http://localhost:3000/todo/todoList/`+iduser,"");

  }

  updateTodo(_id,todo)
  {
    return this.http.patch<any>(`http://localhost:3000/todo/updateTodo/`+_id,todo)
  }

  deleteTodo(_id,todo)
  {
    return this.http.delete<any>(`http://localhost:3000/todo/deleteTodo/`+_id,todo)
  }

  detailsTodo(_id)
  {
    return this.http.post<any>(`http://localhost:3000/todo/todoDetails/`+_id,"")
  }

}