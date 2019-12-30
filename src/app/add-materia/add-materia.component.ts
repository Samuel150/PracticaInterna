import { Component, OnInit } from '@angular/core';
import {MateriasService} from "../services/materias.service";
import {NgForm} from "@angular/forms";
import {Materias} from "../models/materias";

@Component({
  selector: 'app-add-materia',
  templateUrl: './add-materia.component.html',
  styleUrls: ['./add-materia.component.css']
})
export class AddMateriaComponent implements OnInit {

  public materia:Materias;

  constructor(private materiasService: MateriasService) {
    this.materia = new Materias('','','','','',false,false,false,false,false,false,false,false,5);
  }

  ngOnInit() {

  }



  onSubmit(form: NgForm) {
    console.log(form.value);
    this.materiasService.postMateria(this.materia).subscribe(
      response=>{console.log(response);},
        error=>{console.log(error);}
    );
  }
}
