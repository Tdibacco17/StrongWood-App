import { ExcelDataInterface, TableSelectFieldsInterface } from ".";
export type ModuleType = "Bajo mesada" | "Alacena" | "Isla" | "Torre abajo" | "Torre arriba"

//BAJO MESADA datos del excel
export interface BajoMesadaExcelDataResponse {
    materiales: ExcelDataInterface[];
    panelDeCierre: ExcelDataInterface[];
    cierreAtras: ExcelDataInterface[];
    fondos: ExcelDataInterface[];
    patas: ExcelDataInterface[];
    zocalo: ExcelDataInterface[];
    aperturas: ExcelDataInterface[];
    pisoMetalico: ExcelDataInterface[];
    puertas: ExcelDataInterface[];
    cajones: ExcelDataInterface[];
    cajonInterno: ExcelDataInterface[];
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
export type BajoMesadaSectionTitle = "materiales" | "panel de cierre" | "cierre atras" | "fondos" | "patas" | "cajon interno"
    | "zocalo" | "aperturas" | "piso metalico" | "puertas" | "cajones" | "bisagras" | "correderas" | "cubiertero"
    | "carro esquinero" | "carro especiero" | "carro verdulero" | "canasto verdulero" | "tacho";
//ESTRUCTURA DE CONSULTAS BAJO MESADA
export interface BajoMesadaInterface {
    materialExterior: TableSelectFieldsInterface,
    panelDeCierre: TableSelectFieldsInterface;
    cierreAtras: TableSelectFieldsInterface;
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
    cajonInterno: TableSelectFieldsInterface,
    pisoCajonInterno: TableSelectFieldsInterface,
}
export type BajoMesadaTypes = keyof BajoMesadaInterface;

//ALACENA datos del excel
export interface AlacenaExcelDataResponse {
    materiales: ExcelDataInterface[];
    panelDeCierre: ExcelDataInterface[];
    cierreTecho: ExcelDataInterface[];
    fondos: ExcelDataInterface[];
    rebatibles: ExcelDataInterface[];
    batientes: ExcelDataInterface[];
    bisagras: ExcelDataInterface[];
    aperturas: ExcelDataInterface[];
    piston: ExcelDataInterface[];
    estantes: ExcelDataInterface[];
}
export type AlacenaSectionTitle = "materiales" | "panel de cierre" | "fondos" | "rebatibles" | "cierre techo" | "batientes" | "bisagras" | "aperturas" | "piston" | "estantes";
//ESTRUCTURA DE CONSULTAS ALACENA
export interface AlacenaInterface {
    materialExterior: TableSelectFieldsInterface,
    panelDeCierre: TableSelectFieldsInterface;
    cierreTecho: TableSelectFieldsInterface;
    fondo: TableSelectFieldsInterface,
    rebatibles: TableSelectFieldsInterface,
    batientes: TableSelectFieldsInterface,
    bisagras: TableSelectFieldsInterface,
    apertura: TableSelectFieldsInterface,
    piston: TableSelectFieldsInterface,
    estantes: TableSelectFieldsInterface,
}
export type AlacenaTypes = keyof AlacenaInterface;