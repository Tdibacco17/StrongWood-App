import { ExcelDataInterface, TableSelectFieldsInterface } from ".";

//BAJO MESADA datos del excel
export interface BajoMesadaExcelDataResponse {
    medidas: ExcelDataInterface[];
    materiales: ExcelDataInterface[];
    panelDeCierre: ExcelDataInterface[];
    fondos: ExcelDataInterface[];
    patas: ExcelDataInterface[];
    zocalo: ExcelDataInterface[];
    aperturas: ExcelDataInterface[];
    pisoMetalico: ExcelDataInterface[];
    puertas: ExcelDataInterface[];
    cajones: ExcelDataInterface[];
    bisagras: ExcelDataInterface[];
    correderas: ExcelDataInterface[];
    cubiertero: ExcelDataInterface[];
    carroEsquinero: ExcelDataInterface[];
    carroEspeciero: ExcelDataInterface[];
    carroVerdulero: ExcelDataInterface[];
    canastoVerdulero: ExcelDataInterface[];
    tacho: ExcelDataInterface[];
}
//titulos del excel de bajo mesada
export type BajoMesadaSectionTitle = "medidas" | "materiales" | "panel de cierre" | "fondos" | "patas"
    | "zocalo" | "aperturas" | "piso metalico" | "puertas" | "cajones" | "bisagras" | "correderas" | "cubiertero"
    | "carro esquinero" | "carro especiero" | "carro verdulero" | "canasto verdulero" | "tacho";
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
    puertas: TableSelectFieldsInterface,
    cajones: TableSelectFieldsInterface,
    bisagras: TableSelectFieldsInterface,
    correderas: TableSelectFieldsInterface,
    cubiertero: TableSelectFieldsInterface
    carroEsquinero: TableSelectFieldsInterface,
    carroEspeciero: TableSelectFieldsInterface,
    carroVerdulero: TableSelectFieldsInterface,
    canastoVerdulero: TableSelectFieldsInterface,
    tacho: TableSelectFieldsInterface,
    pisoCajon: TableSelectFieldsInterface,
}
export type BajoMesadaTypes = keyof BajoMesadaInterface;

//ALACENA datos del excel
export interface AlacenaExcelDataResponse {
    medidas: ExcelDataInterface[];
    materiales: ExcelDataInterface[];
    panelDeCierre: ExcelDataInterface[];
    fondos: ExcelDataInterface[];
    rebatibles: ExcelDataInterface[];
    batientes: ExcelDataInterface[];
    bisagras: ExcelDataInterface[];
    aperturas: ExcelDataInterface[];
    piston: ExcelDataInterface[];
    estantes: ExcelDataInterface[];
}
export type AlacenaSectionTitle = "medidas" | "materiales" | "panel de cierre" | "fondos" | "rebatibles"
    | "batientes" | "bisagras" | "aperturas" | "piston" | "estantes";
//ESTRUCTURA DE CONSULTAS ALACENA
export interface AlacenaInterface {
    medida: TableSelectFieldsInterface,
    materialExterior: TableSelectFieldsInterface,
    panelDeCierre: TableSelectFieldsInterface;
    fondo: TableSelectFieldsInterface,
    rebatibles: TableSelectFieldsInterface,
    batientes: TableSelectFieldsInterface,
    bisagras: TableSelectFieldsInterface,
    apertura: TableSelectFieldsInterface,
    piston: TableSelectFieldsInterface,
    estantes: TableSelectFieldsInterface,
}
export type AlacenaTypes = keyof AlacenaInterface;