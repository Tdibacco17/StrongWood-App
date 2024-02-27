import { ExcelDataInterface, TableSelectFieldsInterface } from ".";

//BAJO MESADA datos del excel
export interface BajoMesadaExcelDataResponse {
    medidas: ExcelDataInterface[];
    materiales: ExcelDataInterface[];
    panelDeCierre: ExcelDataInterface[];
    fondo: ExcelDataInterface[];
    patas: ExcelDataInterface[];
    zocalo: ExcelDataInterface[];
    aperturas: ExcelDataInterface[];
    pisoMetalico: ExcelDataInterface[];
    bisagras: ExcelDataInterface[];
    correderas: ExcelDataInterface[];
    // pisoMetalico: ExcelDataInterface[];
    // apertura: ExcelDataInterface[];
    // cubiertero: ExcelDataInterface[];
    // carroEsquinero: ExcelDataInterface[];
    // carroEspeciero: ExcelDataInterface[];
    // carroVerdulero: ExcelDataInterface[];
    // canastoVerdulero: ExcelDataInterface[];
    // tacho: ExcelDataInterface[];
}
export type BajoMesadaSectionTitle = "medidas" | "materiales" | "panel de cierre" | "fondo" | "patas" | "zocalo" | "aperturas" | "piso metalico" | "bisagras" | "correderas";
//ESTRUCTURA DE CONSULTAS BAJO MESADA
export interface BajoMesadaInterface {
    medida: TableSelectFieldsInterface,
    materialExterior: TableSelectFieldsInterface,
    panelDeCierre: TableSelectFieldsInterface;
    fondo: TableSelectFieldsInterface,
    patas: TableSelectFieldsInterface,
    zocalo: TableSelectFieldsInterface,
    apertura: TableSelectFieldsInterface,
    pisoMetalico: TableSelectFieldsInterface,
    bisagras: TableSelectFieldsInterface,
    correderas: TableSelectFieldsInterface
    // pisoMetalico: TableSelectFieldsInterface,
    // patas: TableSelectFieldsInterface,
    // apertura: TableSelectFieldsInterface,
    // bisagra: TableSelectFieldsInterface,
    // corredera: TableSelectFieldsInterface,
    // cubiertero: TableSelectFieldsInterface,
    // carroEsquinero: TableSelectFieldsInterface,
    // carroEspeciero: TableSelectFieldsInterface,
    // carroVerdulero: TableSelectFieldsInterface,
    // canastoVerdulero: TableSelectFieldsInterface,
    // tacho: TableSelectFieldsInterface,
}
export type BajoMesadaTypes = keyof BajoMesadaInterface;
export type DrawerType = 'puertas' | 'cajones' | ''; //bajo mesada


//ALACENA datos del excel
export interface AlacenaExcelDataResponse {
    medidas: ExcelDataInterface[];
    materiales: ExcelDataInterface[];
    panelDeCierre: ExcelDataInterface[];
    fondo: ExcelDataInterface[];
}
export type AlacenaSectionTitle = "medidas" | "materiales" | "panel de cierre" | "fondo";
//ESTRUCTURA DE CONSULTAS ALACENA
export interface AlacenaInterface {
    medida: TableSelectFieldsInterface,
    materialExterior: TableSelectFieldsInterface,
    panelDeCierre: TableSelectFieldsInterface;
    fondo: TableSelectFieldsInterface,
}
export type AlacenaTypes = keyof AlacenaInterface;