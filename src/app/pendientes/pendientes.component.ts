import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

export interface Pendientes {
  materia : string;
  docente : string;
  inicio : string;
  fin : string;
  pendiente: string;
  hecho: boolean;
}
const PENDIENTES: Pendientes[] = [
  {materia: 'Materia1', docente: 'Docente14', inicio: '12/3/20', fin: '3/5/20', pendiente: 'El contrato no ha sido impreso', hecho: false},
  {materia: 'Materia2', docente: 'Docente1', inicio: '12/5/20', fin: '3/5/20', pendiente: 'El contrato no ha sido impreso', hecho: true},
  {materia: 'Materia3', docente: 'Docente5', inicio: '12/7/20', fin: '3/8/20', pendiente: 'El contrato no ha sido impreso',hecho: false},
]
@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.css']
})
export class PendientesComponent implements OnInit {
  displayedColumnsPendientes: string[]=['materia','docente','inicio','fin','pendiente', 'hecho'];
  dataSourcePendientes =  new MatTableDataSource(PENDIENTES);
  constructor() { }

  ngOnInit() {
  }

}
