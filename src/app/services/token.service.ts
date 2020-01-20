import { Injectable } from '@angular/core';
import {AuthService, GoogleLoginProvider, SocialUser} from "angularx-social-login";
import {Usuario} from "../models/usuario";
import {MatTableDataSource} from "@angular/material/table";
import {MateriasService} from "./materias.service";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  user: SocialUser;
  userDocFollow:Usuario;
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

  setUserDocFollow(usuario: Usuario) {
    console.log('setting: ');
    console.log(usuario);
    this.userDocFollow = usuario
  }
  getUsuarioDocFollow(){
    return this.userDocFollow;
  }

  reset(){
    this.setUser(null);
    this.setToken(null);
    this.setEmail(null);
    this.setUserDocFollow(null);
  }


}
