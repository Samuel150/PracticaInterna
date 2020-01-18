import {Component, Input, OnInit} from '@angular/core';
import {MateriasService} from "../services/materias.service";
import {NgForm} from "@angular/forms";
import {Docente} from "../models/docente";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {Materia} from "../models/materia";
import {DocentePost} from "../models/docentePost";
import {MateriaPost} from "../models/materiaPost";
import {Super} from "../models/super";

@Component({
  selector: 'app-add-docente',
  templateUrl: './add-docente.component.html',
  styleUrls: ['./add-docente.component.css']
})
export class AddDocenteComponent implements OnInit {

  public docente:Docente;
  public docentePost:DocentePost;
  public materia:Materia;
  public materiaPost:MateriaPost;
  public super: Super;
  public super2: Super;
  public dataSourceDocentes=[];
  public dataSourceMaterias=[];
  constructor(private materiaService: MateriasService) {
    this.docentePost= new DocentePost('','','','',0,0,0,0,false);
    this.materia= new Materia('','','','','',false,false,false,false,false,false,false,false,false,false,0,0,0);
    this.materiaPost = new MateriaPost('','','','',false,false,false,false,false,false,false,false,false,false,0,0);
    this.docente = new Docente('','','','','',0,0,0,0,false,0);
    this.super = new Super();
    this.super2 = new Super();
  }

  myControl = new FormControl();
  myControlMaterias = new FormControl();
  filterOptions: Observable<string[]>;
  filterOptionsMaterias: Observable<string[]>;

  horasFaltantesDocente: any;


  ngOnInit() {
    this.getDocentes();
    this.getMaterias();
    this.filterOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value=>this._filter(value.toString()))
    );
    this.filterOptionsMaterias = this.myControlMaterias.valueChanges.pipe(
      startWith(''),
      map(value=>this._filterMaterias(value.toString()))
    )
  }
  private getMaterias() {
    this.materiaService.getMaterias().subscribe(
      res => {
        this.dataSourceMaterias = res;
      }, err => {
        console.log(err);
      }
    );
  }


  getDocentes(){
    this.materiaService.getDocentes().subscribe(
      res => {
        this.dataSourceDocentes = res;
      }, err => {
        console.log(err);
      }
    );
  }


  onSubmit(form: NgForm) {
    this.materiaService.postDocente(this.docentePost).subscribe(
      response=>{
        console.log(response);},
      error => {
        console.log(error);
      }
    );
  }

  onSubmitAsign(form) {
    this.super.docente.materias_asignadas +=1;
    let horasPlantaDocente = this.super.docente.horas_planta;
    let horasCubiertasDocente = this.super.docente.horas_cubiertas;
    let horasTotalesMateria = this.super.materia.horas_totales;
    if(horasPlantaDocente - horasCubiertasDocente - horasTotalesMateria >= 0){
      this.super.docente.horas_cubiertas = parseInt(String(horasCubiertasDocente)) + parseInt(String(horasTotalesMateria));
      this.super.materia.horas_planta = horasTotalesMateria;
    }else{
      this.super.docente.horas_cubiertas = horasPlantaDocente;
      this.super.materia.horas_planta = parseInt(String(horasPlantaDocente)) - parseInt(String(horasCubiertasDocente));
    }
    this.materiaService.putMateria(this.super.materia._id, {id_docente: this.super.docente._id,horas_planta: this.super.materia.horas_planta}).subscribe(
      res=>{
        console.log(res);
      }, error => {
        console.log(error);
      }
    );
    this.materiaService.putDocente(this.super.docente._id,{"materias_asignadas":this.super.docente.materias_asignadas,"horas_cubiertas": this.super.docente.horas_cubiertas }).subscribe(
      res=>{
        console.log(res)
      },error => {
        console.log(error)
      }
    );
  }

  displayDocente(subject)  {
    if(subject || (subject instanceof Docente && subject.nombre)) {
      return subject.nombre + " " + subject.apellido_paterno + " " + subject.apellido_materno+" - Horas Faltantes: "+(+subject.horas_planta-subject.horas_cubiertas);
    }else{
      return "";
    }
  }

  displayMateria(subject){
    if(subject){
      return subject.nombre+" "+subject.inicio.substr(0,10)+" "+subject.fin.substr(0,10);
    }
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.dataSourceDocentes.filter(option=>(option.nombre+" "+option.segundo_nombre+" "+option.apellido_paterno+" "+option.apellido_materno).toLowerCase().includes(filterValue));
  }

  private _filterMaterias(value: string) {
    const filterValue = value.toLowerCase();
    return this.dataSourceMaterias.filter(a=>a.id_docente == "").filter(option=>(option.nombre+" "+option.inicio+" "+option.fin).toLowerCase().includes(filterValue));
  }

  displayDate(inicio) : string {
    if(inicio!=null) {
      return inicio.substr(0, 10);
    }
  }

  displayMateria2(option) {
    if (option.nombre){
      return option.nombre + " " + this.displayDate(option.inicio) + " " + this.displayDate(option.fin);
    }else{
      return "";
    }
  }

  displayDocente2(option) {
    if(option.nombre){
      return option.nombre+" "+option.apellido_paterno+" "+option.apellido_materno+" - Horas Faltantes: "+(+option.horas_planta-option.horas_cubiertas);
    }else{
      return "";
    }
  }

}
