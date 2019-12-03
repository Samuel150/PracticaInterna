import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";

export interface Materias {
  materia : string;
  docente : string;
  inicio : string;
  fin : string;
  recordatorioEnviado: boolean;
  planillaFirmada: boolean
}

const MATERIAS: Materias[] = [
  {materia: 'Materia1', docente: 'Docente14', inicio: '12/3/20', fin: '3/5/20', recordatorioEnviado: true, planillaFirmada: false},
  {materia: 'Materia2', docente: 'Docente1', inicio: '12/3/20', fin: '3/5/20', recordatorioEnviado: true, planillaFirmada: false},
  {materia: 'Materia3', docente: 'Docente5', inicio: '12/3/20', fin: '3/5/20', recordatorioEnviado: true, planillaFirmada: false},
]

@Component({
  selector: 'app-encargada-registros',
  templateUrl: './encargada-registros.component.html',
  styleUrls: ['./encargada-registros.component.css']
})
export class EncargadaRegistrosComponent implements OnInit {


  displayedColumnsMaterias: string[]=['materia','docente','inicio','fin','recordatorioEnviado', 'planillaFirmada'];
  dataSourceMaterias =  new MatTableDataSource(MATERIAS);
  selectionMaterias = new SelectionModel(true,[]);
  constructor() { }



  ngOnInit() {
  }

}
