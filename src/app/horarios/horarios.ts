export interface HorarioDTO{
    id: number,
    horaDeInicio: string,
    horaDeFin: string,
    estado: boolean
}

export interface HorarioCreacionDTO{
    horaDeInicio: Date,
    horaDeFin: Date,
    estado: boolean
}