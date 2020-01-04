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
  public dataSourceDocentes;
  public docentes : string[] = ["John Candy ", "Alexis Marechal", "Alexis Marechal", "Jose Vera"];

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
        this.dataSourceDocentes = res.docentes;
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
    return subject ? subject.nombre : undefined;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.docentes.filter(option=>option.toLowerCase().includes(filterValue));
  }
}
