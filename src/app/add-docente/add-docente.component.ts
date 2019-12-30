import { Component, OnInit } from '@angular/core';
import {MateriasService} from "../services/materias.service";
import {NgForm} from "@angular/forms";
import {Docentes} from "../models/docentes";
@Component({
  selector: 'app-add-docente',
  templateUrl: './add-docente.component.html',
  styleUrls: ['./add-docente.component.css']
})
export class AddDocenteComponent implements OnInit {

  public docente:Docentes;

  constructor(private materiasService: MateriasService) {
    this.docente= new Docentes('','','','','',0,0,0,0);
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.materiasService.postDocente(this.docente).subscribe(
      response=>{console.log(response);},
      error => {console.log(error);}
    );
  }
}
