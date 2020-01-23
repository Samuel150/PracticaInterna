import { Component, OnInit } from '@angular/core';
import {MateriasService} from "../services/materias.service";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import { NativeDateAdapter } from "@angular/material";
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats} from "@angular/material/core";
import {Docente} from "../models/docente";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import * as XLSX from 'xlsx'
import {Super} from "../models/super";
import {PreferenciasDocente, PreferenciasPendientes, Usuario} from "../models/usuario";

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
}
export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { month: "short", year: "numeric", day: "numeric" },
  },
  display: {
    dateInput: "input",
    monthYearLabel: { year: "numeric", month: "numeric" },
    dateA11yLabel: { year: "numeric", month: "long", day: "numeric"},
    monthYearA11yLabel: { year: "numeric", month: "long" },
  }
};

type AOA = any[][];

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

  public dataSourceUsuarios=[];
  public docente:Docente;
  public usuario:Usuario;
  public preferencias:PreferenciasPendientes;
  public preferenciasDoc:PreferenciasDocente;
  public super: Super;
  public dataSourceDocentes=[];
  constructor(private materiaService: MateriasService) {
    this.preferencias = new PreferenciasPendientes('',false,false,false,false,false,false,false,false,false,false,false,false);
    this.preferenciasDoc = new PreferenciasDocente('',false,false,false,false);
    this.docente = new Docente('','','','','','',0,0,0,0,false,0);
    this.usuario = new Usuario('','','','','','',0,'',false,this.preferencias,this.preferencias,this.preferencias,this.preferenciasDoc);
    this.super = new Super();
    this.super.docente = this.docente;
    this.super.usuario = this.usuario;
  }

  data: AOA = [[1, 2], [3, 4]];

  ngOnInit() {
    this.getDocentes();
    this.getUsuarios();
    this.filterOptionsDocentes = this.myControlDocentes.valueChanges.pipe(
      startWith(''),
      map(value=>this._filterDocentes(value.toString()))
    );
    this.filterOptionsUsuarios = this.myControlUsuarios.valueChanges.pipe(
      startWith(''),
      map(value=>this._filterUsuarios(value.toString()))
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
  getUsuarios() {
    this.materiaService.getUsuarios().subscribe(
      res => {
        this.dataSourceUsuarios = res;
      }, err => {
        console.log(err);
      }
    );
  }

  myControlDocentes = new FormControl();
  filterOptionsDocentes: Observable<string[]>;
  myControlUsuarios = new FormControl();
  filterOptionsUsuarios:Observable<string[]>;

  form: FormGroup = new FormGroup({
    nombre: new FormControl('',Validators.required),
    inicio: new FormControl('', Validators.required),
    fin: new FormControl('', Validators.required),
    id_docente: new FormControl(''),
    horas_totales: new FormControl('', [Validators.required,Validators.pattern('^\\d*$')]),
    horas_planta: new FormControl('',Validators.pattern('\\d*$')),
    id_jefe_carrera: new FormControl(),
    silabo_subido:new FormControl(false),
    aula_revisada:new FormControl(false),
    examen_revisado:new FormControl(false),
    contrato_impreso:new FormControl(false),
    contrato_firmado: new FormControl(false),
    planilla_lista:new FormControl(false),
    planilla_firmada:new FormControl(false),
    cheque_solicitado:new FormControl(false),
    cheque_recibido: new FormControl(false),
    cheque_entregado:new FormControl(false),
  });


  onSubmit() {
    if(this.super && this.super.docente && this.form.value.horas_planta==""){
      confirm("Asignar horas de planta al docente");
    }else if(this.super && !this.super.docente && this.form.value.horas_planta!=""){
      confirm("Seleccionar un docente");
    }else if((+this.form.value.horas_totales)<(+this.form.value.horas_planta)){
      confirm("Las horas de planta no deben superar las horas totales de la meteria");
    }else if(this.super &&(+this.super.docente.horas_planta-this.super.docente.horas_cubiertas)<(+this.form.value.horas_planta)){
      confirm("Las horas de planta faltantes del docente son menores a las horas de planta indicadas");
    }else if(this.super && !this.super.usuario) {
      confirm("Seleccionar Jefe de Carrera encargado");
    }else{
        if (this.super.docente) {
          this.form.value.id_docente = this.super.docente._id;
        } else {
          this.form.value.horas_planta="0";
          this.form.value.id_docente = "";
        }
        this.form.value.id_jefe_carrera=this.super.usuario._id;
        this.materiaService.postMateria(this.form.value).subscribe(
          res => {
            console.log(res)
          }, error => {
            console.log(error)
          }
        );
    }
  }

  private _filterDocentes(value: string) {
    const filterValue = value.toLowerCase();
    return this.dataSourceDocentes.filter(option=>(option.nombre+" "+option.segundo_nombre+" "+option.apellido_paterno+" "+option.apellido_materno).toLowerCase().includes(filterValue));
  }

  private _filterUsuarios(value: string) {
    const filterValue = value.toLowerCase();
    return this.dataSourceUsuarios.filter(option=>option.rol=="jefe_carrera" ).filter(option=>(option.nombre+" "+option.segundo_nombre+" "+option.apellido_paterno+" "+option.apellido_materno).toLowerCase().includes(filterValue));
  }

  displayDocente(subject) : string {
    return subject ? subject.nombre+" "+subject.segundo_nombre+" "+subject.apellido_paterno+" "+subject.apellido_materno: undefined;
  }

  displayDocente2(subject: Docente) {
    if(subject && subject.nombre) {
      return subject ? subject.nombre+" "+subject.segundo_nombre+" "+subject.apellido_paterno+" "+subject.apellido_materno: undefined;
    }
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = async (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary', cellDates: true});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = await <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1, raw: false}));
      //Joaco aqui debes enviar el this.data que es el array, el boton es feo despues lo arreglo
      //si te da error con el xlsx pon esto npm install xlsx
      this.materiaService.postMateriasExcel(this.data);
    };
    reader.readAsBinaryString(target.files[0]);


  }
}

