import { Component, OnInit } from '@angular/core';
import {AuthService, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {MateriasService} from "../services/materias.service";
import {TokenService} from "../services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-google-log-in',
  templateUrl: './google-log-in.component.html',
  styleUrls: ['./google-log-in.component.css']
})
export class GoogleLogInComponent {

  description = 'Modulo de Seguimiento de Docentes';

  constructor(private route: Router, private authService: AuthService, private tokenService: TokenService,
              private materiasService: MateriasService) {
  }

  async signIn(){
    await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe(user => {
      this.materiasService.getUsuarioByEmail(user.email).subscribe(
        res => {
          this.tokenService.setUserDocFollow(res);
          this.tokenService.setToken(user.idToken);
          this.tokenService.setUser(user);
          this.tokenService.setEmail(user.email);
          this.route.navigate(['seguimiento']);
        },error=>{
          confirm('Cuenta no registrada');
          this.authService.signOut().catch(console.log);
          this.tokenService.reset();
          this.route.navigate(['']);
        }
      );
    });
  }

}
