import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from '@angular/cdk/collections';
import {MateriasService} from "../services/materias.service";
import {FormControl, FormGroup} from "@angular/forms";
import {merge, Observable} from "rxjs";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddMateriaComponent} from "../add-materia/add-materia.component";
import {AddDocenteComponent} from "../add-docente/add-docente.component";


// export interface Materia {
//   materia : string;
//   docente : string;
//   inicio : string;
//   fin : string;
//   silaboSubido: boolean;
//   aulaRevisada: boolean;
//   examenRevisado: boolean;
// }
// export interface Docentes {
//   docente : string;
//   materiasAsignadas: number;
//   horasDePlanta: number;
//   horasCubiertas: number;
//   horasFaltantes: number;
//   evaluacionPorPares: boolean;
// }
export interface Configuracion {
  opcion: String
}

// const MATERIAS: Materia[] = [
//   {materia: 'Materia1', docente: 'Docente14', inicio: '12/3/20', fin: '3/5/20', silaboSubido: false, aulaRevisada: false, examenRevisado: false},
//   {materia: 'Materia2', docente: 'Docente1', inicio: '12/3/20', fin: '3/5/20', silaboSubido: false, aulaRevisada: false, examenRevisado: false},
//   {materia: 'Materia3', docente: 'Docente5', inicio: '12/3/20', fin: '3/5/20', silaboSubido: false, aulaRevisada: false, examenRevisado: false},
// ];
//
// const DOCENTES: Docentes[] = [
//   {docente: 'Docente14', materiasAsignadas: 4, horasDePlanta: 8, horasCubiertas: 2,horasFaltantes: 6, evaluacionPorPares: false},
//   {docente: 'Docente1', materiasAsignadas: 6, horasDePlanta: 16, horasCubiertas: 8,horasFaltantes: 8, evaluacionPorPares: true},
//   {docente: 'Docente5', materiasAsignadas: 1, horasDePlanta: 4, horasCubiertas: 2,horasFaltantes: 2, evaluacionPorPares: true},
// ];


const CONFIGURACION: Configuracion[] = [
  {opcion: 'Mostrar pendientes de subida de silabo'},
  {opcion: 'Mostrar pendientes de revicion de aula'},
  {opcion: 'Mostrar pendientes de revicion de exxamen'},
  {opcion: 'Mostrar pendientes de evaluacion de docentes'},
];


export interface DialogData {

}

@Component({
  selector: 'app-pending',
  templateUrl: './jefe-de-carrera.component.html',
  styleUrls: ['./jefe-de-carrera.component.css']
})
export class JefeDeCarreraComponent implements AfterViewInit {



  constructor(private materiaService: MateriasService, public dialogMaterias: MatDialog) {

  }

  openAddMaterias() {
    let dialogRef = this.dialogMaterias.open(AddMateriaComponent, {width:'750px', height:'450px'});

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog cerrado');
    });
  }
  openAddDocentes() {
    let dialogRef = this.dialogMaterias.open(AddDocenteComponent, {width:'750px', height:'450px'});

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog cerrado');
    });
  }
  ngOnInit() {
    this.getMaterias();
    this.getDocentes();
  }

  displayedColumnsMaterias: string[]=['materia','docente','inicio','fin','silaboSubido', 'aulaRevisada', 'examenRevisado'];

  displayedColumnsDocentes: string[]=['docente','materiasAsignadas','horasDePlanta','horasCubiertas','horasFaltantes', 'evaluacionPorPares'];

  displayedColumnsSeguimiento: string[]=['materia','docente','inicio','fin', 'silaboSubido','aulaRevisada', 'examenRevisado', 'contratoImpreso', 'contratoFirmado', 'planillaFirmada', 'chequeSolicitado', 'chequeRecibido','chequeEntregado'];

  dataSourceDocentes;
  dataSourceMaterias;

  displayedColumnsConfiguracion: string[]=['opcion','configuracion'];
  dataSourceConfiguracion =  new MatTableDataSource(CONFIGURACION);
  selectionConfiguracion = new SelectionModel(true,[]);

  getMaterias(){
    this.materiaService.getMaterias().subscribe(
      res => {
        this.dataSourceMaterias = res.materias;
      }, err => {
        console.log(err);
      }
    );
  }

  getDocentes(){
    this.materiaService.getDocentes().subscribe(
      res=>{
        this.dataSourceDocentes = res.docentes;
      },err=>{

      }
    );
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
    cheque_recibido: new FormControl(false)

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
      {def: 'cheque_recibido', label: 'Cheque Recibido', hide: this.cheque_recibido.value}
    ];

  getDisplayedColumns():string[] {
    return this.columnDefinitions.filter(cd=>!cd.hide).map(cd=>cd.def);
  }

  ngAfterViewInit(){
    let o1:Observable<boolean> = this.nombre.valueChanges;
    let o2:Observable<boolean> = this.id_docente.valueChanges;
    let o3:Observable<boolean> = this.inicio.valueChanges;
    let o4:Observable<boolean> = this.fin.valueChanges;
    let o5:Observable<boolean> = this.silabo_subido.valueChanges;
    let o6:Observable<boolean> = this.aula_revisada.valueChanges;
    let o7:Observable<boolean> = this.examen_revisado.valueChanges;
    let o8:Observable<boolean> = this.contrato_impreso.valueChanges;
    let o9:Observable<boolean> = this.contrato_firmado.valueChanges;
    let o10:Observable<boolean> = this.planilla_firmada.valueChanges;
    let o11:Observable<boolean> = this.cheque_solicitado.valueChanges;
    let o12:Observable<boolean> = this.cheque_recibido.valueChanges;

    merge(o1,o2,o3,o4,o5,o6,o7,o8,o9,o10,o11,o12).subscribe( v=>{
      this.columnDefinitions[0].hide = this.nombre.value;
      this.columnDefinitions[1].hide = this.id_docente.value;
      this.columnDefinitions[2].hide = this.inicio.value;
      this.columnDefinitions[3].hide = this.fin.value;
      this.columnDefinitions[4].hide = this.silabo_subido.value;
      this.columnDefinitions[5].hide = this.aula_revisada.value;
      this.columnDefinitions[6].hide = this.examen_revisado.value;
      this.columnDefinitions[7].hide = this.contrato_impreso.value;
      this.columnDefinitions[8].hide = this.contrato_firmado.value;
      this.columnDefinitions[9].hide = this.planilla_firmada.value;
      this.columnDefinitions[10].hide = this.cheque_solicitado.value;
      this.columnDefinitions[11].hide = this.cheque_recibido.value;
      console.log(this.columnDefinitions)
    })
  }

}

