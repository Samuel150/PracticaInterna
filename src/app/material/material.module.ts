import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


const MaterialComponents = [
  MatButtonModule,
  MatToolbarModule,
  MatTableModule,
  MatTabsModule,
  MatSlideToggleModule
]

@NgModule({

  imports: [
    MaterialComponents
  ],
  exports:[
    MaterialComponents
  ]
})
export class MaterialModule { }
