import { Component, OnInit } from '@angular/core';
import {MateriasService} from "../services/materias.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit {

  constructor(private materiaService: MateriasService) { }

  ngOnInit() {
  }

  form: FormGroup = new FormGroup({
    nombre: new FormControl('',Validators.required),
    segundo_nombre: new FormControl(''),
    apellido_paterno: new FormControl('', Validators.required),
    apellido_materno: new FormControl('',Validators.required),
    email: new FormControl('', Validators.required),
    rol: new FormControl('',Validators.required),
    super_usuario: new FormControl(false,Validators.required)
  });

  onSubmit() {
    this.materiaService.postUsuarios(this.form.value).subscribe(
      response=>{
        console.log(response);},
      error => {
        console.log(error);
      }
    );
  }
}
