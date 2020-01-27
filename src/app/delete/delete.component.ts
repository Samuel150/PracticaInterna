import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MateriasService} from "../services/materias.service";
import {AlertComponent} from "../alert/alert.component";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent  {

  constructor(@Inject(MAT_DIALOG_DATA) public data,public dialogRef: MatDialogRef<DeleteComponent>,private materiaService:MateriasService,public dialog: MatDialog) { }


  confirmDeletion() {
    if(this.data.def == "materia"){
      this.materiaService.deleteMateria(this.data.element).subscribe(
        res=>{
          this.dialogRef.close();
          if(res.status==200) {
            this.dialog.open(AlertComponent, {width:'300px',data:{action:"Eliminar",message:"Materia eliminada exitosamente"}});
          }
        },error => {
          console.log(error);
          this.dialog.open(AlertComponent, {width:'300px',data:{action:"Error",message:"Error al eliminar materia"}});
        }
      )
    }else if(this.data.def == "docente"){
      this.materiaService.deleteDocente(this.data.element).subscribe(
        res=>{
          this.dialogRef.close();
          if(res.status==200) {
            this.dialog.open(AlertComponent, {width:'300px',data:{action:"Eliminar",message:"Docente eliminado exitosamente"}});
          }
        },error => {
          console.log(error);
          this.dialog.open(AlertComponent, {width:'300px',data:{action:"Error",message:"Error al eliminar docente"}});
        }
      )
    }else if(this.data.def == "usuario"){
      this.materiaService.deleteUsuarios(this.data.element._id).subscribe(
        res=>{
          this.dialogRef.close();
          if(res.status==200) {
            this.dialog.open(AlertComponent, {width:'300px',data:{action:"Eliminar",message:"Usuario eliminado exitosamente"}});
          }
        },error => {
          console.log(error);
          this.dialog.open(AlertComponent, {width:'300px',data:{action:"Error",message:"Error al eliminar usuario"}});
        }
      )
    }
  }

  cancelDeletion() {
    this.dialogRef.close()
  }
}
