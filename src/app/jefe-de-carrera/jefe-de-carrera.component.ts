import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
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
import {EditDocenteComponent} from "../edit-docente/edit-docente.component";
import {TokenService} from "../services/token.service";
import {Router} from "@angular/router";
import {Usuario} from "../models/usuario";
import {AddUsuarioComponent} from "../add-usuario/add-usuario.component";
import {EditUsuarioComponent} from "../edit-usuario/edit-usuario.component";
import {DeleteComponent} from "../delete/delete.component";

export class Configuracion {
  constructor(){
  }
}

@Component({
  selector: 'app-pending',
  templateUrl: './jefe-de-carrera.component.html',
  styleUrls: ['./jefe-de-carrera.component.css']
})
export class JefeDeCarreraComponent implements OnInit {

  public usuarioDoc: Usuario;
  public admin: boolean;
  public jefe: boolean;
  public asistente: boolean;
  public registros: boolean;
  public contabilidad: boolean;

  public dataSourceConfiguracion: MatTableDataSource<Configuracion>;
  public dataSourceConfiguracionMaterias: MatTableDataSource<Configuracion>;
  public dataSourceConfiguracionDocentes: MatTableDataSource<Configuracion>;

  public dataSourceMaterias: MatTableDataSource<Materia>;
  public dataSourceMaterias2: MatTableDataSource<Materia>;
  public dataSourceMaterias3: MatTableDataSource<Materia>;
  public dataSourceDocentes: MatTableDataSource<Docente>;
  public dataSourceUsuarios: MatTableDataSource<Usuario>;

  displayedColumnsConfiguracion: string[]=['opcion','configuracion'];
  displayedColumnsUsuarios: string[]=['nombre','email','rol','opciones'];

  constructor(private route: Router,
              private materiaService: MateriasService,
              public dialogMaterias: MatDialog,
              private tokenService: TokenService) {
  }

  ngOnInit() {
    this.verifyUsuarioDoc().catch(()=>{
      this.route.navigate(['']);
    });
    this.setRoles().catch(()=>{
      this.route.navigate(['']);
    });
    this.setPreferences().catch(()=>{
      this.route.navigate(['']);
    });
    this.setConfigurationTables().catch(()=>{
      this.route.navigate(['']);
    });
    this.getDocentes();
    this.getMaterias();
    this.getMaterias2();
    this.getUsuarios();
  }
  async verifyUsuarioDoc(){
    this.usuarioDoc = await this.tokenService.getUsuarioDocFollow();
    if (!this.usuarioDoc) {
      await this.route.navigate(['']);
    }
    //console.log(this.tokenService.getToken());
  }

  async setRoles(){
    this.admin = this.tokenService.getUsuarioDocFollow().super_usuario;
    this.jefe = this.tokenService.getUsuarioDocFollow().rol=="jefe_carrera";
    this.asistente = this.tokenService.getUsuarioDocFollow().rol=="asistente";
    this.registros = this.tokenService.getUsuarioDocFollow().rol=="registros";
    this.contabilidad = this.tokenService.getUsuarioDocFollow().rol=="contabilidad";
    this.columnDefinitions.filter(a=>a.def=='opciones').map(a=>a.hide=(this.admin||this.jefe||this.asistente));

    this.displayedColumnsMaterias.filter(a=>(a.def=='horas_planta' || a.def=='horas_totales')).map(a=>a.hide=(this.admin||this.jefe||this.asistente));
    this.displayedColumnsMaterias.filter(a=>(a.def=='silabo_subido'||a.def=='aula_revisada' || a.def=='examen_revisado')).map(a=>a.hide=(this.admin||this.jefe));
    this.displayedColumnsMaterias.filter(a=>(a.def=='contrato_impreso'||a.def=='contrato_firmado')).map(a=>a.hide=(this.asistente));
    this.displayedColumnsMaterias.filter(a=>a.def=='planilla_lista').map(a=>a.hide=(this.registros));
    this.displayedColumnsMaterias.filter(a=>a.def=='planilla_firmada').map(a=>a.hide=(this.registros|| this.contabilidad));
    this.displayedColumnsMaterias.filter(a=>(a.def=='cheque_solicitado'||a.def=='cheque_recibido'||a.def=='cheque_entregado')).map(a=>a.hide=(this.contabilidad));
    this.displayedColumnsMaterias.filter(a=>a.def=='opciones').map(a=>a.hide=(this.admin||this.jefe||this.asistente));

    this.displayedColumnsMaterias.filter(a=>(a.def=='horas_planta' || a.def=='horas_totales')).map(a=>a.rol=(this.admin||this.jefe||this.asistente));
    this.displayedColumnsMaterias.filter(a=>(a.def=='silabo_subido'||a.def=='aula_revisada' || a.def=='examen_revisado')).map(a=>a.rol=(this.admin||this.jefe));
    this.displayedColumnsMaterias.filter(a=>(a.def=='contrato_impreso'||a.def=='contrato_firmado')).map(a=>a.rol=(this.asistente));
    this.displayedColumnsMaterias.filter(a=>a.def=='planilla_lista').map(a=>a.rol=(this.registros));
    this.displayedColumnsMaterias.filter(a=>a.def=='planilla_firmada').map(a=>a.rol=(this.registros|| this.contabilidad));
    this.displayedColumnsMaterias.filter(a=>(a.def=='cheque_solicitado'||a.def=='cheque_recibido'||a.def=='cheque_entregado')).map(a=>a.rol=(this.contabilidad));
    this.displayedColumnsMaterias.filter(a=>a.def=='opciones').map(a=>a.rol=(this.admin||this.jefe||this.asistente));
  }

  async setPreferences(){
    let user = this.tokenService.getUsuarioDocFollow();
    let prefMat = user.preferencias_materias;
    if(user.rol=="jefe_carrera"){
      //seguimiento
      this.setPreferenciasSeguimiento(user);
      //docentes
      this.setPreferenciasDocentes(user);
      //materias
      this.displayedColumnsMaterias[4].hide=prefMat.horas_planta;
      this.displayedColumnsMaterias[5].hide=prefMat.horas_totales;
      this.displayedColumnsMaterias[6].hide=prefMat.silabo_subido;
      this.displayedColumnsMaterias[7].hide=prefMat.aula_revisada;
      this.displayedColumnsMaterias[8].hide=prefMat.examen_revisado;
    }else if(user.rol=="asistente"){
      this.setPreferenciasDocentes(user);
      this.displayedColumnsMaterias[9].hide=prefMat.contrato_impreso;
      this.displayedColumnsMaterias[10].hide=prefMat.contrato_firmado;
    }else if(user.rol=="registros"){
      this.displayedColumnsMaterias[11].hide=prefMat.planilla_lista;
      this.displayedColumnsMaterias[12].hide=prefMat.planilla_firmada;
    }else if(user.rol=="contabilidad"){
      this.displayedColumnsMaterias[12].hide=prefMat.planilla_firmada;
      this.displayedColumnsMaterias[13].hide=prefMat.cheque_solicitado;
      this.displayedColumnsMaterias[14].hide=prefMat.cheque_recibido;
      this.displayedColumnsMaterias[15].hide=prefMat.cheque_entregado;
    }
  }

  async setConfigurationTables(){
    this.dataSourceConfiguracion =  new MatTableDataSource(this.neededColumnDefinitions());
    this.dataSourceConfiguracionMaterias =  new MatTableDataSource(this.neededColumnDefinitionsMaterias());
    this.dataSourceConfiguracionDocentes = new MatTableDataSource(this.neededColumnDefinitionsDocentes());
  }

  setPreferenciasDocentes(user){
    let prefDoc = user.preferencias_docente;
    this.displayedColumnsDocentes[1].hide= prefDoc.materias_asignadas;
    this.displayedColumnsDocentes[2].hide= prefDoc.horas_planta;
    this.displayedColumnsDocentes[3].hide= prefDoc.horas_cubiertas;
    this.displayedColumnsDocentes[5].hide= prefDoc.evaluacion_pares;
  }
  setPreferenciasSeguimiento(user: Usuario){
    let prefSeg = user.preferencias_seguimiento;
    let i = 4;
    for(let value of Object.values(prefSeg)){
      if(value == false || value == true){
        this.columnDefinitions[i].hide=value;
        i++;
      }
      if(i == 14){
        break;
      }
    }
  }

  @ViewChild('sortGeneral', {read: MatSort, static: false}) public sort1 : MatSort;
  @ViewChild('sortDocentes', {read: MatSort, static: false}) public sort2 : MatSort;
  @ViewChild('sortMaterias', {read: MatSort, static: false}) public sort3 : MatSort;
  @ViewChild('sortUsuarios', {read: MatSort, static: false}) public sort4 : MatSort;

  @ViewChild('paginatorDocentes',{read:MatPaginator,static: false}) public paginator2: MatPaginator;
  @ViewChild('paginatorMaterias',{read:MatPaginator,static: false}) public paginator3: MatPaginator;
  @ViewChild('paginatorGeneral',{read:MatPaginator,static: false}) public paginator1: MatPaginator;
  @ViewChild('paginatorUsuarios',{read:MatPaginator,static: false}) public paginator4: MatPaginator;


  columnDefinitions =
    [{def: 'nombre', label: 'Materia', hide: true},
      {def: 'id_docente', label: 'Docente', hide: true},
      {def: 'inicio', label: 'Inicio', hide: true},
      {def: 'fin', label: 'Fin', hide: true},
      {def: 'silabo_subido', label: 'Silabo Subido', hide: true},
      {def: 'aula_revisada', label: 'Aula Revisada', hide: true},
      {def: 'examen_revisado', label: 'Examen Revisado', hide: true},
      {def: 'contrato_impreso', label: 'Contrato Impreso', hide: true},
      {def: 'contrato_firmado', label: 'Contrato Firmado', hide: true},
      {def: 'planilla_lista', label: 'Planilla Lista', hide: true},
      {def: 'planilla_firmada', label: 'Planilla Firmada', hide: true},
      {def: 'cheque_solicitado', label: 'Cheque Solicitado', hide: true},
      {def: 'cheque_recibido', label: 'Cheque Recibido', hide: true},
      {def: 'cheque_entregado', label: 'Cheque Entregado', hide: true},
      {def: 'opciones',label: 'Opciones',hide: true}
    ];

  displayedColumnsMaterias =
    [{def: 'nombre', label: 'Materia', hide: true},
      {def: 'id_docente', label: 'Docente', hide: true},
      {def: 'inicio', label: 'Inicio', hide: true},
      {def: 'fin', label: 'Fin', hide: true},
      {def : 'horas_planta', label: 'Horas de Planta',hide: true,rol: true},
      {def: 'horas_totales', label: 'Horas Totales', hide:true,rol: true},
      {def: 'silabo_subido', label: 'Silabo Subido', hide:true,rol: true},
      {def: 'aula_revisada', label: 'Aula Revisada', hide: true,rol: true},
      {def: 'examen_revisado', label: 'Examen Revisado', hide:true,rol: true},
      {def: 'contrato_impreso', label: 'Contrato Impreso', hide:true,rol: true},
      {def: 'contrato_firmado', label: 'Contrato Firmado', hide: true,rol: true},
      {def: 'planilla_lista', label: 'Planilla Lista', hide: true,rol: true},
      {def: 'planilla_firmada', label: 'Planilla Firmada', hide: true,rol: true},
      {def: 'cheque_solicitado', label: 'Cheque Solicitado', hide: true,rol: true},
      {def: 'cheque_recibido', label: 'Cheque Recibido', hide:true,rol: true},
      {def: 'cheque_entregado', label: 'Cheque Entregado', hide: true,rol: true},
      {def: 'opciones',label: 'Opciones',hide: true}
    ];

  displayedColumnsDocentes =
    [{def: 'nombre', label: 'Docente', hide: true},
      {def: 'materias_asignadas',label: 'Materia Asignadas',hide: true},
      {def:'horas_planta',label: 'Horas de Planta',hide: true},
      {def:'horas_cubiertas',label: 'Horas Cubiertas',hide: true},
      {def:'horas_faltantes',label: 'Horas Faltantes',hide: true},
      {def:'evaluacion_pares',label: 'Evaluacion por Pares',hide: true},
      {def: 'opciones',label: 'Opciones',hide: true}
    ];

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
        //console.log(err);
      }
    );
  }
  private getMaterias2(){
    this.materiaService.getMaterias().subscribe(
    res=>{
      this.dataSourceMaterias3 = new MatTableDataSource(res);
    }, err => {
      //console.log(err);
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
        //console.log(err);
      }
    );
  }
  private getUsuarios(){
    this.materiaService.getUsuarios().subscribe(
      res=>{
        this.dataSourceUsuarios = new MatTableDataSource(res);
        this.dataSourceUsuarios.sort = this.sort4;
        this.dataSourceUsuarios.paginator = this.paginator4;
      },err=>{
        //console.log(err);
      }
    );
  }

  openAddMaterias() {
    let dialogRef = this.dialogMaterias.open(AddMateriaComponent, {width:'750px', height:'450px'});
    dialogRef.afterClosed().subscribe(() => {
      this.getDocentes();
      this.getMaterias();
      this.getMaterias2();
    });
  }

  openAddDocentes() {
    let dialogRef = this.dialogMaterias.open(AddDocenteComponent, {width:'750px'});
    dialogRef.afterClosed().subscribe(() => {
      this.getDocentes();
      this.getMaterias();
      this.getMaterias2();
    });
  }

  neededColumnDefinitions(){
    return this.columnDefinitions.filter(res=>(res.label!='Opciones'&&res.label != "Materia" && res.label != "Docente" && res.label != "Inicio" && res.label != "Fin"));
  }

  neededColumnDefinitionsMaterias(){
    return this.displayedColumnsMaterias.filter(res=>(res.label!='Opciones'&&res.rol!=false && res.label != "Materia" && res.label != "Docente" && res.label != "Inicio" && res.label != "Fin"));
  }

  neededColumnDefinitionsDocentes(){
    return this.displayedColumnsDocentes.filter(res=>(res.label!='Opciones' && res.label != "Docente"));
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
        if(docenteAc.segundo_nombre!=""){
          return docenteAc.nombre+" "+docenteAc.segundo_nombre+" "+docenteAc.apellido_paterno+" "+docenteAc.apellido_materno;
        }else{
          return docenteAc.nombre+" "+docenteAc.apellido_paterno+" "+docenteAc.apellido_materno;
        }
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
  applyFilterUsuarios(filterValue: string) {
    this.dataSourceUsuarios.filter = filterValue.trim().toLowerCase();
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
    let idMateria = element._id;
    let idDocente = this.dataSourceMaterias3.filteredData.filter(a=>a._id == idMateria).map(a=>a.id_docente);
    let docente = this.dataSourceDocentes.filteredData.filter(a=>a._id == idDocente as unknown as string);
    let dialogRef = this.dialogMaterias.open(EditMateriaComponent, {width:'750px',data:{materia: element,docente:docente}});
    dialogRef.afterClosed().subscribe(() => {
      this.getDocentes();
      this.getMaterias();
      this.getMaterias2();
    });
  }

  editDocente(element: Docente) {
    let dialogRef = this.dialogMaterias.open(EditDocenteComponent, {width:'750px',data:{docente:element}});
    dialogRef.afterClosed().subscribe(()=>{
      this.getDocentes();
      this.getMaterias();
      this.getMaterias2();
    })
  }

  deleteMateria(element: Materia) {
    let dialogRef = this.dialogMaterias.open(DeleteComponent, {width:'300px',data:{element:element,def:"materia"}});
    dialogRef.afterClosed().subscribe(()=> {
      this.getDocentes();
      this.getMaterias();
      this.getMaterias2();
    })
  }

  deleteDocente(element: Docente) {
    let dialogRef = this.dialogMaterias.open(DeleteComponent, {width:'300px',data:{element:element,def:"docente"}});
    dialogRef.afterClosed().subscribe(()=> {
          this.getDocentes();
          this.getMaterias();
          this.getMaterias2();
    })
  }

  openAddCuentas() {
    let dialogRef = this.dialogMaterias.open(AddUsuarioComponent, {width:'750px'});
    dialogRef.afterClosed().subscribe(() => {
      this.getUsuarios();
    });
  }

  editUsuario(element) {
    let dialogRef = this.dialogMaterias.open(EditUsuarioComponent, {width:'750px',data:{usuario:element}});
    dialogRef.afterClosed().subscribe(()=>{
      this.getUsuarios();
    });
  }

  deleteUsuario(element: Usuario) {
    let dialogRef = this.dialogMaterias.open(DeleteComponent, {width:'300px',data:{element:element,def:"usuario"}});
    dialogRef.afterClosed().subscribe(()=> {
      this.getUsuarios();
    })
  }

  refresh() {
    this.getUsuarios();
    this.getDocentes();
    this.getMaterias();
    this.getMaterias2();
  }

  displayRol(rol) {
    if(rol == "jefe_carrera"){
      return "Jefe de Carrera"
    }else if(rol == "asistente"){
      return "Asistente Administrativa"
    }else if(rol == "registros"){
      return "Encargada de Registros"
    }else if(rol == "contabilidad"){
      return "Encargada de Contabilidad"
    }
  }

  async updatePreferences() {
    await this.materiaService.getUsuarioByEmail(this.tokenService.getUsuarioDocFollow().email).subscribe(
      res=>{
        this.tokenService.setUserDocFollow(res);
        this.setPreferences();
      },error=>{
        console.log(error)
      }
    );
  }

  changePreferenceSeg(def,hide) {
    let negation = !(hide);
    let body = this.tokenService.getUsuarioDocFollow().preferencias_seguimiento;
    body[def.toString()] = negation;
    //console.log(body);
    this.materiaService.putUsuarios({"preferencias_seguimiento": body}, this.tokenService.userDocFollow._id).subscribe(
      res => {
        console.log(res);
        this.updatePreferences();
      },error => {
        console.log(error);
      }
    );
  }
  changePreferenceMat(def,hide) {
    let negation = !(hide);
    let body = this.tokenService.getUsuarioDocFollow().preferencias_materias;
    body[def.toString()] = negation;
    //console.log(body);
    this.materiaService.putUsuarios({"preferencias_materias": body}, this.tokenService.userDocFollow._id).subscribe(
      res => {
        console.log(res);
        this.updatePreferences();
      },error => {
        console.log(error);
      }
    );
  }

  changePreferenceDoc(def,hide) {
    let negation = !(hide);
    let body = this.tokenService.getUsuarioDocFollow().preferencias_docente;
    body[def.toString()] = negation;
    //console.log(body);
    this.materiaService.putUsuarios({"preferencias_docente": body}, this.tokenService.userDocFollow._id).subscribe(
      res => {
        console.log(res);
        this.updatePreferences();
      },error => {
        console.log(error);
      }
    );
  }
}

// ngAfterViewInit(){
//   //General
//   let o5:Observable<boolean> = this.silabo_subido.valueChanges;
//   let o6:Observable<boolean> = this.aula_revisada.valueChanges;
//   let o7:Observable<boolean> = this.examen_revisado.valueChanges;
//   let o8:Observable<boolean> = this.contrato_impreso.valueChanges;
//   let o9:Observable<boolean> = this.contrato_firmado.valueChanges;
//   let o10:Observable<boolean> = this.planilla_lista.valueChanges;
//   let o11:Observable<boolean> = this.planilla_firmada.valueChanges;
//   let o12:Observable<boolean> = this.cheque_solicitado.valueChanges;
//   let o13:Observable<boolean> = this.cheque_recibido.valueChanges;
//   let o14:Observable<boolean> = this.cheque_entregado.valueChanges;
//   //Materia
//   let o15:Observable<boolean> = this.horas_planta2.valueChanges;
//   let o16:Observable<boolean> = this.horas_totales2.valueChanges;
//   let o17:Observable<boolean> = this.silabo_subido2.valueChanges;
//   let o18:Observable<boolean> = this.aula_revisada2.valueChanges;
//   let o19:Observable<boolean> = this.examen_revisado2.valueChanges;
//   let o20:Observable<boolean> = this.contrato_impreso2.valueChanges;
//   let o21:Observable<boolean> = this.contrato_firmado2.valueChanges;
//   let o22:Observable<boolean> = this.planilla_lista2.valueChanges;
//   let o23:Observable<boolean> = this.planilla_firmada2.valueChanges;
//   let o24:Observable<boolean> = this.cheque_solicitado2.valueChanges;
//   let o25:Observable<boolean> = this.cheque_recibido2.valueChanges;
//   let o26:Observable<boolean> = this.cheque_entregado2.valueChanges;
//   //Docente
//   let o27: Observable<boolean> = this.materias_asignadas3.valueChanges;
//   let o28: Observable<boolean> = this.horas_planta3.valueChanges;
//   let o29: Observable<boolean> = this.horas_cubiertas3.valueChanges;
//   let o30: Observable<boolean> = this.horas_faltantes3.valueChanges;
//   let o31: Observable<boolean> = this.evaluacion_pares3.valueChanges;
//   merge(o5,o6,o7,o8,o9,o10,o11,o12,o13,o14,o15,o16,o17,o18,o19,o20,o21,o22,o23,o24,o25,o26,o27,o28,o29,o30,o31).subscribe( ()=>{
//     //General
//     this.columnDefinitions[4].hide = this.silabo_subido.value;
//     this.columnDefinitions[5].hide = this.aula_revisada.value;
//     this.columnDefinitions[6].hide = this.examen_revisado.value;
//     this.columnDefinitions[7].hide = this.contrato_impreso.value;
//     this.columnDefinitions[8].hide = this.contrato_firmado.value;
//     this.columnDefinitions[9].hide = this.planilla_lista.value;
//     this.columnDefinitions[10].hide = this.planilla_firmada.value;
//     this.columnDefinitions[11].hide = this.cheque_solicitado.value;
//     this.columnDefinitions[12].hide = this.cheque_recibido.value;
//     this.columnDefinitions[13].hide = this.cheque_entregado.value;
//     //Materia
//     this.displayedColumnsMaterias[4].hide = this.horas_planta2.value;
//     this.displayedColumnsMaterias[5].hide = this.horas_totales2.value;
//     this.displayedColumnsMaterias[6].hide = this.silabo_subido2.value;
//     this.displayedColumnsMaterias[7].hide = this.aula_revisada2.value;
//     this.displayedColumnsMaterias[8].hide = this.examen_revisado2.value;
//     this.displayedColumnsMaterias[9].hide = this.contrato_impreso2.value;
//     this.displayedColumnsMaterias[10].hide = this.contrato_firmado2.value;
//     this.displayedColumnsMaterias[11].hide = this.planilla_lista2.value;
//     this.displayedColumnsMaterias[12].hide = this.planilla_firmada2.value;
//     this.displayedColumnsMaterias[13].hide = this.cheque_solicitado2.value;
//     this.displayedColumnsMaterias[14].hide = this.cheque_recibido2.value;
//     this.displayedColumnsMaterias[15].hide = this.cheque_entregado2.value;
//     //Docente
//     this.displayedColumnsDocentes[1].hide = this.materias_asignadas3.value;
//     this.displayedColumnsDocentes[2].hide = this.horas_planta3.value;
//     this.displayedColumnsDocentes[3].hide = this.horas_cubiertas3.value;
//     this.displayedColumnsDocentes[4].hide = this.horas_faltantes3.value;
//     this.displayedColumnsDocentes[5].hide = this.evaluacion_pares3.value;
//   })
// }


// nombre = this.form.get('nombre');
// id_docente = this.form.get('id_docente');
// inicio = this.form.get('inicio');
// fin = this.form.get('fin');
// silabo_subido = this.form.get('silabo_subido');
// aula_revisada = this.form.get('aula_revisada');
// examen_revisado = this.form.get('examen_revisado');
// contrato_impreso = this.form.get('contrato_impreso');
// contrato_firmado = this.form.get('contrato_firmado');
// planilla_lista = this.form.get('planilla_lista');
// planilla_firmada = this.form.get('planilla_firmada');
// cheque_solicitado = this.form.get('cheque_solicitado');
// cheque_recibido = this.form.get('cheque_recibido');
// cheque_entregado = this.form.get('cheque_entregado');
// opciones = this.form.value.opciones;
//
// nombre2 = this.formMaterias.get('nombre');
// id_docente2 = this.formMaterias.get('id_docente');
// inicio2 = this.formMaterias.get('inicio');
// fin2 = this.formMaterias.get('fin');
// horas_planta2 = this.formMaterias.get('horas_planta');
// horas_totales2 = this.formMaterias.get('horas_totales');
// silabo_subido2 = this.formMaterias.get('silabo_subido');
// aula_revisada2 = this.formMaterias.get('aula_revisada');
// examen_revisado2 = this.formMaterias.get('examen_revisado');
// contrato_impreso2 = this.formMaterias.get('contrato_impreso');
// contrato_firmado2 = this.formMaterias.get('contrato_firmado');
// planilla_lista2 = this.formMaterias.get('planilla_lista');
// planilla_firmada2 = this.formMaterias.get('planilla_firmada');
// cheque_solicitado2 = this.formMaterias.get('cheque_solicitado');
// cheque_recibido2 = this.formMaterias.get('cheque_recibido');
// cheque_entregado2 = this.formMaterias.get('cheque_entregado');
// opciones2 = this.formMaterias.get('opciones');
//
// nombre3 = this.formDocentes.get('nombre');
// segundo_nombre3 = this.formDocentes.get('segundo_nombre');
// apellido_paterno3 = this.formDocentes.get('apellido_paterno');
// apellido_materno3 = this.formDocentes.get('apellido_materno');
// materias_asignadas3 = this.formDocentes.get('materias_asignadas');
// horas_planta3 = this.formDocentes.get('horas_planta');
// horas_cubiertas3 = this.formDocentes.get('horas_cubiertas');
// horas_faltantes3 = this.formDocentes.get('horas_faltantes');
// evaluacion_pares3 = this.formDocentes.get('evaluacion_pares');
// opciones3 = this.formMaterias.get('opciones');


// form:FormGroup = new FormGroup({
//   nombre: new FormControl(true),
//   id_docente: new FormControl(true),
//   inicio: new FormControl(true),
//   fin: new FormControl(true),
//   silabo_subido: new FormControl(true),
//   aula_revisada: new FormControl(true),
//   examen_revisado: new FormControl(true),
//   contrato_impreso: new FormControl(true),
//   contrato_firmado: new FormControl(true),
//   planilla_lista: new FormControl(true),
//   planilla_firmada: new FormControl(true),
//   cheque_solicitado: new FormControl(true),
//   cheque_recibido: new FormControl(true),
//   cheque_entregado: new FormControl(true),
//   opciones: new FormControl(true)
// });
//
// formMaterias: FormGroup = new FormGroup({
//   nombre: new FormControl(true),
//   id_docente: new FormControl(true),
//   inicio: new FormControl(true),
//   fin: new FormControl(true),
//   horas_planta: new FormControl(true),//admin
//   horas_totales: new FormControl(true),//admin
//   silabo_subido: new FormControl(true),//admin
//   aula_revisada: new FormControl(true),//admin
//   examen_revisado: new FormControl(true),//admin
//   contrato_impreso: new FormControl(true),//asistente
//   contrato_firmado: new FormControl(true),//asistente
//   planilla_lista: new FormControl(true),//registros
//   planilla_firmada: new FormControl(true),//registros contabilidad
//   cheque_solicitado: new FormControl(true),//contabilidad
//   cheque_recibido: new FormControl(true),//contabilidad
//   cheque_entregado: new FormControl(true),//contabilidad
//   opciones: new FormControl(true)//admin / jefe / asistente
// });

// formDocentes: FormGroup = new FormGroup({
//   nombre: new FormControl(true),
//   segundo_nombre: new FormControl(true),
//   apellido_paterno: new FormControl(true),
//   apellido_materno: new FormControl(true),
//   materias_asignadas: new FormControl(true),//admin
//   horas_planta: new FormControl(true),//admin
//   horas_cubiertas: new FormControl(true),//admin
//   horas_faltantes: new FormControl(true),//admin
//   evaluacion_pares: new FormControl(true),//admin
//   opciones: new FormControl(true)//admin / jefe / asistente
// });
