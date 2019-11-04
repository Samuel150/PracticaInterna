import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from '@angular/cdk/collections';

export interface Pendientes {
  materia : string;
  docente : string;
  inicio : string;
  fin : string;
  pendiente: string;
}
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
  opciones: String
}

const PENDIENTES: Pendientes[] = [
  {materia: 'Materia1', docente: 'Docente14', inicio: '12/3/20', fin: '3/5/20', pendiente: 'El contrato no ha sido impreso'},
  {materia: 'Materia2', docente: 'Docente1', inicio: '12/3/20', fin: '3/5/20', pendiente: 'El contrato no ha sido impreso'},
  {materia: 'Materia3', docente: 'Docente5', inicio: '12/3/20', fin: '3/5/20', pendiente: 'El contrato no ha sido impreso'},
]
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
  {opciones: 'Mostrar pendientes de subida de silabo'},
  {opciones: 'Mostrar pendientes de revicion de aula'},
  {opciones: 'Mostrar pendientes de revicion de exxamen'},
  {opciones: 'Mostrar pendientes de evaluacion de docentes'},
]


@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {
  displayedColumnsPendientes: string[]=['materia','docente','inicio','fin','pendiente', 'selection'];
  dataSourcePendientes =  new MatTableDataSource(PENDIENTES);
  selectionPendientes = new SelectionModel(true,[]);

  displayedColumnsMaterias: string[]=['materia','docente','inicio','fin','silabo', 'aula', 'revExamen'];
  dataSourceMaterias =  new MatTableDataSource(MATERIAS);
  selectionMaterias = new SelectionModel(true,[]);

  displayedColumnsDocentes: string[]=['docente','materiasAsignadas','horasDePlanta','horasCubiertas','horasFaltantes', 'evalPares'];
  dataSourceDocentes =  new MatTableDataSource(DOCENTES);
  selectionDocentes = new SelectionModel(true,[]);

  displayedColumnsSeguimiento: string[]=['materia','docente','inicio','fin','pendiente', 'silabo','aula', 'revExamen', 'imprContrato', 'firmContrato', 'firmPlanilla', 'soliCheque', 'llegaCheque','entrCheque'];
  dataSourceSeguimiento =  new MatTableDataSource(SEGUIMIENTO);
  selectionSeguimiento = new SelectionModel(true,[]);

  displayedColumnsConfiguracion: string[]=['opcion','configuracion'];
  dataSourceConfiguracion =  new MatTableDataSource(CONFIGURACION);
  selectionConfiguracion = new SelectionModel(true,[]);


  constructor() { }

  isAllSelected() {
    const numSelected = this.selectionPendientes.selected.length;
    const numRows = this.dataSourcePendientes.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selectionPendientes.clear() :
      this.dataSourcePendientes.data.forEach(row => this.selectionPendientes.select(row));
  }
  checkboxLabel(row?: Pendientes): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selectionPendientes.isSelected(row) ? 'deselect' : 'select'} row ${row.pendiente+ 1}`;
  }

  ngOnInit() {
  }

}

