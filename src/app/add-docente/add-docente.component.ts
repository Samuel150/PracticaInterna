import { Component, OnInit } from '@angular/core';
import {MateriasService} from "../services/materias.service";
import {NgForm} from "@angular/forms";
import {Docentes} from "../models/docentes";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {Materias} from "../models/materias";
import {DocentesPost} from "../models/docentesPost";

@Component({
  selector: 'app-add-docente',
  templateUrl: './add-docente.component.html',
  styleUrls: ['./add-docente.component.css']
})
export class AddDocenteComponent implements OnInit {
  idDocente;
  idMateria;
  public docente:DocentesPost;
  public materia:Materias;
  public dataSourceDocentes=[];
  public dataSourceMaterias=[];
  constructor(private materiaService: MateriasService) {
    this.docente= new DocentesPost('','','','',0,0,0,0,false);
    this.materia= new Materias('','','','','',false,false,false,false,false,false,false,false,false,false,0,0,0);
  }

  myControl = new FormControl();
  myControlMaterias = new FormControl();
  filterOptions: Observable<string[]>;
  filterOptionsMaterias: Observable<string[]>;


  ngOnInit() {
    this.getDocentes();
    this.getMaterias();
    this.filterOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value=>this._filter(value.toString()))
    );
    this.filterOptionsMaterias = this.myControlMaterias.valueChanges.pipe(
      startWith(''),
      map(value=>this._filterMaterias(value.toString()))
    )
  }
  private getMaterias() {
    this.materiaService.getMaterias().subscribe(
      res => {
        this.dataSourceMaterias = res;
      }, err => {
        console.log(err);
      }
    );
  }


  getDocentes(){
    this.materiaService.getDocentes().subscribe(
      res => {
        this.dataSourceDocentes = res;
      }, err => {
        console.log(err);
      }
    );
  }


  onSubmit(form: NgForm) {
    console.log(this.docente);
    this.materiaService.postDocente(this.docente).subscribe(
      response=>{
        console.log(response);},
      error => {
        console.log(error);
      }
    );
  }

  onSubmitAsign(form: NgForm) {
    console.log(this.materia);
  }

  displayDocente(subject: Docentes) {
    if(subject!=null){
      this.idDocente=subject._id;
    }
    return subject ? subject.nombre+" "+subject.segundo_nombre+" "+subject.apellido_paterno+" "+subject.apellido_materno: undefined;
  }
  displayMateria(subject: Materias){
    if(subject!=null){
      this.idMateria=subject._id;
      console.log(this.idMateria);
    }
    return subject ? subject.nombre+" "+subject.inicio+" "+subject.fin : undefined
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.dataSourceDocentes.filter(option=>(option.nombre+" "+option.segundo_nombre+" "+option.apellido_paterno+" "+option.apellido_materno).toLowerCase().includes(filterValue));
  }

  private _filterMaterias(value: string) {
    const filterValue = value.toLowerCase();
    return this.dataSourceMaterias.filter(option=>(option.nombre+" "+option.inicio+" "+option.fin).toLowerCase().includes(filterValue));
  }
  displayDate(inicio) {
    if(inicio!=null) {
      return inicio.substr(0, 10);
    }
  }
}
