import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Materia} from '../models/materia'
import {Docente} from '../models/docente'
import {Observable} from "rxjs";
import {DocentePost} from "../models/docentePost";
import {MateriaPost} from "../models/materiaPost";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  token: string;

  setToken(token: string){
    this.token = token;
  }

  // readonly URL_API_DOCENTES = "http://skynet.lp.upb.edu:7875/docentes";
  // readonly URL_API_DOCENTE = "http://skynet.lp.upb.edu:7875/docente";
  // readonly URL_API_DOCENTE_POST = "http://skynet.lp.upb.edu:7875/docentes";
  // readonly URL_API_MATERIAS = "http://skynet.lp.upb.edu:7875/materias";
  // readonly URL_API_MATERIA ="http://skynet.lp.upb.edu:7875/materia";
  // readonly URL_API_MATERIA_POST = "http://skynet.lp.upb.edu:7875/materias";
  readonly URL_API = "http://skynet.lp.upb.edu:7875";
  constructor(private http: HttpClient, private tokenService: TokenService) {

  }

  getDocentes():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', "application/json")
      .set('Token', this.token);
    return this.http.get(this.URL_API + "/docentes/getAll",{headers:headers});
  }

  postDocente(docente){
    let params = JSON.stringify(docente);
    let headers = new HttpHeaders().set('Content-Type', "application/json")
      .set('Token', this.token);
    return this.http.post(this.URL_API + "/docentes/create",params,{headers:headers})
  }

  putDocente(docenteID, body){
    let headers = new HttpHeaders().set('Content-Type', "application/json")
      .set('Token', this.token);
    return this.http.put(this.URL_API + "/docentes/update"+`/${docenteID}`,body,{headers: headers});
  }

  deleteDocente(docente: Docente){
    let headers = new HttpHeaders().set('Content-Type', "application/json")
      .set('Token', this.token);
    return this.http.delete(this.URL_API + "/docentes/delete"+`/${docente._id}`,{headers:headers});
  }

  getMaterias():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', "application/json")
      .set('Token', this.token);
    return this.http.get(this.URL_API+"/materias/getAll",{headers:headers});
  }

  postMateria(materia){
    let params = JSON.stringify(materia);
    let headers = new HttpHeaders().set('Content-Type', "application/json")
      .set('Token', this.token);
    return this.http.post(this.URL_API+ "/materias/create",params,{headers: headers});
  }

  putMateria(materiaId,body){
    let headers = new HttpHeaders().set('Content-Type', "application/json")
      .set('Token', this.token);
    return this.http.put(this.URL_API+"/materias/update"+`/${materiaId}`, body,{headers: headers});
  }

  deleteMateria(materia: Materia){
    let headers = new HttpHeaders().set('Content-Type', "application/json")
      .set('Token', this.token);
    return this.http.delete(this.URL_API+"/materias/delete"+`/${materia._id}`,{headers:headers});
  }

  getDocente(docente){
    let headers = new HttpHeaders().set('Content-Type', "application/json")
    .set('Token', this.token);
    return this.http.get<Docente>(this.URL_API + "/docentes/getOne"+`/${docente}`,{headers:headers});
  }

}
