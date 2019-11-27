import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from '@angular/cdk/collections';


export interface Materias {
  materia : string;
  docente : string;
  inicio : string;
  fin : string;
}
export interface Docentes {
  docente : string;
  materiasAsignadas: number;
  horasDePlanta: number;
  horasCubiertas: number;
  horasFaltantes: number;

}
export interface Seguimiento {
  materia : string;
  docente : string;
  inicio : string;
  fin : string;
}
export interface Configuracion {
  opcion: String
}

const MATERIAS: Materias[] = [
  {materia: 'Materia1', docente: 'Docente14', inicio: '12/3/20', fin: '3/5/20'},
  {materia: 'Materia2', docente: 'Docente1', inicio: '12/3/20', fin: '3/5/20'},
  {materia: 'Materia3', docente: 'Docente5', inicio: '12/3/20', fin: '3/5/20'},
]
const DOCENTES: Docentes[] = [
  {docente: 'Docente14', materiasAsignadas: 4, horasDePlanta: 8, horasCubiertas: 2,horasFaltantes: 6},
  {docente: 'Docente1', materiasAsignadas: 6, horasDePlanta: 16, horasCubiertas: 8,horasFaltantes: 8},
  {docente: 'Docente5', materiasAsignadas: 1, horasDePlanta: 4, horasCubiertas: 2,horasFaltantes: 2},
]
const SEGUIMIENTO: Seguimiento[] = [
  {materia: 'Materia1', docente: 'Docente14', inicio: '12/3/20', fin: '3/5/20'},
  {materia: 'Materia2', docente: 'Docente1', inicio: '12/3/20', fin: '3/5/20'},
  {materia: 'Materia3', docente: 'Docente5', inicio: '12/3/20', fin: '3/5/20'},
]
const CONFIGURACION: Configuracion[] = [
  {opcion: 'Mostrar pendientes de subida de silabo'},
  {opcion: 'Mostrar pendientes de revicion de aula'},
  {opcion: 'Mostrar pendientes de revicion de exxamen'},
  {opcion: 'Mostrar pendientes de evaluacion de docentes'},
]


@Component({
  selector: 'app-pending',
  templateUrl: './jefe-de-carrera.component.html',
  styleUrls: ['./jefe-de-carrera.component.css']
})
export class JefeDeCarreraComponent implements OnInit {



  displayedColumnsMaterias: string[]=['materia','docente','inicio','fin','silabo', 'aula', 'revExamen'];
  dataSourceMaterias =  new MatTableDataSource(MATERIAS);
  selectionMaterias = new SelectionModel(true,[]);

  displayedColumnsDocentes: string[]=['docente','materiasAsignadas','horasDePlanta','horasCubiertas','horasFaltantes', 'evalPares'];
  dataSourceDocentes =  new MatTableDataSource(DOCENTES);
  selectionDocentes = new SelectionModel(true,[]);

  displayedColumnsSeguimiento: string[]=['materia','docente','inicio','fin', 'silabo','aula', 'revExamen', 'imprContrato', 'firmContrato', 'firmPlanilla', 'soliCheque', 'llegaCheque','entrCheque'];
  dataSourceSeguimiento =  new MatTableDataSource(SEGUIMIENTO);
  selectionSeguimiento = new SelectionModel(true,[]);

  displayedColumnsConfiguracion: string[]=['opcion','configuracion'];
  dataSourceConfiguracion =  new MatTableDataSource(CONFIGURACION);
  selectionConfiguracion = new SelectionModel(true,[]);


  constructor() { }




  ngOnInit() {
  }

}

