import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PendingComponent} from "./pending/pending.component";
import {LogInButtonComponent} from "./log-in-button/log-in-button.component";


const routes: Routes = [
  {path: '', component: LogInButtonComponent},
  {path: 'pending', component: PendingComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
