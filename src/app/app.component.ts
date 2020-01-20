import {Component, OnInit} from '@angular/core';
import {AuthService, SocialUser} from "angularx-social-login";
import {TokenService} from "./services/token.service";
import {Router} from "@angular/router";
import {AuthorizationService} from "./services/authorization.service";

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

  }

  signOut() {
    console.log('service log out');
    this.authService.signOut().catch(console.log);
    this.tokenService.reset();
    this.route.navigate(['']);
  }
}
