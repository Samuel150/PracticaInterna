import { Component, OnInit } from '@angular/core';
import {MateriasService} from "../services/materias.service";
import {FormControl, NgForm} from "@angular/forms";
import { NativeDateAdapter } from "@angular/material";
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats} from "@angular/material/core";
import {Docente} from "../models/docente";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MateriaPost} from "../models/materiaPost";
import {Super} from "../models/super";

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

  public materiaPost:MateriaPost;
  public super: Super;
  public dataSourceDocentes=[];
  constructor(private materiaService: MateriasService) {
    this.materiaPost = new MateriaPost('','','','',false,false,false,false,false,false,false,false,false,false,0,0);
    this.super = new Super();
    this.super.materiaPost = this.materiaPost;
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
    if(this.super.docente){
      this.super.materiaPost.id_docente = this.super.docente._id;
      this.super.docente.materias_asignadas+=1;
      let horasPlantaDocente = this.super.docente.horas_planta;
      let horasCubiertasDocente = this.super.docente.horas_cubiertas;
      let horasTotalesMateria = this.super.materiaPost.horas_totales;
      if(horasPlantaDocente - horasCubiertasDocente - horasTotalesMateria >= 0){
        this.super.docente.horas_cubiertas = parseInt(String(horasCubiertasDocente)) + parseInt(String(horasTotalesMateria));
        this.super.materiaPost.horas_planta = horasTotalesMateria;
      }else{
        this.super.docente.horas_cubiertas = horasPlantaDocente;
        this.super.materiaPost.horas_planta = parseInt(String(horasPlantaDocente)) - parseInt(String(horasCubiertasDocente))
      }
      this.materiaService.putDocente(this.super.docente._id,{"materias_asignadas":this.super.docente.materias_asignadas,"horas_cubiertas": this.super.docente.horas_cubiertas }).subscribe(
        res=>{
          console.log(res)
        },error => {
          console.log(error)
        }
      );

    }else{
      this.super.materiaPost.id_docente="";
    }
    this.materiaService.postMateria(this.super.materiaPost).subscribe(
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

  displayDocente2(subject: Docente) {
    if(subject) {
      return subject.nombre + " " + subject.apellido_paterno + " " + subject.apellido_materno;
    }
  }
}

