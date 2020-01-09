export class Materias {

  constructor(
  public _id: string,
  public nombre: string,
  public id_docente: string,
  public inicio: string,
  public fin: string,
  public silabo_subido: boolean,
  public aula_revisada: boolean,
  public examen_revisado: boolean,
  public contrato_impreso: boolean,
  public contrato_firmado: boolean,
  public planilla_firmada: boolean,
  public cheque_solicitado: boolean,
  public cheque_recibido: boolean,
  public cheque_entregado: boolean,
  public horas_totales: number,
  public horas_planta: number,
  public __v: number){

  }
}
