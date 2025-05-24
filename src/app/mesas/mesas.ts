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

export interface MesaCreacionDTO {
    numero: number,
    capacidad: number,
    ubicacionId: number
}

export interface MesaEdicionDTO {
    numero: number,
    capacidad: number,
    ubicacionId: number,
    estado: boolean
}