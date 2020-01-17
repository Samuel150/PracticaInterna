import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats, NativeDateAdapter} from "@angular/material/core";
import {Super} from "../models/super";
import {MateriasService} from "../services/materias.service";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import {Docente} from "../models/docente";
import {Materia} from "../models/materia";

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
  selector: 'app-edit-materia',
  templateUrl: './edit-materia.component.html',
  styleUrls: ['./edit-materia.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class EditMateriaComponent implements OnInit {

  public docente:Docente;
  public super: Super;
  public materia:Materia;
  public dataSourceDocentes=[];
  myControlDocentes = new FormControl();
  filterOptionsDocentes: Observable<string[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private materiaService: MateriasService) {
    this.docente = new Docente('','','','','',0,0,0,0,false,0);
    this.materia= new Materia('','','','','',false,false,false,false,false,false,false,false,false,false,0,0,0);
    this.super = new Super();
    this.super.docente = this.docente;
    this.super.materia = this.materia;
  }


  ngOnInit() {
    console.log(this.data);
    this.getDocentes();
    this.filterOptionsDocentes = this.myControlDocentes.valueChanges.pipe(
      startWith(''),
      map(value=>this._filterDocentes(value.toString()))
    );
  }

  form: FormGroup = new FormGroup({
    nombre: new FormControl('',Validators.required),
    id_docente: new FormControl('',Validators.required),
  });



  getDocentes() {
    this.materiaService.getDocentes().subscribe(
      res => {
        this.dataSourceDocentes = res;
      }, err => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    console.log(this.form.value);
    console.log(this.super.docente);
  }

  private _filterDocentes(value: string) {
    const filterValue = value.toLowerCase();
    return this.dataSourceDocentes.filter(option=>(option.nombre+" "+option.segundo_nombre+" "+option.apellido_paterno+" "+option.apellido_materno).toLowerCase().includes(filterValue));
  }

  displayDocente(subject) : string {
    return subject ? subject.nombre+" "+subject.segundo_nombre+" "+subject.apellido_paterno+" "+subject.apellido_materno: undefined;
  }

  displayDocente2(subject) {
    if(subject instanceof Docente || (subject && subject.nombre)) {
      return subject.nombre + " " + subject.apellido_paterno + " " + subject.apellido_materno;
    }else{
      return subject
    }
  }


}
