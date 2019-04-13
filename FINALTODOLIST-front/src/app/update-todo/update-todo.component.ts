import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { TodoService } from '../services/todo.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.css']
})


export class UpdateTodoComponent implements OnInit {

  form: FormGroup;

  constructor(fb: FormBuilder, private _userService:UserService , private _todoService: TodoService, private router: Router,private act_route : ActivatedRoute) {
    this.form = fb.group({
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ])
    }
    )
  }

  get description() { return this.form.get('description'); }

  updated()
  {
    let idd=this.act_route.snapshot.paramMap.get("id")
    this._todoService.detailsTodo(idd).subscribe(
      res=>{
      res.text=this.form.value.description
       this._todoService.updateTodo(idd,res).subscribe(
         res=>{
           console.log(res)
           this.router.navigate(['/home'])
           
         },
         err=>{
           console.log(err)
         }
       )
      
      },
      err=>
      {
        console.log(err)
      }
    )
  }

  ngOnInit() {
    
  }

}
