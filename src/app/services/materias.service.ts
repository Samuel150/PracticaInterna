import { Injectable } from '@angular/core';
import {HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http'
import {Materias} from '../models/materias'
import {Docentes} from '../models/docentes'
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MateriasService {


  materias  : Materias[];
  docentes : Docentes[];
  readonly URL_API_DOCENTES = "http://skynet.lp.upb.edu:7875/docentes";
  readonly URL_API_DOCENTE = "http://skynet.lp.upb.edu:7875/docente";
  readonly URL_API_MATERIAS = "http://skynet.lp.upb.edu:7875/materias";
  readonly URL_API_MATERIA ="http://skynet.lp.upb.edu:7875/materia";
  constructor(private http: HttpClient) {

  }

  getDocentes():Observable<any>{
    return this.http.get(this.URL_API_DOCENTES);
  }
  getDocente(docente: string){
    let headers = new HttpHeaders().set('Content-Type', "application/json");
    return this.http.get(this.URL_API_DOCENTE+`/${docente}`,{headers:headers});
  }
  postDocente(docente: Docentes){
    let params = JSON.stringify(docente);
    let headers = new HttpHeaders().set('Content-Type', "application/json");
    return this.http.post(this.URL_API_DOCENTE,params,{headers:headers})
  }

  getMaterias():Observable<any>{
    return this.http.get(this.URL_API_MATERIAS);
  }

  postMateria(materia: Materias){
    let params = JSON.stringify(materia);
    let headers = new HttpHeaders().set('Content-Type', "application/json");
    return this.http.post(this.URL_API_MATERIA,params,{headers: headers});
  }


  putMateria(Materia: Materias){
    return this.http.put(this.URL_API_MATERIAS+`/${Materia._id}`, Materia);
  }

  deleteMateria(Materia: Materias){
    return this.http.delete(this.URL_API_MATERIAS+`/${Materia._id}`);
  }

}
