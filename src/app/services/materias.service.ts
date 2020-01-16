import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Materia} from '../models/materia'
import {Docente} from '../models/docente'
import {Observable} from "rxjs";
import {DocentePost} from "../models/docentePost";
import {MateriaPost} from "../models/materiaPost";

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  readonly URL_API_DOCENTES = "http://skynet.lp.upb.edu:7875/docentes";
  readonly URL_API_DOCENTE = "http://skynet.lp.upb.edu:7875/docente";
  readonly URL_API_DOCENTE_POST = "http://skynet.lp.upb.edu:7875/docentes";
  readonly URL_API_MATERIAS = "http://skynet.lp.upb.edu:7875/materias";
  readonly URL_API_MATERIA ="http://skynet.lp.upb.edu:7875/materia";
  readonly URL_API_MATERIA_POST = "http://skynet.lp.upb.edu:7875/materias";
  constructor(private http: HttpClient) {

  }

  getDocentes():Observable<any>{
    return this.http.get(this.URL_API_DOCENTES);
  }

  postDocente(docente: DocentePost){
    let params = JSON.stringify(docente);
    let headers = new HttpHeaders().set('Content-Type', "application/json");
    return this.http.post(this.URL_API_DOCENTE_POST,params,{headers:headers})
  }

  getMaterias():Observable<any>{
    return this.http.get(this.URL_API_MATERIAS);
  }

  postMateria(materia: MateriaPost){
    let params = JSON.stringify(materia);
    let headers = new HttpHeaders().set('Content-Type', "application/json");
    return this.http.post(this.URL_API_MATERIA_POST,params,{headers: headers});
  }

  putDocente(docenteID, body){
    let headers = new HttpHeaders().set('Content-Type', "application/json");
    return this.http.put(this.URL_API_DOCENTE+`/${docenteID}`,body,{headers: headers});
  }
  putMateria(materiaId,body){
    console.log(body);
    let headers = new HttpHeaders().set('Content-Type', "application/json");
    return this.http.put(this.URL_API_MATERIA+`/${materiaId}`, body,{headers: headers});
  }

  deleteMateria(Materia: Materia){
    return this.http.delete(this.URL_API_MATERIAS+`/${Materia._id}`);
  }

  getDocente(docente){
    let headers = new HttpHeaders().set('Content-Type', "application/json");
    return this.http.get<Docente>(this.URL_API_DOCENTE+`/${docente}`,{headers:headers});
  }

}
