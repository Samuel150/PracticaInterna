
export class PreferenciasPendientes {
  constructor(
  public _id:string,
  public silabo_subido:boolean,
  public aula_revisada:boolean,
  public examen_revisado:boolean,
  public contrato_impreso:boolean,
  public contrato_firmado:boolean,
  public planilla_lista:boolean,
  public planilla_firmada:boolean,
  public cheque_solicitado:boolean,
  public cheque_recibido:boolean,
  public cheque_entregado:boolean,
  public horas_totales:boolean,
  public horas_planta:boolean
  ){
  }
}
export class PreferenciasDocente{
  constructor(
    public _id: string,
    public materias_asignadas: boolean,
    public horas_planta: boolean,
    public horas_cubiertas: boolean,
    public evaluacion_pares: boolean
  ) {
  }
}

export class Usuario {
  constructor(
    public _id: string,
    public nombre: string,
    public segundo_nombre: string,
    public apellido_paterno: string,
    public apellido_materno: string,
    public email: string,
    public ci: number,
    public rol: number,
    public super_usuario: boolean,
    public preferencias_pendientes: PreferenciasPendientes,
    public preferencias_seguimiento: PreferenciasPendientes,
    public preferencias_materias: PreferenciasPendientes,
    public preferencias_docente:PreferenciasDocente
  ){

  }
}
