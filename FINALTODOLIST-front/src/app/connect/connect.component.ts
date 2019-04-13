import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {

  form:FormGroup
  msg:Boolean
  access_token:String
  constructor(fb:FormBuilder , private _userService: UserService, private router: Router ) {
    this.form=fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      pass: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    })
  }

  get email() { return this.form.get('email'); }
  get pass() { return this.form.get('pass'); }

  connexion()
  {
    this.msg=false
    let userDetail = this.form.value;

    this._userService.login(userDetail.email,userDetail.pass).subscribe(
      
      res => {
        localStorage.setItem('token',res.token)
        console.log(res)
        console.log(localStorage.getItem('token'));
        this.router.navigate(['/home']);

      },
      err => {
        this.msg=true;
        console.log(err);
      })
  }
  ngOnInit() {
    
  } 

}
