export interface MesaListadoDTO {
    id: number,
    numero: number,
    capacidad: number,
    estado: boolean,
    ubicacion: string
}

export interface MesaDTO {
    id: number,
    numero: number,
    capacidad: number,
    estado: boolean,
    ubicacionId: number
}