import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats, NativeDateAdapter} from "@angular/material/core";
import {MateriasService} from "../services/materias.service";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import {Docente} from "../models/docente";
import {AlertComponent} from "../alert/alert.component";

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

  constructor(@Inject(MAT_DIALOG_DATA) public data, private materiaService: MateriasService,public dialogRef: MatDialogRef<EditMateriaComponent>, public dialog: MatDialog) {

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

  form: FormGroup = new FormGroup({
    nombre: new FormControl(this.data.materia.nombre,Validators.required),
    inicio: new FormControl(this.data.materia.inicio, Validators.required),
    fin: new FormControl(this.data.materia.fin, Validators.required),
    id_docente: new FormControl(''),
    horas_totales: new FormControl(this.data.materia.horas_totales, [Validators.required,Validators.pattern('^\\d*$')]),
    horas_planta: new FormControl(this.data.materia.horas_planta,Validators.pattern('^\\d*$'))
  });
  private horasFaltantes: number;

  onSubmit() {
    if (this.data.docente) {
      this.horasFaltantes = this.data.docente[0].horas_planta - this.data.docente[0].horas_cubiertas;
    }
    if (this.data.docente && this.data.docente[0] && !this.form.value.horas_planta) {
      this.dialog.open(AlertComponent, {width:'300px',data:{action:"Conflicto",message:"Asignar horas de planta al docente"}});
    } else if (this.data.docente && !this.data.docente[0] && this.form.value.horas_planta != "") {
      this.dialog.open(AlertComponent, {width:'300px',data:{action:"Conflicto",message:"Seleccionar un docente"}});
    } else if ((+this.form.value.horas_totales) < (+this.form.value.horas_planta)) {
      this.dialog.open(AlertComponent, {width:'300px',data:{action:"Conflicto",message:"Las horas de planta no deben superar las horas totales de la meteria"}});
    } else if (this.data.docente && (this.data.materia.horas_planta < this.form.value.horas_planta) ? this.horasFaltantes < (this.form.value.horas_planta - this.data.materia.horas_planta) : false) {
      this.dialog.open(AlertComponent, {width:'300px',data:{action:"Conflicto",message:"Las horas de planta faltantes del docente son menores a las horas de planta indicadas"}});
    } else {
      if (this.data.docente && this.data.docente[0]) {
        this.form.value.id_docente = this.data.docente._id;
      } else {
        this.form.value.id_docente = "";
        this.form.value.horas_planta = "0";
      }
      this.materiaService.putMateria(this.data.materia._id, this.form.value).subscribe(
        res => {
          this.dialogRef.close();
          if(res.status==200) {
            this.dialog.open(AlertComponent, {width:'300px',data:{action:"Modificación",message:"Materia modificada exitosamente"}});
          }
        }, error => {
          console.log(error);
          this.dialog.open(AlertComponent, {width:'300px',data:{action:"Error",message:"Error al modificar materia"}});
        }
      )
    }
  }
    //   if(this.data.docente[0]){
    //     this.form.value.id_docente = this.data.docente[0]._id;
    //     if(this.data.acDocente[0] && this.data.docente[0]._id != this.data.acDocente[0]._id){
    //         //rebajar materias asignadas al docente anterior
    //         //rebajar horas planta tambien (cubiertas con horasPlantaMateria)
    //         this.materiaService.putDocente(this.data.acDocente[0]._id,
    //           {"materias_asignadas": (this.data.acDocente[0].materias_asignadas-=1),
    //           "horas_cubiertas": (this.data.acDocente[0].horas_cubiertas-this.data.horasPlanta[0])}).subscribe(
    //           res=>{
    //             console.log(res);
    //           },error => {
    //             console.log(error);
    //           }
    //         );
    //         this.materiaService.putDocente(this.data.docente[0]._id,
    //           {"horas_cubiertas": (+this.data.docente[0].horas_cubiertas +this.form.value.horas_planta)}).subscribe(
    //           res=>{
    //             console.log(res);
    //           },error => {
    //             console.log(error);
    //           }
    //         );
    //         //put al nuevo docente
    //     }else{
    //         //put al docente anterior(horas planta)
    //         //igual se debe usar horasPlantaMateria
    //         if(this.data.acDocente[0]){
    //           this.materiaService.putDocente(this.data.acDocente[0]._id,
    //             {"horas_cubiertas": (this.data.acDocente[0].horas_cubiertas-this.data.horasPlanta[0]+this.form.value.horas_planta)}).subscribe(
    //             res=>{
    //               console.log(res);
    //             },error => {
    //               console.log(error);
    //             }
    //           );
    //         }else{
    //           this.materiaService.putDocente(this.data.docente[0]._id,
    //             {"horas_cubiertas": (this.data.docente[0].horas_cubiertas-this.data.horasPlanta[0]+this.form.value.horas_planta),
    //             "materias_asignadas": this.data.docente[0].materias_asignadas+=1}).subscribe(
    //             res=>{
    //               console.log(res);
    //             },error => {
    //               console.log(error);
    //             }
    //           );
    //         }
    //
    //     }
    //   }else{
    //     this.form.value.horas_planta="0";
    //     this.form.value.id_docente = "";
    //     if(this.data.acDocente[0]._id != ""){
    //       //rebajar materias asignadas al docente anterior
    //       //rebajar horas planta tambien (cubiertas con horasPlantaMateria)
    //       this.materiaService.putDocente(this.data.acDocente[0]._id,
    //         {"materias_asignadas": (this.data.acDocente[0].materias_asignadas-=1),
    //           "horas_cubiertas": (this.data.acDocente[0].horas_cubiertas-this.data.horasPlanta[0])}).subscribe(
    //         res=>{
    //           console.log(res);
    //         },error => {
    //           console.log(error);
    //         }
    //       );
    //     }
    //   }

    // }


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
