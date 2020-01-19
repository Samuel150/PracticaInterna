import { Component, OnInit } from '@angular/core';
import {AuthService, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {MateriasService} from "../services/materias.service";

@Component({
  selector: 'app-google-log-in',
  templateUrl: './google-log-in.component.html',
  styleUrls: ['./google-log-in.component.css']
})
export class GoogleLogInComponent implements OnInit {

  public user: SocialUser;
  public loggedIn: boolean;

  constructor(private authService: AuthService, private tokenService: MateriasService) { }

  ngOnInit() {

  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }


}
