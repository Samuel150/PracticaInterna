
 import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material/material.module";
import { JefeDeCarreraComponent } from './jefe-de-carrera/jefe-de-carrera.component';
import { PendientesComponent } from './pendientes/pendientes.component';
import { AddMateriaComponent } from './add-materia/add-materia.component';
import { AddDocenteComponent } from './add-docente/add-docente.component';
import { AddCuentaComponent } from './add-cuenta/add-cuenta.component';
import {HttpClientModule} from "@angular/common/http";
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { GoogleLogInComponent } from './google-log-in/google-log-in.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import { EditMateriaComponent } from './edit-materia/edit-materia.component';
import { EditDocenteComponent } from './edit-docente/edit-docente.component';
 import {MatIconModule} from "@angular/material/icon";
import { DeleteComponent } from './delete/delete.component';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';

 const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('602723697704-ucdbgn6m678gf5rkj02npjl2rrcak250.apps.googleusercontent.com')
  }
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    JefeDeCarreraComponent,
    PendientesComponent,
    AddMateriaComponent,
    AddDocenteComponent,
    AddCuentaComponent,
    GoogleLogInComponent,
    EditMateriaComponent,
    EditDocenteComponent,
    DeleteComponent,
    AddUsuarioComponent,
    EditUsuarioComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        FormsModule,
        SocialLoginModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule
    ],
    entryComponents:[
      AddMateriaComponent,
      AddDocenteComponent,
      EditMateriaComponent,
      EditDocenteComponent,
      AddUsuarioComponent,
      EditUsuarioComponent
    ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
