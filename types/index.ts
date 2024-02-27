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

//TABLA DE DATOS SELECCIONADOS
export interface TableSelectFieldsInterface {
    title: string;
    data: ExcelDataInterface;
}

export interface MeasurementsInterface {
    ancho: number, alto: number, profundidad: number
}
