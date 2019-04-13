import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent implements OnInit {

  imageUrl = "https://magiqbox.tn/files/bfi_thumb/14022196_666327616868049_4523043009558776528_n-nl8eqm7e9pdgyvok1v3ucpv78lw6zjwypjzby02c1c.jpg";

  isConnect : boolean;
  isSubscribe : boolean;
  isLogout : boolean ;

  //token = JSON.parse("ons")
  //localStorage.getItem('access'))} 

  constructor(private _userService: UserService, private _router: Router) { }

  logout()
  {
    
    let token=localStorage.getItem("token")
    console.log(token)
    localStorage.removeItem("token") 

    this._userService.logout(token).subscribe(
      res => {
        console.log(localStorage.getItem("token"))
          this._router.navigate(['/'])
      },
      err => {
        console.log(err);
      }
    )
  }
  
  ngOnInit() {
    let router = this._router.url;
    if (router === '/connect') {
      this.isSubscribe = true ;
      this.isConnect = false ;
      this.isLogout = false ;
    } else if (router === '/subscribe') {
      this.isSubscribe = false ;
      this.isConnect = true ;
      this.isLogout = false ;
    } else if ((router === '/')) {
      this.isSubscribe = true ;
      this.isConnect = true ;
      this.isLogout = false ;
    } else {
      this.isSubscribe = false ;
      this.isConnect = false ;
      this.isLogout = true ;
    }

  }

}
