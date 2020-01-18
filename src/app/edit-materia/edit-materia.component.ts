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

  public dataSourceDocentes=[];
  myControlDocentes = new FormControl();
  filterOptionsDocentes: Observable<string[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private materiaService: MateriasService) {

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
    nombre: new FormControl(this.data.dataKey.nombre,Validators.required),
    inicio: new FormControl(this.data.dataKey.inicio, Validators.required),
    fin: new FormControl(this.data.dataKey.fin, Validators.required),
    id_docente: new FormControl(''),
    horas_totales: new FormControl(this.data.dataKey.horas_totales, [Validators.required,Validators.pattern('^\\d*$')]),
    horas_planta: new FormControl(this.data.dataKey.horas_planta,Validators.pattern('^\\d*$'))
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
    // console.log(this.form.value);//formularip
    // console.log(this.data.docente[0]);//docente del formulario
    // console.log(this.data.acDocente);//idDocenteAnterior
    // console.log(this.data.dataKey);//materia a editar
    if(this.data.docente && this.data.docente[0] && this.form.value.horas_planta==""){
      confirm("Asignar horas de planta al docente");
    }else if(this.data.docente && !this.data.docente[0] && this.form.value.horas_planta!=""){
      confirm("Seleccionar un docente");
    }else if((+this.form.value.horas_totales)<(+this.form.value.horas_planta)){
      confirm("Las horas de planta no deben superar las horas totales de la meteria");
    }else if(this.data.docente &&(+this.data.docente[0].horas_planta-this.data.docente[0].horas_cubiertas)<(+this.form.value.horas_planta)){
      confirm("Las horas de planta faltantes del docente son menores a las horas de planta indicadas");
    }else {
      if(this.data.docente[0]){
        this.form.value.id_docente = this.data.docente[0]._id;
        if(this.data.docente[0]._id != this.data.acDocente[0]._id){
            //rebajar materias asignadas al docente anterior
            //rebajar horas planta tambien (cubiertas con horasPlantaMateria)
            this.materiaService.putDocente(this.data.acDocente[0]._id,
              {"materias_asignadas": (this.data.acDocente[0].materias_asignadas-=1),
              "horas_cubiertas": (this.data.acDocente[0].horas_cubiertas-this.data.horasPlanta[0])}).subscribe(
              res=>{
                console.log(res);
              },error => {
                console.log(error);
              }
            );
            this.materiaService.putDocente(this.data.docente[0]._id, {"horas_cubiertas": (+this.data.docente[0].horas_cubiertas +this.form.value.horas_planta)}).subscribe(
              res=>{
                console.log(res);
              },error => {
                console.log(error);
              }
            );
            //put al nuevo docente
        }else{
            //put al docente anterior(horas planta)
            //igual se debe usar horasPlantaMateria
            this.materiaService.putDocente(this.data.acDocente[0]._id, {"horas_cubiertas": (this.data.acDocente[0].horas_cubiertas-this.data.horasPlanta[0]+this.form.value.horas_planta)}).subscribe(
              res=>{
                console.log(res);
              },error => {
                console.log(error);
              }
            );
        }
      }else{
        this.form.value.horas_planta="0";
        this.form.value.id_docente = "";
        if(this.data.acDocente[0]._id != ""){
          //rebajar materias asignadas al docente anterior
          //rebajar horas planta tambien (cubiertas con horasPlantaMateria)
          this.materiaService.putDocente(this.data.acDocente[0]._id,
            {"materias_asignadas": (this.data.acDocente[0].materias_asignadas-=1),
              "horas_cubiertas": (this.data.acDocente[0].horas_cubiertas-this.data.horasPlanta[0])}).subscribe(
            res=>{
              console.log(res);
            },error => {
              console.log(error);
            }
          );
        }
      }
      this.materiaService.putMateria(this.data.dataKey._id, this.form.value).subscribe(
        res => {
          console.log(res);
        }, error => {
          console.log(error);
        }
      )
    }
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
