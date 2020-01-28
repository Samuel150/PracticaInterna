import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http'
import {Materia} from '../models/materia'
import {Docente} from '../models/docente'
import {Observable} from "rxjs";
import {DocentePost} from "../models/docentePost";
import {MateriaPost} from "../models/materiaPost";
import {TokenService} from "./token.service";
import {Usuario} from "../models/usuario";

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  readonly URL_API = "http://skynet.lp.upb.edu:7875";
  //readonly URL_API = "http://localhost:3700";

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  postMateriasExcel(excel){
    let headers = new HttpHeaders().set('Content-Type', "application/json")
      .set('Token', this.tokenService.getToken());
    return this.http.post(this.URL_API+"/materias/create/excel",{excel},{headers:headers})
  }

  getUsuarios():Observable<any>{
    return this.http.get(this.URL_API+"/usuarios/getAll",{
      headers:new HttpHeaders()
        .set('Content-Type', "application/json")
        .set('Token', this.tokenService.getToken())
    });

  }
  deleteUsuarios(idUsuario){
    return this.http.delete<HttpResponse<Usuario>>(this.URL_API+"/usuarios/delete/"+idUsuario,{
      headers:new HttpHeaders()
        .set('Content-Type', "application/json")
        .set('Token', this.tokenService.getToken()),
      observe:"response"
    });
  }
  postUsuarios(usuario){
    let params = JSON.stringify(usuario);
    return this.http.post<HttpResponse<Usuario>>(this.URL_API+"/usuarios/create",params,{
      headers:new HttpHeaders()
        .set('Content-Type', "application/json")
        .set('Token', this.tokenService.getToken()),
      observe:"response"
    });
  }
  putUsuarios(usuario,idUsuario){
    let params = JSON.stringify(usuario);
    return this.http.put<HttpResponse<Usuario>>(this.URL_API+"/usuarios/update/"+idUsuario,params,{
      headers:new HttpHeaders()
        .set('Content-Type', "application/json")
        .set('Token', this.tokenService.getToken()),
        observe:"response"
    });
  }

  getUsuarioByEmail(email: string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', "application/json");
    return this.http.get(this.URL_API+"/usuarios/getOneByEmail/"+email,{headers:headers});
  }

  getDocentes():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', "application/json")
      .set('Token', this.tokenService.getToken());
    return this.http.get(this.URL_API + "/docentes/getAll",{headers:headers});
  }

  postDocente(docente){
    let params = JSON.stringify(docente);
    return this.http.post(this.URL_API + "/docentes/create",params,{
      headers:new HttpHeaders()
        .set('Content-Type', "application/json")
        .set('Token', this.tokenService.getToken()),
      observe:"response"
    });
  }

  putDocente(docenteID, body){
    return this.http.put(this.URL_API + "/docentes/update"+`/${docenteID}`,body,{
      headers:new HttpHeaders()
        .set('Content-Type', "application/json")
        .set('Token', this.tokenService.getToken()),
      observe:"response"
    });
  }

  deleteDocente(docente: Docente){
    return this.http.delete(this.URL_API + "/docentes/delete"+`/${docente._id}`,{
      headers:new HttpHeaders()
        .set('Content-Type', "application/json")
        .set('Token', this.tokenService.getToken()),
      observe:"response"
    });
  }

  getMaterias(anio?,semestre?):Observable<any>{
    let newParam:string = '';
    if(anio && semestre){
      newParam += anio.toString()+"/"+semestre.toString();
    }
    let headers = new HttpHeaders().set('Content-Type', "application/json")
      .set('Token', this.tokenService.getToken());
    if(this.tokenService.getUsuarioDocFollow() && this.tokenService.getUsuarioDocFollow().rol=="jefe_carrera"){
      return this.http.get(this.URL_API+"/materias/getByUserId/"+this.tokenService.getUsuarioDocFollow()._id,{headers:headers});
    }else{
      return this.http.get(this.URL_API+"/materias/getAll/",{headers:headers});
    }
  }

  postMateria(materia){
    let params = JSON.stringify(materia);
    return this.http.post(this.URL_API+ "/materias/create",params,{
      headers:new HttpHeaders()
        .set('Content-Type', "application/json")
        .set('Token', this.tokenService.getToken()),
      observe:"response"
    });
  }

  putMateria(materiaId,body){
    return this.http.put(this.URL_API+"/materias/update"+`/${materiaId}`, body,{
      headers:new HttpHeaders()
        .set('Content-Type', "application/json")
        .set('Token', this.tokenService.getToken()),
      observe:"response"
    });
  }

  deleteMateria(materia: Materia){
    return this.http.delete(this.URL_API+"/materias/delete"+`/${materia._id}`,{
      headers:new HttpHeaders()
        .set('Content-Type', "application/json")
        .set('Token', this.tokenService.getToken()),
      observe:"response"
    });
  }

  getDocente(docente){
    let headers = new HttpHeaders().set('Content-Type', "application/json");
    return this.http.get<Docente>(this.URL_API + "/docentes/getOne"+`/${docente}`,{headers:headers});
  }

  getPendientes():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', "application/json")
      .set('Token', this.tokenService.getToken());
    if(this.tokenService.getUsuarioDocFollow()){
      return this.http.get(this.URL_API + "/pendientes/"+this.tokenService.getUsuarioDocFollow()._id,{headers:headers});
    }else{
      return this.http.get(this.URL_API + "/pendientes/",{headers:headers});
    }
  }
  //
  // putUsuario(body,idUsuario){
  //   return this.http.put(this.URL_API+"/usuarios/update"+`/${idUsuario}`, body,{
  //     headers:new HttpHeaders()
  //       .set('Content-Type', "application/json")
  //       .set('Token', this.tokenService.getToken()),
  //     observe:"response"
  //   });
  // }

}
