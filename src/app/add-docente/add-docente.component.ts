import {Component, Input, OnInit} from '@angular/core';
import {MateriasService} from "../services/materias.service";
import {FormGroup, NgForm, Validators} from "@angular/forms";
import {Docente} from "../models/docente";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {Materia} from "../models/materia";
import {DocentePost} from "../models/docentePost";
import {MateriaPost} from "../models/materiaPost";
import {Super} from "../models/super";
import {MatTableDataSource} from "@angular/material/table";
import {Usuario} from "../models/usuario";
import {VariableAst} from "@angular/compiler";

@Component({
  selector: 'app-add-docente',
  templateUrl: './add-docente.component.html',
  styleUrls: ['./add-docente.component.css']
})
export class AddDocenteComponent implements OnInit {


  constructor(private materiaService: MateriasService) {

  }

  ngOnInit() {

  }

  form: FormGroup = new FormGroup({
    nombre: new FormControl('',Validators.required),
    segundo_nombre: new FormControl(''),
    apellido_paterno: new FormControl('', Validators.required),
    apellido_materno: new FormControl(''),
    email: new FormControl('',Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")),
    materias_asignadas: new FormControl(0),
    horas_planta: new FormControl('', [Validators.required,Validators.pattern('^\\d*$')]),
    horas_cubiertas: new FormControl(0),
    evaluacion_pares: new FormControl(false),
  });






  onSubmit() {
    this.materiaService.postDocente(this.form.value).subscribe(
      response=>{
        console.log(response);},
      error => {
        console.log(error);
      }
    );
  }


}
