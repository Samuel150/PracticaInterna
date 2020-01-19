import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  token : string;
  correo: string;

  constructor() { }

  getToken(){
    return this.token;
  }
  setToken(token:string){
    this.token=token;
  }

  setUser(email: string){
    //usuarios/getOneByEmail/email
  }


}
