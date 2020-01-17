import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from '@angular/cdk/collections';
import {MateriasService} from "../services/materias.service";
import {FormControl, FormGroup} from "@angular/forms";
import {merge, Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AddMateriaComponent} from "../add-materia/add-materia.component";
import {AddDocenteComponent} from "../add-docente/add-docente.component";
import {MatSort} from '@angular/material/sort';
import {Docente} from "../models/docente";
import {Materia} from "../models/materia";
import {MatPaginator} from "@angular/material/paginator";
import {EditMateriaComponent} from "../edit-materia/edit-materia.component";

export class Configuracion {
  constructor(
    public label: string
  ){

  }
}

@Component({
  selector: 'app-pending',
  templateUrl: './jefe-de-carrera.component.html',
  styleUrls: ['./jefe-de-carrera.component.css']
})
export class JefeDeCarreraComponent implements OnInit, AfterViewInit {

  admin: boolean = true;
  jefe: boolean = false;
  asistente: boolean= false;
  registros: boolean= false;
  contabilidad: boolean= false;

  constructor(private materiaService: MateriasService, public dialogMaterias: MatDialog) {
  }

  displayedColumnsConfiguracion: string[]=['opcion','configuracion'];

  public dataSourceMaterias: MatTableDataSource<Materia>;
  public dataSourceMaterias2: MatTableDataSource<Materia>;
  public dataSourceMaterias3: MatTableDataSource<Materia>;
  public dataSourceDocentes: MatTableDataSource<Docente>;

  @ViewChild('sortGeneral', {read: MatSort, static: false}) public sort1 : MatSort;
  @ViewChild('sortDocentes', {read: MatSort, static: false}) public sort2 : MatSort;
  @ViewChild('sortMaterias', {read: MatSort, static: false}) public sort3 : MatSort;

  @ViewChild('paginatorDocentes',{read:MatPaginator,static: false}) public paginator2: MatPaginator;
  @ViewChild('paginatorMaterias',{read:MatPaginator,static: false}) public paginator3: MatPaginator;
  @ViewChild('paginatorGeneral',{read:MatPaginator,static: false}) public paginator1: MatPaginator;

  form:FormGroup = new FormGroup({
    nombre: new FormControl(true),
    id_docente: new FormControl(true),
    inicio: new FormControl(true),
    fin: new FormControl(true),
    silabo_subido: new FormControl(true),
    aula_revisada: new FormControl(true),
    examen_revisado: new FormControl(true),
    contrato_impreso: new FormControl(true),
    contrato_firmado: new FormControl(true),
    planilla_lista: new FormControl(true),
    planilla_firmada: new FormControl(true),
    cheque_solicitado: new FormControl(true),
    cheque_recibido: new FormControl(true),
    cheque_entregado: new FormControl(true),
    opciones: new FormControl(this.admin||this.jefe||this.asistente)
  });

  formMaterias: FormGroup = new FormGroup({
    nombre: new FormControl(true),
    id_docente: new FormControl(true),
    inicio: new FormControl(true),
    fin: new FormControl(true),
    horas_planta: new FormControl(this.admin),
    horas_totales: new FormControl(this.admin),
    silabo_subido: new FormControl(this.admin),
    aula_revisada: new FormControl(this.admin),
    examen_revisado: new FormControl(this.admin),
    contrato_impreso: new FormControl(this.asistente),
    contrato_firmado: new FormControl(this.asistente),
    planilla_lista: new FormControl(this.registros),
    planilla_firmada: new FormControl(this.registros || this.contabilidad),
    cheque_solicitado: new FormControl(this.contabilidad),
    cheque_recibido: new FormControl(this.contabilidad),
    cheque_entregado: new FormControl(this.contabilidad),
    opciones: new FormControl(this.admin||this.jefe||this.asistente)
  });

  formDocentes: FormGroup = new FormGroup({
    nombre: new FormControl(true),
    segundo_nombre: new FormControl(true),
    apellido_paterno: new FormControl(true),
    apellido_materno: new FormControl(true),
    materias_asignadas: new FormControl(this.admin),
    horas_planta: new FormControl(this.admin),
    horas_cubiertas: new FormControl(this.admin),
    horas_faltantes: new FormControl(this.admin),
    evaluacion_pares: new FormControl(this.admin),
    opciones: new FormControl(this.admin||this.jefe||this.asistente)
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
  planilla_lista = this.form.get('planilla_lista');
  planilla_firmada = this.form.get('planilla_firmada');
  cheque_solicitado = this.form.get('cheque_solicitado');
  cheque_recibido = this.form.get('cheque_recibido');
  cheque_entregado = this.form.get('cheque_entregado');
  opciones = this.form.get('opciones');

  nombre2 = this.formMaterias.get('nombre');
  id_docente2 = this.formMaterias.get('id_docente');
  inicio2 = this.formMaterias.get('inicio');
  fin2 = this.formMaterias.get('fin');
  horas_planta2 = this.formMaterias.get('horas_planta');
  horas_totales2 = this.formMaterias.get('horas_totales');
  silabo_subido2 = this.formMaterias.get('silabo_subido');
  aula_revisada2 = this.formMaterias.get('aula_revisada');
  examen_revisado2 = this.formMaterias.get('examen_revisado');
  contrato_impreso2 = this.formMaterias.get('contrato_impreso');
  contrato_firmado2 = this.formMaterias.get('contrato_firmado');
  planilla_lista2 = this.formMaterias.get('planilla_lista');
  planilla_firmada2 = this.formMaterias.get('planilla_firmada');
  cheque_solicitado2 = this.formMaterias.get('cheque_solicitado');
  cheque_recibido2 = this.formMaterias.get('cheque_recibido');
  cheque_entregado2 = this.formMaterias.get('cheque_entregado');
  opciones2 = this.formMaterias.get('opciones');

  nombre3 = this.formDocentes.get('nombre');
  segundo_nombre3 = this.formDocentes.get('segundo_nombre');
  apellido_paterno3 = this.formDocentes.get('apellido_paterno');
  apellido_materno3 = this.formDocentes.get('apellido_materno');
  materias_asignadas3 = this.formDocentes.get('materias_asignadas');
  horas_planta3 = this.formDocentes.get('horas_planta');
  horas_cubiertas3 = this.formDocentes.get('horas_cubiertas');
  horas_faltantes3 = this.formDocentes.get('horas_faltantes');
  evaluacion_pares3 = this.formDocentes.get('evaluacion_pares');
  opciones3 = this.formMaterias.get('opciones');

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
      {def: 'planilla_lista', label: 'Planilla Lista', hide: this.planilla_lista.value},
      {def: 'planilla_firmada', label: 'Planilla Firmada', hide: this.planilla_firmada.value},
      {def: 'cheque_solicitado', label: 'Cheque Solicitado', hide: this.cheque_solicitado.value},
      {def: 'cheque_recibido', label: 'Cheque Recibido', hide: this.cheque_recibido.value},
      {def: 'cheque_entregado', label: 'Cheque Entregado', hide: this.cheque_entregado.value},
      {def: 'opciones',label: 'Opciones',hide: this.opciones.value}
    ];

  displayedColumnsMaterias =
    [{def: 'nombre', label: 'Materia', hide: this.nombre2.value},
      {def: 'id_docente', label: 'Docente', hide: this.id_docente2.value},
      {def: 'inicio', label: 'Inicio', hide: this.inicio2.value},
      {def: 'fin', label: 'Fin', hide: this.fin2.value},
      {def : 'horas_planta', label: 'Horas de Planta', hide: this.horas_planta2.value},
      {def: 'horas_totales', label: 'Horas Totales', hide: this.horas_totales2.value},
      {def: 'silabo_subido', label: 'Silabo Subido', hide: this.silabo_subido2.value},
      {def: 'aula_revisada', label: 'Aula Revisada', hide: this.aula_revisada2.value},
      {def: 'examen_revisado', label: 'Examen Revisado', hide: this.examen_revisado2.value},
      {def: 'contrato_impreso', label: 'Contrato Impreso', hide: this.contrato_impreso2.value},
      {def: 'contrato_firmado', label: 'Contrato Firmado', hide: this.contrato_firmado2.value},
      {def: 'planilla_lista', label: 'Planilla Lista', hide: this.planilla_lista2.value},
      {def: 'planilla_firmada', label: 'Planilla Firmada', hide: this.planilla_firmada2.value},
      {def: 'cheque_solicitado', label: 'Cheque Solicitado', hide: this.cheque_solicitado2.value},
      {def: 'cheque_recibido', label: 'Cheque Recibido', hide: this.cheque_recibido2.value},
      {def: 'cheque_entregado', label: 'Cheque Entregado', hide: this.cheque_entregado2.value},
      {def: 'opciones',label: 'Opciones',hide: this.opciones2.value}
    ];

  displayedColumnsDocentes =
    [{def: 'nombre', label: 'Docente', hide: this.nombre3.value},
      {def: 'materias_asignadas',label: 'Materia Asignadas',hide: this.materias_asignadas3.value},
      {def:'horas_planta',label: 'Horas de Planta',hide: this.horas_planta3.value},
      {def:'horas_cubiertas',label: 'Horas Cubiertas',hide: this.horas_cubiertas3.value},
      {def:'horas_faltantes',label: 'Horas Faltantes',hide: this.horas_faltantes3.value},
      {def:'evaluacion_pares',label: 'Evaluacion por Pares',hide: this.evaluacion_pares3.value},
      {def: 'opciones',label: 'Opciones',hide: this.opciones3.value}
    ];

  public dataSourceConfiguracion: MatTableDataSource<Configuracion> = new MatTableDataSource(this.neededColumnDefinitions());
  public dataSourceConfiguracionMaterias: MatTableDataSource<Configuracion> = new MatTableDataSource(this.neededColumnDefinitionsMaterias());
  public dataSourceConfiguracionDocentes: MatTableDataSource<Configuracion> = new MatTableDataSource(this.neededColumnDefinitionsDocentes());


  ngAfterViewInit(){
    //General
    let o5:Observable<boolean> = this.silabo_subido.valueChanges;
    let o6:Observable<boolean> = this.aula_revisada.valueChanges;
    let o7:Observable<boolean> = this.examen_revisado.valueChanges;
    let o8:Observable<boolean> = this.contrato_impreso.valueChanges;
    let o9:Observable<boolean> = this.contrato_firmado.valueChanges;
    let o10:Observable<boolean> = this.planilla_lista.valueChanges;
    let o11:Observable<boolean> = this.planilla_firmada.valueChanges;
    let o12:Observable<boolean> = this.cheque_solicitado.valueChanges;
    let o13:Observable<boolean> = this.cheque_recibido.valueChanges;
    let o14:Observable<boolean> = this.cheque_entregado.valueChanges;
    //Materia
    let o15:Observable<boolean> = this.horas_planta2.valueChanges;
    let o16:Observable<boolean> = this.horas_totales2.valueChanges;
    let o17:Observable<boolean> = this.silabo_subido2.valueChanges;
    let o18:Observable<boolean> = this.aula_revisada2.valueChanges;
    let o19:Observable<boolean> = this.examen_revisado2.valueChanges;
    let o20:Observable<boolean> = this.contrato_impreso2.valueChanges;
    let o21:Observable<boolean> = this.contrato_firmado2.valueChanges;
    let o22:Observable<boolean> = this.planilla_lista2.valueChanges;
    let o23:Observable<boolean> = this.planilla_firmada2.valueChanges;
    let o24:Observable<boolean> = this.cheque_solicitado2.valueChanges;
    let o25:Observable<boolean> = this.cheque_recibido2.valueChanges;
    let o26:Observable<boolean> = this.cheque_entregado2.valueChanges;
    //Docente
    let o27: Observable<boolean> = this.materias_asignadas3.valueChanges;
    let o28: Observable<boolean> = this.horas_planta3.valueChanges;
    let o29: Observable<boolean> = this.horas_cubiertas3.valueChanges;
    let o30: Observable<boolean> = this.horas_faltantes3.valueChanges;
    let o31: Observable<boolean> = this.evaluacion_pares3.valueChanges;
    merge(o5,o6,o7,o8,o9,o10,o11,o12,o13,o14,o15,o16,o17,o18,o19,o20,o21,o22,o23,o24,o25,o26,o27,o28,o29,o30,o31).subscribe( ()=>{
      //General
      this.columnDefinitions[4].hide = this.silabo_subido.value;
      this.columnDefinitions[5].hide = this.aula_revisada.value;
      this.columnDefinitions[6].hide = this.examen_revisado.value;
      this.columnDefinitions[7].hide = this.contrato_impreso.value;
      this.columnDefinitions[8].hide = this.contrato_firmado.value;
      this.columnDefinitions[9].hide = this.planilla_lista.value;
      this.columnDefinitions[10].hide = this.planilla_firmada.value;
      this.columnDefinitions[11].hide = this.cheque_solicitado.value;
      this.columnDefinitions[12].hide = this.cheque_recibido.value;
      this.columnDefinitions[13].hide = this.cheque_entregado.value;
      //Materia
      this.displayedColumnsMaterias[4].hide = this.horas_planta2.value;
      this.displayedColumnsMaterias[5].hide = this.horas_totales2.value;
      this.displayedColumnsMaterias[6].hide = this.silabo_subido2.value;
      this.displayedColumnsMaterias[7].hide = this.aula_revisada2.value;
      this.displayedColumnsMaterias[8].hide = this.examen_revisado2.value;
      this.displayedColumnsMaterias[9].hide = this.contrato_impreso2.value;
      this.displayedColumnsMaterias[10].hide = this.contrato_firmado2.value;
      this.displayedColumnsMaterias[11].hide = this.planilla_lista2.value;
      this.displayedColumnsMaterias[12].hide = this.planilla_firmada2.value;
      this.displayedColumnsMaterias[13].hide = this.cheque_solicitado2.value;
      this.displayedColumnsMaterias[14].hide = this.cheque_recibido2.value;
      this.displayedColumnsMaterias[15].hide = this.cheque_entregado2.value;
      //Docente
      this.displayedColumnsDocentes[1].hide = this.materias_asignadas3.value;
      this.displayedColumnsDocentes[2].hide = this.horas_planta3.value;
      this.displayedColumnsDocentes[3].hide = this.horas_cubiertas3.value;
      this.displayedColumnsDocentes[4].hide = this.horas_faltantes3.value;
      this.displayedColumnsDocentes[5].hide = this.evaluacion_pares3.value;
    })
  }

  ngOnInit() {
    this.getDocentes();
    this.getMaterias();
    this.getMaterias3()
  }

  private getMaterias(){
    this.materiaService.getMaterias().subscribe(
      res => {
        this.dataSourceMaterias = new MatTableDataSource(res);
        this.dataSourceMaterias.sort = this.sort1;
        this.dataSourceMaterias.paginator = this.paginator1;
        this.dataSourceMaterias2 = new MatTableDataSource(res);
        this.dataSourceMaterias2.filteredData.map(a=>a.id_docente=this.displayDocente(a.id_docente));
        this.dataSourceMaterias2.sort = this.sort3;
        this.dataSourceMaterias2.paginator = this.paginator3;
      }, err => {
        console.log(err);
      }
    );
  }
  private getMaterias3(){
    this.materiaService.getMaterias().subscribe(
    res=>{
      this.dataSourceMaterias3 = new MatTableDataSource(res);
    }, err => {
      console.log(err);
    }
    )
  }

  private getDocentes(){
    this.materiaService.getDocentes().subscribe(
      res=>{
        this.dataSourceDocentes = new MatTableDataSource(res);
        this.dataSourceDocentes.sort = this.sort2;
        this.dataSourceDocentes.paginator = this.paginator2;
      },err=>{
        console.log(err);
      }
    );
  }

  openAddMaterias() {
    let dialogRef = this.dialogMaterias.open(AddMateriaComponent, {width:'750px', height:'450px'});
    dialogRef.afterClosed().subscribe(() => {
      this.getDocentes();
      this.getMaterias();
      this.getMaterias3();
    });
  }

  openAddDocentes() {
    let dialogRef = this.dialogMaterias.open(AddDocenteComponent, {width:'750px'});
    dialogRef.afterClosed().subscribe(() => {
      this.getDocentes();
      this.getMaterias();
      this.getMaterias3();
    });
  }

  neededColumnDefinitions(){
    return this.columnDefinitions.filter(res=>(res.label!='Opciones'&&res.label != "Materia" && res.label != "Docente" && res.label != "Inicio" && res.label != "Fin"));
  }

  neededColumnDefinitionsMaterias(){
    return this.displayedColumnsMaterias.filter(res=>(res.label!='Opciones'&&res.hide!=false && res.label != "Materia" && res.label != "Docente" && res.label != "Inicio" && res.label != "Fin"));
  }

  neededColumnDefinitionsDocentes(){
    return this.displayedColumnsDocentes.filter(res=>(res.label!='Opciones'&&res.hide!=false && res.label != "Docente"));
  }

  getDisplayedColumns():string[] {
    return this.columnDefinitions.filter(cd=>cd.hide).map(cd=>cd.def);
  }

  getDisplayedColumnsMaterias():string[] {
    return this.displayedColumnsMaterias.filter(cd=>cd.hide).map(cd=>cd.def);
  }

  getDisplayedColumnsDocentes(): string[]{
    return this.displayedColumnsDocentes.filter(cd=>cd.hide).map(cd=>cd.def);
  }

  displayDocente(docente) {
    if(this.dataSourceDocentes!=null){
      let docenteFilter = this.dataSourceDocentes.filteredData;
      let docenteAc = docenteFilter.find(res=>res._id==docente);
      if(docenteAc){
        return docenteAc.nombre+" "+docenteAc.apellido_paterno;
      }else{
        return "";
      }
    }
  }

  displayDate(inicio) {
    if(inicio!=null) {
      return inicio.substr(0, 10);
    }
  }

  applyFilterMaterias(filterValue: string) {
    this.dataSourceMaterias.filter = filterValue.trim().toLowerCase();
  }
  applyFilterMaterias2(filterValue: string) {
    this.dataSourceMaterias2.filter = filterValue.trim().toLowerCase();
  }

  applyFilterDocentes(filterValue: string) {
    this.dataSourceDocentes.filter = filterValue.trim().toLowerCase();
  }

  setCheckbox(idMateria,body) {
    this.materiaService.putMateria(idMateria,body).subscribe(
      res=>{
        console.log(res);
        this.getMaterias();
      },
      error => {
        console.log(error);
      }
    )
  }

  setEvalPares(idDocente,body) {
    this.materiaService.putDocente(idDocente,body).subscribe(
      res=>{
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  editMateria(element: Materia) {
    let dialogRef = this.dialogMaterias.open(EditMateriaComponent, {width:'750px',data:{dataKey: element}});
    dialogRef.afterClosed().subscribe(() => {
      this.getDocentes();
      this.getMaterias();
      this.getMaterias3();
    });
  }

  deleteMateria(element: Materia) {
    console.log(element);
  }
}


