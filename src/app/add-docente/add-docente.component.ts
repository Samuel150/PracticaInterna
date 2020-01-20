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

@Component({
  selector: 'app-add-docente',
  templateUrl: './add-docente.component.html',
  styleUrls: ['./add-docente.component.css']
})
export class AddDocenteComponent implements OnInit {


  constructor(private materiaService: MateriasService) {

  }

  form: FormGroup = new FormGroup({
    nombre: new FormControl('',Validators.required),
    segundo_nombre: new FormControl(''),
    apellido_paterno: new FormControl('', Validators.required),
    apellido_materno: new FormControl('',Validators.required),
    horas_planta: new FormControl('', [Validators.required,Validators.pattern('^\\d*$')]),
    materias_asignadas: new FormControl(0),
    horas_cubiertas: new FormControl(0)
  });


  ngOnInit() {

  }



  onSubmit() {
    this.materiaService.postDocente(this.form.value).subscribe(
      response=>{
        console.log(response);},
      error => {
        console.log(error);
      }
    );
  }

  // onSubmitAsign(form) {
  //   this.super.docente.materias_asignadas +=1;
  //   let horasPlantaDocente = this.super.docente.horas_planta;
  //   let horasCubiertasDocente = this.super.docente.horas_cubiertas;
  //   let horasTotalesMateria = this.super.materia.horas_totales;
  //   if(horasPlantaDocente - horasCubiertasDocente - horasTotalesMateria >= 0){
  //     this.super.docente.horas_cubiertas = parseInt(String(horasCubiertasDocente)) + parseInt(String(horasTotalesMateria));
  //     this.super.materia.horas_planta = horasTotalesMateria;
  //   }else{
  //     this.super.docente.horas_cubiertas = horasPlantaDocente;
  //     this.super.materia.horas_planta = parseInt(String(horasPlantaDocente)) - parseInt(String(horasCubiertasDocente));
  //   }
  //   this.materiaService.putMateria(this.super.materia._id, {id_docente: this.super.docente._id,horas_planta: this.super.materia.horas_planta}).subscribe(
  //     res=>{
  //       console.log(res);
  //     }, error => {
  //       console.log(error);
  //     }
  //   );
  //   this.materiaService.putDocente(this.super.docente._id,{"materias_asignadas":this.super.docente.materias_asignadas,"horas_cubiertas": this.super.docente.horas_cubiertas }).subscribe(
  //     res=>{
  //       console.log(res)
  //     },error => {
  //       console.log(error)
  //     }
  //   );
  // }

}
