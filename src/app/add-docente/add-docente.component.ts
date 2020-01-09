import { Component, OnInit } from '@angular/core';
import {MateriasService} from "../services/materias.service";
import {NgForm} from "@angular/forms";
import {Docentes} from "../models/docentes";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-add-docente',
  templateUrl: './add-docente.component.html',
  styleUrls: ['./add-docente.component.css']
})
export class AddDocenteComponent implements OnInit {
  idDocente;
  public docente:Docentes;
  public dataSourceDocentes=[];
  constructor(private materiaService: MateriasService) {
    this.docente= new Docentes('','','','','',0,0,0,false,0);
  }

  myControl = new FormControl();
  filterOptions: Observable<string[]>;

  ngOnInit() {
    this.getDocentes();
    this.filterOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value=>this._filter(value.toString()))
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
    console.log(form.value);
    this.materiaService.postDocente(this.docente).subscribe(
      response=>{console.log(response);},
      error => {console.log(error);}
    );
  }

  onSubmitAsign(form: NgForm) {

  }

  displayDocente(subject: Docentes) {
    if(subject!=null){
      this.idDocente=subject._id;
    }
    return subject ? subject.nombre+" "+subject.segundo_nombre+" "+subject.apellido_paterno+" "+subject.apellido_materno: undefined;
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.dataSourceDocentes.filter(option=>(option.nombre+" "+option.segundo_nombre+" "+option.apellido_paterno+" "+option.apellido_materno).toLowerCase().includes(filterValue));
  }
}
