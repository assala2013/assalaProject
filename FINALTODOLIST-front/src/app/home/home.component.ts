import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/Todo';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  
  todos=[]
  dones=[]
  
  constructor(private _todoService:TodoService, private _userService:UserService , private router:Router) { 
    this._userService.info(localStorage.getItem("token")).subscribe(
      res=>{
        //console.log(res._id)
        this._todoService.listTodo(res._id).subscribe(
          res=>{
            
            for(let i=0;i<res.todos.length;i++)
            {
             let todo=res.todos[i]
             if(todo.completed==false)
                this.todos.push (todo)
              else
                this.dones.push(todo)
                
            }
           // console.log(this.todos)
            //console.log(this.dones)
            
          },
          err=>{
            console.log(err)
          }
        )
      },
      err=>{
        console.log(err)
      }
    )
   }

  
  accomplishit(todo)
  { todo.completed=true
    let index=this.todos.indexOf(todo)
    this._todoService.updateTodo(todo._id,todo).subscribe(
          res=>{
            this.dones.push(todo)
            this.todos.splice(index,1)
            window.location.reload()
          },
          err=>{
              console.log(err)
          }  
        )
  }

  updateit(todo)
  {
    console.log(todo)
    this.router.navigate(['/updateTodo'],todo)

  }

  deleteit(todo)
  {
      let index_todo=this.todos.indexOf(todo)
      let index_done=this.dones.indexOf(todo)
      this._todoService.deleteTodo(todo._id,todo).subscribe(
            res=>{
                if(index_todo!=-1)
                 this.todos.splice(index_todo,1)
                if(index_done!=-1)
                  this.dones.splice(index_done,1)

            },
            err=>{
                console.log(err)
            }  
          )
  }
  

  ngOnInit() {
    
    
    
  }

}