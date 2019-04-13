import { Todo } from './../models/todo';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { TodoService } from '../services/todo.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  form: FormGroup;

  constructor(fb: FormBuilder, private _userService:UserService , private _todoService: TodoService, private router: Router) {
    this.form = fb.group({
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ])
    }
    )
  }

  get description() { return this.form.get('description'); }

  
  addTodo() {
    let todoDetail=this.form.value
    this._userService.info(localStorage.getItem("token")).subscribe(
      res=> {
        console.log(res._id)
       
        let todo=new Todo()
        todo._userId=res._id
        todo.text=todoDetail.description
        console.log(todo)
        this._todoService.addTodo(todo).subscribe(
          res=>{
                console.log("ajouté")
                this.router.navigate(['/home'])
          },
          err=>{
              console.log(err)
          }  
        )
       
      },
      err=> {
        console.log(err)
      }) 
  }

  ngOnInit() {
  
  }
}