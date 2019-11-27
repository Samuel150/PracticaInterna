import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInButtonComponent } from './log-in-button/log-in-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material/material.module";
import { JefeDeCarreraComponent } from './jefe-de-carrera/jefe-de-carrera.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ContabilidadComponent } from './contabilidad/contabilidad.component';
import { AsistenteAdministrativoComponent } from './asistente-administrativo/asistente-administrativo.component';
import { EncargadaRegistrosComponent } from './encargada-registros/encargada-registros.component';
import { PendientesComponent } from './pendientes/pendientes.component';
import { AddMateriaComponent } from './add-materia/add-materia.component';
import { AddDocenteComponent } from './add-docente/add-docente.component';
import { AddCuentaComponent } from './add-cuenta/add-cuenta.component';


@NgModule({
  declarations: [
    AppComponent,
    LogInButtonComponent,
    JefeDeCarreraComponent,
    ContabilidadComponent,
    AsistenteAdministrativoComponent,
    EncargadaRegistrosComponent,
    PendientesComponent,
    AddMateriaComponent,
    AddDocenteComponent,
    AddCuentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
