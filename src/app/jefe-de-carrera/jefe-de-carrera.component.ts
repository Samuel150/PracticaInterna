import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from '@angular/cdk/collections';
import {MateriasService} from "../services/materias.service";
import {FormControl, FormGroup} from "@angular/forms";
import {merge, Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AddMateriaComponent} from "../add-materia/add-materia.component";
import {AddDocenteComponent} from "../add-docente/add-docente.component";
import {MatSort} from '@angular/material/sort';
import {Docentes} from "../models/docentes";
import {Materias} from "../models/materias";


export interface Configuracion {
  opcion: String
}

const CONFIGURACION: Configuracion[] = [
  {opcion: 'Mostrar pendientes de subida de silabo'},
  {opcion: 'Mostrar pendientes de revicion de aula'},
  {opcion: 'Mostrar pendientes de revicion de exxamen'},
  {opcion: 'Mostrar pendientes de evaluacion de docentes'},
];

@Component({
  selector: 'app-pending',
  templateUrl: './jefe-de-carrera.component.html',
  styleUrls: ['./jefe-de-carrera.component.css']
})
export class JefeDeCarreraComponent implements OnInit, AfterViewInit {
  constructor(private materiaService: MateriasService, public dialogMaterias: MatDialog) {

  }

  displayedColumnsMaterias: string[]=['materia','docente','inicio','fin','silaboSubido', 'aulaRevisada', 'examenRevisado'];
  displayedColumnsDocentes: string[]=['docente','materiasAsignadas','horasDePlanta','horasCubiertas','horasFaltantes', 'evaluacionPorPares'];
  //displayedColumnsSeguimiento: string[]=['materia','docente','inicio','fin', 'silaboSubido','aulaRevisada', 'examenRevisado', 'contratoImpreso', 'contratoFirmado', 'planillaFirmada', 'chequeSolicitado', 'chequeRecibido','chequeEntregado'];

  displayedColumnsConfiguracion: string[]=['opcion','configuracion'];
  dataSourceConfiguracion =  new MatTableDataSource(CONFIGURACION);
  selectionConfiguracion = new SelectionModel(true,[]);

  dataSourceDocentes: MatTableDataSource<Docentes>;
  @ViewChild(MatSort, {static: true}) sort : MatSort;

  dataSourceMaterias: MatTableDataSource<Materias>;

  async ngOnInit() {

    this.getDocentes();
    this.getMaterias();
  }
  getDocentes(){
    this.materiaService.getDocentes().subscribe(
      res=>{
        this.dataSourceDocentes = new MatTableDataSource(res);
        //this.dataSourceDocentes.sort = this.sort;
      },err=>{
        console.log(err);
      }
    );
  }

  getMaterias(){
    this.materiaService.getMaterias().subscribe(
      res => {
        this.dataSourceMaterias = new MatTableDataSource(res);
        this.dataSourceMaterias.sort = this.sort;
      }, err => {
        console.log(err);
      }
    );
  }

  openAddMaterias() {
    let dialogRef = this.dialogMaterias.open(AddMateriaComponent, {width:'750px', height:'450px'});
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openAddDocentes() {
    let dialogRef = this.dialogMaterias.open(AddDocenteComponent, {width:'750px'});
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  form:FormGroup = new FormGroup({
    nombre: new FormControl(false),
    id_docente: new FormControl(false),
    inicio: new FormControl(false),
    fin: new FormControl(false),
    silabo_subido: new FormControl(false),
    aula_revisada: new FormControl(false),
    examen_revisado: new FormControl(false),
    contrato_impreso: new FormControl(false),
    contrato_firmado: new FormControl(false),
    planilla_firmada: new FormControl(false),
    cheque_solicitado: new FormControl(false),
    cheque_recibido: new FormControl(false),
    cheque_entregado: new FormControl(false),
  });

  nombre = this.form.get('nombre');
  id_docente = this.form.get('id_docente');
  inicio = this.form.get('inicio');
  fin = this.form.get('fin');
  silabo_subido = this.form.get('silabo_subido');
  aula_revisada = this.form.get('aula_revisada');
  examen_revisado = this.form.get('examen_revisado');
  contrato_impreso = this.form.get('contrato_impreso');
  contrato_firmado = this.form.get('contrato_firmado');
  planilla_firmada = this.form.get('planilla_firmada');
  cheque_solicitado = this.form.get('cheque_solicitado');
  cheque_recibido = this.form.get('cheque_recibido');
  cheque_entregado = this.form.get('cheque_entregado');

  columnDefinitions =
    [{def: 'nombre', label: 'Materia', hide: this.nombre.value},
      {def: 'id_docente', label: 'Docente', hide: this.id_docente.value},
      {def: 'inicio', label: 'Inicio', hide: this.inicio.value},
      {def: 'fin', label: 'Fin', hide: this.fin.value},
      {def: 'silabo_subido', label: 'Silabo Subido', hide: this.silabo_subido.value},
      {def: 'aula_revisada', label: 'Aula Revisada', hide: this.aula_revisada.value},
      {def: 'examen_revisado', label: 'Examen Revisado', hide: this.examen_revisado.value},
      {def: 'contrato_impreso', label: 'Contrato Impreso', hide: this.contrato_impreso.value},
      {def: 'contrato_firmado', label: 'Contrato Firmado', hide: this.contrato_firmado.value},
      {def: 'planilla_firmada', label: 'Planilla Firmada', hide: this.planilla_firmada.value},
      {def: 'cheque_solicitado', label: 'Cheque Solicitado', hide: this.cheque_solicitado.value},
      {def: 'cheque_recibido', label: 'Cheque Recibido', hide: this.cheque_recibido.value},
      {def: 'cheque_entregado', label: 'Cheque Entregado', hide: this.cheque_entregado.value}
    ];

  neededColumnDefinitions(){
    return this.columnDefinitions.filter(res=>(res.label != "Materia" && res.label != "Docente" && res.label != "Inicio" && res.label != "Fin"));
  }

  getDisplayedColumns():string[] {
    return this.columnDefinitions.filter(cd=>!cd.hide).map(cd=>cd.def);
  }

  ngAfterViewInit(){
    let o5:Observable<boolean> = this.silabo_subido.valueChanges;
    let o6:Observable<boolean> = this.aula_revisada.valueChanges;
    let o7:Observable<boolean> = this.examen_revisado.valueChanges;
    let o8:Observable<boolean> = this.contrato_impreso.valueChanges;
    let o9:Observable<boolean> = this.contrato_firmado.valueChanges;
    let o10:Observable<boolean> = this.planilla_firmada.valueChanges;
    let o11:Observable<boolean> = this.cheque_solicitado.valueChanges;
    let o12:Observable<boolean> = this.cheque_recibido.valueChanges;
    let o13:Observable<boolean> = this.cheque_entregado.valueChanges;
    merge(o5,o6,o7,o8,o9,o10,o11,o12,o13).subscribe( v=>{
      this.columnDefinitions[4].hide = this.silabo_subido.value;
      this.columnDefinitions[5].hide = this.aula_revisada.value;
      this.columnDefinitions[6].hide = this.examen_revisado.value;
      this.columnDefinitions[7].hide = this.contrato_impreso.value;
      this.columnDefinitions[8].hide = this.contrato_firmado.value;
      this.columnDefinitions[9].hide = this.planilla_firmada.value;
      this.columnDefinitions[10].hide = this.cheque_solicitado.value;
      this.columnDefinitions[11].hide = this.cheque_recibido.value;
      this.columnDefinitions[12].hide = this.cheque_entregado.value;
    })
  }

  displayDocente(docente) {
    if(this.dataSourceDocentes!=null){
      var docenteFilter = this.dataSourceDocentes.filteredData;
      var docenteAc = docenteFilter.find(res=>res._id==docente);
      return docenteAc.nombre+" "+docenteAc.apellido_paterno;
    }
  }

  displayDate(inicio) {
    if(inicio!=null) {
      return inicio.substr(0, 10);
    }
  }

  applyFilterMaterias(filterValue: string) {
    this.dataSourceMaterias.filter = filterValue.trim().toLowerCase();
  }

  applyFilterDocentes(filterValue: string) {
    this.dataSourceDocentes.filter = filterValue.trim().toLowerCase();
  }

}


