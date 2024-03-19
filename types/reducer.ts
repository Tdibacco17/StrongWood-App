import { ExcelDataInterface, MeasurementsInterface } from ".";
import { AlacenaInterface, BajoMesadaInterface } from "./cocinaTypes";

//acciones reducer
export type ActionType =
    | { type: 'ADD_OPTION'; payload: { optionType: OptionType; option: SaveOptionsInterface } }
    | { type: 'REMOVE_OPTION'; payload: { optionType: OptionType; index: number } }
    | { type: 'CLEAR_OPTIONS'; payload: { optionType: OptionType } }
    | { type: 'UPDATE_OPTIONS'; payload: { optionType: OptionType; materialsData: ExcelDataInterface[] } }
    | { type: 'SET_OPTIONS'; payload: SaveOptionsDataInterface };

//opciones de donde guardar la info en el reducer
export type OptionType = 'kitchen' | 'closet'; //| 'bed';

//obj de seccion cotizada
export interface SaveOptionsDataInterface {
    [key: string]: {
        title: string,
        data: SaveOptionsInterface[],
        totalMaterials: { [key: string]: { amount: number, placas: number, price: number } }
    };
}

//info de obj de la seccion cotizada
export interface SaveOptionsInterface {
    moduleType: string,
    name: string,
    totalPrice: number,
    quantity: number,
    moduleData: SelectedOptionType,
    measurements: MeasurementsInterface,
    materials: { [key: string]: { amount: number } }
}

//METODOS DEL CONTEXTO
export interface SavedOptionsContextInterface {
    saveOptions: SaveOptionsDataInterface;
    handleSaveOptionsChange: (optionType: OptionType, newOption: SaveOptionsInterface) => void;
    handleSaveMaterialsChange: (optionType: OptionType, materialsData: ExcelDataInterface[]) => void;
    handleRemoveOption: (optionType: OptionType, index: number) => void;
    handleClearOptions: (optionType: OptionType) => void;
    getTotalPriceOfOptions: (optionType: OptionType) => number;
    loading: boolean
}

export type SelectedOptionType = BajoMesadaInterface | AlacenaInterface;
export type CategoryType = keyof (BajoMesadaInterface & AlacenaInterface);