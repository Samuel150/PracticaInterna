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
    super_usuario: new FormControl(false,Validators.required),
    preferencias_seguimiento: new FormControl({
      "silabo_subido": true,
      "aula_revisada": true,
      "examen_revisado": true,
      "contrato_impreso": true,
      "contrato_firmado": true,
      "planilla_lista": true,
      "planilla_firmada": true,
      "cheque_solicitado": true,
      "cheque_recibido": true,
      "cheque_entregado": true,
      "horas_totales": true,
      "horas_planta": true}),
    preferencias_materias: new FormControl({
      "silabo_subido": true,
      "aula_revisada": true,
      "examen_revisado": true,
      "contrato_impreso": true,
      "contrato_firmado": true,
      "planilla_lista": true,
      "planilla_firmada": true,
      "cheque_solicitado": true,
      "cheque_recibido": true,
      "cheque_entregado": true,
      "horas_totales": true,
      "horas_planta": true
    }),
    preferencias_docente: new FormControl({
      "email": "false",
      "materias_asignadas": true,
      "horas_planta": true,
      "horas_cubiertas": true,
      "evaluacion_pares": true
    })
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
