import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Materias} from '../models/materias'
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MateriasService {


  materias  : Materias[];
  readonly URL_API = "http://186.121.251.3:7875/api/materias";
  readonly URL_API2 = "http://192.168.50.100:7875/api/materias";
  readonly URL_API2_MATERIA ="http://192.168.50.100:7875/api/materia";
  constructor(private http: HttpClient) {

  }

  getMaterias():Observable<any>{
    console.log('prueba');
    return this.http.get(this.URL_API2);
  }

  createMateria(materia: Materias){
    let params = JSON.stringify(materia);
    let headers = new HttpHeaders().set('Content-Type', "application/json");
    return this.http.put(this.URL_API2_MATERIA,params,{headers: headers});
  }

  postMateria(Materia: Materias){
    return this.http.put(this.URL_API, Materia);
  }

  putMateria(Materia: Materias){
    return this.http.post(this.URL_API+`/${Materia._id}`, Materia);
  }

  deleteMateria(Materia: Materias){
    return this.http.delete(this.URL_API+`/${Materia._id}`);
  }

}
