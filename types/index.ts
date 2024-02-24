export interface ItemNavigation {
    title: string,
    url: string
}

export interface BajoMesadaExcelDataResponse {
    medidas: ExcelDataInterface[];
    materiales: ExcelDataInterface[];
    // fondo: ExcelDataInterface[];
    // pisoMetalico: ExcelDataInterface[];
    // patas: ExcelDataInterface[];
    // apertura: ExcelDataInterface[];
    // bisagra: ExcelDataInterface[];
    // corredera: ExcelDataInterface[];
    // cubiertero: ExcelDataInterface[];
    // carroEsquinero: ExcelDataInterface[];
    // carroEspeciero: ExcelDataInterface[];
    // carroVerdulero: ExcelDataInterface[];
    // canastoVerdulero: ExcelDataInterface[];
    // tacho: ExcelDataInterface[];
}
export type BajoMesadaSectionTitle = "medidas" | "materiales";

//DATA DEL EXCEL
export interface ExcelDataInterface {
    name: string,
    price: number,
    meters?: number | null;
}