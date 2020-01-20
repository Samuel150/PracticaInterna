import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MateriasService} from "../services/materias.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, private materiaService: MateriasService) {

  }

  form: FormGroup = new FormGroup({
    nombre: new FormControl(this.data.usuario.nombre,Validators.required),
    segundo_nombre: new FormControl(this.data.usuario.segundo_nombre),
    apellido_paterno: new FormControl(this.data.usuario.apellido_paterno, Validators.required),
    apellido_materno: new FormControl(this.data.usuario.apellido_materno,Validators.required),
    email: new FormControl(this.data.usuario.email, Validators.required),
    rol: new FormControl(this.data.usuario.rol,Validators.required),
    super_usuario: new FormControl(this.data.usuario.super_usuario)
  });

  ngOnInit() {
  }

  onSubmit() {
    this.materiaService.putUsuarios(this.form.value,this.data.usuario._id).subscribe(
      res=>{
        console.log(res);
      },error => {
        console.log(error);
      }
    )
  }
}
