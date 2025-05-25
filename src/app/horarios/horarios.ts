export interface HorarioDTO {
    id: number,
    horaInicio: string,
    horaFin: string,
    estado: boolean
}

export interface HorarioCreacionDTO {
    horaInicio: string,
    horaFin: string,
}

export interface HorarioEdicionDTO {
    horaInicio: string,
    horaFin: string,
    estado: boolean
}