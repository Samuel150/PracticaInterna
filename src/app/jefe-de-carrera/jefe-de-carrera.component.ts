import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from '@angular/cdk/collections';
import {MateriasService} from "../services/materias.service";
import {Materias} from "../models/materias";


export interface Materia {
  materia : string;
  docente : string;
  inicio : string;
  fin : string;
  silaboSubido: boolean;
  aulaRevisada: boolean;
  examenRevisado: boolean;
}
export interface Docentes {
  docente : string;
  materiasAsignadas: number;
  horasDePlanta: number;
  horasCubiertas: number;
  horasFaltantes: number;
  evaluacionPorPares: boolean;
}
export interface Seguimiento {
    _id: string;
    nombre: string;
    id_docente: string;
    inicio: string;
    fin: string;
    silabo_subido: boolean;
    aula_revisada: boolean;
    examen_revisado: boolean;
    contrato_impreso: boolean;
    contrato_firmado: boolean;
    planilla_firmada: boolean;
    cheque_solicitado: boolean;
    cheque_recibido: boolean;
    __v: number;
}
export interface Configuracion {
  opcion: String
}

const MATERIAS: Materia[] = [
  {materia: 'Materia1', docente: 'Docente14', inicio: '12/3/20', fin: '3/5/20', silaboSubido: false, aulaRevisada: false, examenRevisado: false},
  {materia: 'Materia2', docente: 'Docente1', inicio: '12/3/20', fin: '3/5/20', silaboSubido: false, aulaRevisada: false, examenRevisado: false},
  {materia: 'Materia3', docente: 'Docente5', inicio: '12/3/20', fin: '3/5/20', silaboSubido: false, aulaRevisada: false, examenRevisado: false},
];

const DOCENTES: Docentes[] = [
  {docente: 'Docente14', materiasAsignadas: 4, horasDePlanta: 8, horasCubiertas: 2,horasFaltantes: 6, evaluacionPorPares: false},
  {docente: 'Docente1', materiasAsignadas: 6, horasDePlanta: 16, horasCubiertas: 8,horasFaltantes: 8, evaluacionPorPares: true},
  {docente: 'Docente5', materiasAsignadas: 1, horasDePlanta: 4, horasCubiertas: 2,horasFaltantes: 2, evaluacionPorPares: true},
];

var SEGUIMIENTO2: Seguimiento[];

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
export class JefeDeCarreraComponent implements OnInit {



  constructor(private materiaService: MateriasService) {
  }



  displayedColumnsMaterias: string[]=['materia','docente','inicio','fin','silaboSubido', 'aulaRevisada', 'examenRevisado'];
  //dataSourceMaterias =  new MatTableDataSource(MATERIAS);
  selectionMaterias = new SelectionModel(true,[]);

  displayedColumnsDocentes: string[]=['docente','materiasAsignadas','horasDePlanta','horasCubiertas','horasFaltantes', 'evaluacionPorPares'];
  dataSourceDocentes;
  selectionDocentes = new SelectionModel(true,[]);

  displayedColumnsSeguimiento: string[]=['materia','docente','inicio','fin', 'silaboSubido','aulaRevisada', 'examenRevisado', 'contratoImpreso', 'contratoFirmado', 'planillaFirmada', 'chequeSolicitado', 'chequeRecibido','chequeEntregado'];
  dataSourceMaterias;
  selectionSeguimiento = new SelectionModel(true,[]);


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


  ngOnInit() {
    this.getMaterias();
    this.getDocentes();
  }

}

