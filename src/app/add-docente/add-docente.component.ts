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
import {AlertComponent} from "../alert/alert.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-docente',
  templateUrl: './add-docente.component.html',
  styleUrls: ['./add-docente.component.css']
})
export class AddDocenteComponent implements OnInit {


  constructor(private materiaService: MateriasService,public dialogRef: MatDialogRef<AddDocenteComponent>, public dialog: MatDialog) {

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
      res=>{
        this.dialogRef.close();
          if(res.status==200) {
            this.dialog.open(AlertComponent, {width:'300px',data:{action:"Adición",message:"Docente añadido exitosamente"}});
          }
        },error => {
          console.log(error);
          this.dialog.open(AlertComponent, {width:'300px',data:{action:"Error",message:"Error al añadir docente"}});
      }
    );
  }


}
