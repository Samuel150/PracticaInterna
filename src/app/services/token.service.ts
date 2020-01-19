import { Injectable } from '@angular/core';
import {SocialUser} from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public user: SocialUser;
  token : string;
  email: string;

  constructor() { }

  getToken(){
    return this.token;
  }
  setToken(token:string){
    this.token=token;
  }

  setUser(user: SocialUser){
    this.user=user;
  }
  getUser(){
    return this.user;
  }
  setEmail(email){
    this.email=email;
  }
  getEmail(){
    return this.email
  }


}
