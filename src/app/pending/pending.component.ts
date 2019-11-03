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
const ELEMENT_DATA: Pendientes[] = [
  {materia: 'Materia1', docente: 'Docente14', inicio: '12/3/20', fin: '3/5/20', pendiente: 'El contrato no ha sido impreso'},
  {materia: 'Materia2', docente: 'Docente1', inicio: '12/3/20', fin: '3/5/20', pendiente: 'El contrato no ha sido impreso'},
  {materia: 'Materia3', docente: 'Docente5', inicio: '12/3/20', fin: '3/5/20', pendiente: 'El contrato no ha sido impreso'},
  {materia: 'Materia4', docente: 'Docente17', inicio: '12/3/20', fin: '3/5/20', pendiente: 'El contrato no ha sido impreso'},
  {materia: 'Materia5', docente: 'Docente22', inicio: '12/3/20', fin: '3/5/20', pendiente: 'El contrato no ha sido impreso'}
]

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {
  displayedColumns: string[]=['materia','docente','inicio','fin','pendiente', 'selection'];
  dataSource =  new MatTableDataSource<Pendientes>(ELEMENT_DATA);
  selection = new SelectionModel<Pendientes>(true,[]);
  constructor() { }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  checkboxLabel(row?: Pendientes): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.pendiente+ 1}`;
  }

  ngOnInit() {
  }

}
