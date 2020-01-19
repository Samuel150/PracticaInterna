import {Component, OnInit} from '@angular/core';
import {AuthService, SocialUser} from "angularx-social-login";
import {TokenService} from "./services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public user: SocialUser;
  public token: string;
  constructor(public authService: AuthService, public tokenService: TokenService, private route: Router) {
  }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      if(user){
        this.tokenService.setUser(user);
        this.tokenService.setToken(user.idToken);
        this.tokenService.setEmail(user.email);
      }else{

      }
    });

  }

  signOut(): void {
    this.tokenService.setUser(null);
    this.tokenService.setToken(null);
    this.tokenService.setEmail(null);
    this.authService.signOut();
    this.route.navigate(['']);
  }
}
