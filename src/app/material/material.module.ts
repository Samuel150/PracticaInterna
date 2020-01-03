import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";


const MaterialComponents = [
  MatButtonModule,
  MatToolbarModule,
  MatTableModule,
  MatTabsModule,
  MatSlideToggleModule,
  MatInputModule,
  MatDialogModule,
  MatCheckboxModule
];

@NgModule({

  imports: [
    MaterialComponents
  ],
  exports:[
    MaterialComponents
  ]
})
export class MaterialModule { }
