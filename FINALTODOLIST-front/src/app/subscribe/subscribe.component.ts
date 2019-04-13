import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { PasswordValidators } from './password.validators';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  form: FormGroup;

  constructor(fb: FormBuilder, private _userService: UserService, private router: Router) {

    this.form = fb.group({
      firstname: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z][a-zA-Z]+')
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z][a-zA-Z]+')
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      tel: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.minLength(8),
        Validators.maxLength(13)
      ]),
      pass: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      repass: new FormControl('', [
        Validators.required
      ]),
    }, // param 1 mt3 formBuilder.group
      {
        validator: PasswordValidators.passwordShouldMatch // param 2 howa validators personnalisé 
      })

  }

  get firstname() { return this.form.get('firstname'); }
  get lastname() { return this.form.get('lastname'); }
  get tel() { return this.form.get('tel'); }
  get email() { return this.form.get('email'); }
  get pass() { return this.form.get('pass'); }
  get repass() { return this.form.get('repass'); }

  inscription() {
    let userDetail = this.form.value;
    let user = new User();
        user.firstname = userDetail.firstname;
        user.lastname = userDetail.lastname;
        user.email = userDetail.email;
        user.tel = userDetail.tel;
        user.password = userDetail.pass;
   
    // let user1=JSON.stringify(user);
    this._userService.registerUser(user).subscribe(
      res => {
        
        console.log(user)
        this.router.navigate(['/']);

      },
      err => {
        console.log(err);
      }
    )

  }

  ngOnInit() {
  }

}
