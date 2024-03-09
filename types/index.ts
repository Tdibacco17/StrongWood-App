import { BajoMesadaTypes } from "./cocinaTypes";

export interface ItemNavigation {
    title: string,
    url: string
}

//DATA DEL EXCEL
export interface ExcelDataInterface {
    name: string,
    price: number,
    meters?: number | null;
}

export interface SelectedOptionInterface{
    name: string,
    price: number,
}

//TABLA DE DATOS SELECCIONADOS
export interface TableSelectFieldsInterface {
    title: string;
    data: SelectedOptionInterface;
}
//medidas del modulo seleccionado
export interface MeasurementsInterface {
    ancho: number, alto: number, profundidad: number
}

//metros cuadrados de los materiales seleccionados
export interface SquareMetersInterface {
    sectionId: BajoMesadaTypes,
    title: string,
    amount: number,
}
