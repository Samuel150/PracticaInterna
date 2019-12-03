import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";


export interface Materias {
  materia : string;
  docente : string;
  inicio : string;
  fin : string;
  planillaFirmada: boolean;
  chequeSolicitado: boolean;
  chequeRecibido: boolean;
  chequeEntregado: boolean;
}


const MATERIAS: Materias[] = [
  {materia: 'Materia1', docente: 'Docente14', inicio: '12/3/20', fin: '3/5/20',planillaFirmada:true,chequeSolicitado: false, chequeRecibido: true, chequeEntregado: false},
  {materia: 'Materia2', docente: 'Docente1', inicio: '12/3/20', fin: '3/5/20',planillaFirmada:false,chequeSolicitado: false, chequeRecibido: true, chequeEntregado: false},
  {materia: 'Materia3', docente: 'Docente5', inicio: '12/3/20', fin: '3/5/20',planillaFirmada:false,chequeSolicitado: false, chequeRecibido: true, chequeEntregado: false},
  {materia: 'Materia3', docente: 'Docente5', inicio: '12/3/20', fin: '3/5/20',planillaFirmada:false,chequeSolicitado: false, chequeRecibido: true, chequeEntregado: false}
]

@Component({
  selector: 'app-contabilidad',
  templateUrl: './contabilidad.component.html',
  styleUrls: ['./contabilidad.component.css']
})
export class ContabilidadComponent implements OnInit {

  displayedColumnsMaterias: string[]=['materia','docente','inicio','fin','planillaFirmada', 'solicitudCheque', 'llegadaCheque', 'entregaCheque'];
  dataSourceMaterias =  new MatTableDataSource(MATERIAS);
  selectionMaterias = new SelectionModel(true,[]);


  constructor() { }

  ngOnInit() {
  }

}
