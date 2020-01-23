import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MateriasService} from "../services/materias.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-docente',
  templateUrl: './edit-docente.component.html',
  styleUrls: ['./edit-docente.component.css']
})
export class EditDocenteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, private materiaService: MateriasService) {

  }

  ngOnInit() {
  }

  form: FormGroup = new FormGroup({
    nombre: new FormControl(this.data.docente.nombre,Validators.required),
    segundo_nombre: new FormControl(this.data.docente.segundo_nombre),
    apellido_paterno: new FormControl(this.data.docente.apellido_paterno,Validators.required),
    apellido_materno: new FormControl(this.data.docente.apellido_materno),
    email: new FormControl(this.data.docente.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")),
    horas_planta: new FormControl(this.data.docente.horas_planta, [Validators.required,Validators.pattern('^\\d*$')]),
  });

  onSubmit(){
    if((+this.form.value.horas_planta)<(+this.data.docente.horas_cubiertas)){
      confirm("El docente ya cubre con mas horas de planta que las inidicadas")
    }else{
      this.materiaService.putDocente(this.data.docente._id,this.form.value).subscribe(
        res=>{
          console.log(res);
        },error => {
          console.log(error);
        }
      )
    }
  }
}
