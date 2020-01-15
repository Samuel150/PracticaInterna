import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {JefeDeCarreraComponent} from "./jefe-de-carrera/jefe-de-carrera.component";
import {LogInButtonComponent} from "./log-in-button/log-in-button.component";


const routes: Routes = [
  {path: '', component: LogInButtonComponent},
  {path: 'jefeCarrera', component: JefeDeCarreraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
