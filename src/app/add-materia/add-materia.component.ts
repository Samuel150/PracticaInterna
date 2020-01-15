import { Component, OnInit } from '@angular/core';
import {MateriasService} from "../services/materias.service";
import {FormControl, NgForm} from "@angular/forms";
import {Materias} from "../models/materias";
import { NativeDateAdapter } from "@angular/material";
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats} from "@angular/material/core";
import {Docentes} from "../models/docentes";
import {Observable, Subscriber} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MateriasPost} from "../models/materiasPost";
import {DocentesPost} from "../models/docentesPost";

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

  public materia:MateriasPost = new MateriasPost('','','','',false,false,false,false,false,false,false,false,false,false,0,0);

  public docente:Docentes;
  public docentePost:DocentesPost;
  public dataSourceDocentes=[];
  constructor(private materiaService: MateriasService) {
    this.docente = new Docentes('','','','','',0,0,0,0,false,0);
    this.docentePost = new DocentesPost('','','','',0,0,0,0,false);
  }

  ngOnInit() {
    this.getDocentes();
    this.filterOptionsDocentes = this.myControlDocentes.valueChanges.pipe(
      startWith(''),
      map(value=>this._filterDocentes(value.toString()))
    );

  }

  getDocentes() {
    this.materiaService.getDocentes().subscribe(
      res => {
        this.dataSourceDocentes = res;
      }, err => {
        console.log(err);
      }
    );
  }
  myControlDocentes = new FormControl();
  filterOptionsDocentes: Observable<string[]>;

  onSubmit(form: NgForm) {
    let materia2: any = this.materia;
    let docente: any = this.materia.id_docente;
    this.docente = docente;
    if (this.docente) {
      materia2.id_docente = (this.materia.id_docente as unknown as Docentes)._id;
      this.docente.materias_asignadas = this.docente.materias_asignadas + 1;
      let horasPlanta = this.docente.horas_planta;
      let horasCubiertas = this.docente.horas_cubiertas;
      let horasMateria = materia2.horas_totales;
      if (horasPlanta - horasCubiertas - horasMateria >= 0) {
        this.docente.horas_cubiertas = parseInt(String(horasCubiertas)) + parseInt(String(horasMateria));
        materia2.horas_planta = horasMateria;
      } else {
        this.docente.horas_cubiertas = horasPlanta;
        materia2.horas_planta = parseInt(String(horasPlanta)) - parseInt(String(horasCubiertas));
      }
      let idDocente = this.docente._id;
      this.materiaService.putDocente(idDocente,{"materias_asignadas": this.docente.materias_asignadas,"horas_cubiertas": this.docente.horas_cubiertas}).subscribe(
        res=>{
          console.log(res)
        },error => {
          console.log(error)
        }
      )
    }else{
      materia2.id_docente = "";
    }
    // console.log({"materias_asignadas": this.docente.materias_asignadas,
    //             "horas_cubiertas": this.docente.horas_cubiertas});
    // console.log(materia2);

    this.materiaService.postMateria(materia2).subscribe(
      res=>{
        console.log(res)
      },error => {
        console.log(error)
      }
    );
  }

  private _filterDocentes(value: string) {
    const filterValue = value.toLowerCase();
    return this.dataSourceDocentes.filter(option=>(option.nombre+" "+option.segundo_nombre+" "+option.apellido_paterno+" "+option.apellido_materno).toLowerCase().includes(filterValue));
  }

  displayDocente(subject) : string {
    return subject ? subject.nombre+" "+subject.segundo_nombre+" "+subject.apellido_paterno+" "+subject.apellido_materno: undefined;
  }

  displayDocente2(subject: Docentes) {
    if(subject) {
      return subject.nombre + " " + subject.apellido_paterno + " " + subject.apellido_materno;
    }
  }
}

