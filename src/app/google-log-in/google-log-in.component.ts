import { Component, OnInit } from '@angular/core';
import {AuthService, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {MateriasService} from "../services/materias.service";
import {TokenService} from "../services/token.service";
import {MatTableDataSource} from "@angular/material/table";
import {Usuario} from "../models/usuario";
import {Router} from "@angular/router";

@Component({
  selector: 'app-google-log-in',
  templateUrl: './google-log-in.component.html',
  styleUrls: ['./google-log-in.component.css']
})
export class GoogleLogInComponent implements OnInit {

  description = 'Modulo de Seguimiento de Docentes';
  public user: SocialUser;
  public loggedIn: boolean;
  public users:MatTableDataSource<Usuario>;

  constructor(private route:Router,private authService: AuthService, private tokenService: TokenService,private materiasService: MateriasService) { }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    if(this.user){
      this.tokenService.setToken(this.user.idToken);
      this.tokenService.setUser(this.user);
      this.tokenService.setEmail(this.user.email);
    }

  }


  Ingresar() {
    this.materiasService.getUsuarios().subscribe(
      res=>{
        this.users=new MatTableDataSource<Usuario>(res);
        let acUser = this.users.filteredData.filter(a=>a.email==this.tokenService.getEmail());
        if(acUser.length==0){
          confirm("Cuenta no registrada")
        }else{
          this.tokenService.setUserDocFollow(acUser[0]);
          this.route.navigate(['seguimiento']);
        }
      },error=>{
        console.log(error);
      }
    )
  }
}
