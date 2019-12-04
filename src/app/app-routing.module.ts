import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {JefeDeCarreraComponent} from "./jefe-de-carrera/jefe-de-carrera.component";
import {LogInButtonComponent} from "./log-in-button/log-in-button.component";
import {ContabilidadComponent} from "./contabilidad/contabilidad.component";
import {AsistenteAdministrativoComponent} from "./asistente-administrativo/asistente-administrativo.component";
import {EncargadaRegistrosComponent} from "./encargada-registros/encargada-registros.component";
import {GoogleLogInComponent} from "./google-log-in/google-log-in.component";


const routes: Routes = [
  {path: '', component: LogInButtonComponent},
  {path: 'jefeCarrera', component: JefeDeCarreraComponent},
  {path: 'contabilidad', component: ContabilidadComponent},
  {path: 'asistenteAdministrativo', component: AsistenteAdministrativoComponent},
  {path: 'encargadaRegistros', component: EncargadaRegistrosComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
