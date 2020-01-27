import { Component, OnInit } from '@angular/core';
import {MateriasService} from "../services/materias.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AlertComponent} from "../alert/alert.component";

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit {

  constructor(private materiaService: MateriasService,public dialogRef: MatDialogRef<AddUsuarioComponent>, public dialog: MatDialog) { }

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
      res=>{
        this.dialogRef.close();
        if(res.status==200) {
          this.dialog.open(AlertComponent, {width:'300px',data:{action:"Adición",message:"Usuario añadido exitosamente"}});
        }
        }, error => {
        console.log(error);
      }
    );
  }
}
