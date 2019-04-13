import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post<any>("http://localhost:3000/user/subscribe",user);
  }

  login(email:string, password:string) {
    return this.http.post<any>("http://localhost:3000/user/login", {email, password})
    }

  logout(token:string)
  {
    return this.http.post<any>("http://localhost:3000/user/logout",{token})
  }

  info(token)
  {
    return this.http.get<User>(`http://localhost:3000/user/info/`+token)
  }
}

