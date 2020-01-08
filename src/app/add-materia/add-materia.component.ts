import { Component, OnInit } from '@angular/core';
import {MateriasService} from "../services/materias.service";
import {NgForm} from "@angular/forms";
import {Materias} from "../models/materias";
import { NativeDateAdapter } from "@angular/material";
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats} from "@angular/material/core";

export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === "input") {
      let day: string = date.getDate().toString();
      day = +day < 10 ? "0" + day : day;
      let month: string = (date.getMonth() + 1).toString();
      month = +month < 10 ? "0" + month : month;
      let year = date.getFullYear();
      return `${year}-${month}-${day}`;
    }
    return date.toDateString();
  }
}export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { month: "short", year: "numeric", day: "numeric" },
  },
  display: {
    dateInput: "input",
    monthYearLabel: { year: "numeric", month: "numeric" },
    dateA11yLabel: { year: "numeric", month: "long", day: "numeric"
    },
    monthYearA11yLabel: { year: "numeric", month: "long" },
  }
};
@Component({
  selector: 'app-add-materia',
  templateUrl: './add-materia.component.html',
  styleUrls: ['./add-materia.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class AddMateriaComponent implements OnInit {

  public materia:Materias;

  constructor(private materiasService: MateriasService) {
    this.materia = new Materias('','','','','',false,false,false,false,false,false,false,false,5);
  }

  ngOnInit() {

  }



  onSubmit(form: NgForm) {
    console.log(form.value);
    this.materiasService.postMateria(this.materia).subscribe(
      response=>{console.log(response);},
        error=>{console.log(error);}
    );
  }
}

