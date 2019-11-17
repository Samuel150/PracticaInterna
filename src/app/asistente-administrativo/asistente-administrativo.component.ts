import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";

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

@Component({
  selector: 'app-asistente-administrativo',
  templateUrl: './asistente-administrativo.component.html',
  styleUrls: ['./asistente-administrativo.component.css']
})
export class AsistenteAdministrativoComponent implements OnInit {
  displayedColumnsPendientes: string[]=['materia','docente','inicio','fin','pendiente', 'selection'];
  dataSourcePendientes =  new MatTableDataSource(PENDIENTES);
  selectionPendientes = new SelectionModel(true,[]);

  displayedColumnsMaterias: string[]=['materia','docente','inicio','fin','impresionContrato', 'firmaContrato'];
  dataSourceMaterias =  new MatTableDataSource(MATERIAS);
  selectionMaterias = new SelectionModel(true,[]);
  constructor() { }

  isAllSelected() {
    const numSelected = this.selectionPendientes.selected.length;
    const numRows = this.dataSourcePendientes.data.length;
    return numSelected === numRows;
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
