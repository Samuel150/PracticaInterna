import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";

export interface Materias {
  materia : string;
  docente : string;
  inicio : string;
  fin : string;
  contratoImpreso: boolean;
  contratoFirmado: boolean;
}

const MATERIAS: Materias[] = [
  {materia: 'Materia1', docente: 'Docente14', inicio: '12/3/20', fin: '3/5/20', contratoImpreso: true, contratoFirmado: false},
  {materia: 'Materia2', docente: 'Docente1', inicio: '12/3/20', fin: '3/5/20',contratoImpreso: false, contratoFirmado: true},
  {materia: 'Materia3', docente: 'Docente5', inicio: '12/3/20', fin: '3/5/20', contratoImpreso: true, contratoFirmado: false},
]

@Component({
  selector: 'app-asistente-administrativo',
  templateUrl: './asistente-administrativo.component.html',
  styleUrls: ['./asistente-administrativo.component.css']
})
export class AsistenteAdministrativoComponent implements OnInit {


  displayedColumnsMaterias: string[]=['materia','docente','inicio','fin','impresionContrato', 'firmaContrato'];
  dataSourceMaterias =  new MatTableDataSource(MATERIAS);
  selectionMaterias = new SelectionModel(true,[]);
  constructor() { }


  ngOnInit() {
  }

}
