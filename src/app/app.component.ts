import { Component } from '@angular/core';
import {AuthService} from "angularx-social-login";
import {TokenService} from "./services/token.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public authService: AuthService, public tokenService: TokenService) {
  }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      if(user){
        this.tokenService.setUser(user.email);
        this.tokenService.setToken(user.idToken);
      }else{
        //devolver al inicio
      }
    });

  }

  signOut(): void {
    this.authService.signOut();
  }
}
