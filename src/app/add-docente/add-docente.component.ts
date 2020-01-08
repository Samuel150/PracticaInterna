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

  public docente:Docentes;
  public dataSourceDocentes=[];
  public docentes=[];
  public docentes2;
  constructor(private materiaService: MateriasService) {
    this.docente= new Docentes('','','','','',0,0,0,0);
  }

  myControl = new FormControl();
  filterOptions: Observable<string[]>;

  ngOnInit() {
    this.getDocentes();
    this.filterOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value=>this._filter(value))
    );
  }


  getDocentes(){
    this.materiaService.getDocentes().subscribe(
      res => {
        this.dataSourceDocentes = res;
        this.docentes2 = res;
        for(let i = 0; i< this.docentes2.length;i++){
          this.docentes[i]=this.docentes2[i].nombre.toString();
        }
        console.log(this.docentes);
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

  displayDocente(subject) {
    return subject ? subject : undefined;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log(this.dataSourceDocentes.map(res=>res.nombre));
    return this.dataSourceDocentes;

  }
}
