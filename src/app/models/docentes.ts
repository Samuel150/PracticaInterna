export class Docentes {

  constructor(
    public _id: string,
    public nombre: string,
    public segundo_nombre: string,
    public apellido_paterno: string,
    public apellido_materno: string,
    public materias_asignadas: number,
    public horas_planta: number,
    public horas_cubiertas: number,
    public __v: number){

  }
}
