'use client'
import { ExcelDataInterface } from "@/types";
import { ActionType, OptionType, SaveOptionsDataInterface } from "@/types/reducer";
import { Reducer } from "react";

export const initialOptionsState: SaveOptionsDataInterface = {
    kitchen: {
        title: "Cocina",
        data: [],
        totalMaterials: {}
    },
    closet: {
        title: "Placar",
        data: [],
        totalMaterials: {}
    },
};

const updateLocalStorage = (newState: SaveOptionsDataInterface) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('saveOptions', JSON.stringify(newState));
    }
};

export const reducer: Reducer<SaveOptionsDataInterface, ActionType> = (state, action) => {
    switch (action.type) {
        case 'ADD_OPTION': {
            const { optionType, option } = action.payload;
            const newState = {
                ...state,
                [optionType]: {
                    ...state[optionType],
                    data: [...state[optionType].data, option]
                }
            }
            updateLocalStorage(newState);
            return newState;
        }
        case 'UPDATE_OPTIONS': {
            const { optionType, materialsData } = action.payload;
            const totalMaterials = updateTotalMaterials(optionType, materialsData, state);
            const newState = {
                ...state,
                [optionType]: {
                    ...state[optionType],
                    totalMaterials: { ...totalMaterials }
                }
            };
            updateLocalStorage(newState);
            return newState;
        }
        case 'REMOVE_OPTION': {
            const { optionType, index } = action.payload;
            const updatedOptions = [...state[optionType].data];
            updatedOptions.splice(index, 1);
            const newState = {
                ...state,
                [optionType]: {
                    ...state[optionType],
                    data: updatedOptions
                }
            };
            updateLocalStorage(newState);
            return newState;
        }
        case 'CLEAR_OPTIONS': {
            const { optionType } = action.payload;
            const newState = {
                ...state,
                [optionType]: {
                    ...state[optionType],
                    data: [],
                    totalMaterials: {}
                }
            };
            updateLocalStorage(newState);
            return newState;
        }
        case 'SET_OPTIONS': {
            const newState = action.payload || initialOptionsState;
            updateLocalStorage(newState);
            return newState;
        }
        default:
            return state;
    }
};

const updateTotalMaterials = (optionType: OptionType, materialsData: ExcelDataInterface[], saveOptions: SaveOptionsDataInterface) => {
    const options = saveOptions[optionType].data;
    const consolidatedSquareMeter: { [key: string]: number } = {};

    options.forEach(option => {
        // Recorrer los materiales asociados a la opción
        Object.entries(option.materials).forEach(([materialName, material]) => {
            if (consolidatedSquareMeter[materialName]) {
                consolidatedSquareMeter[materialName] += material.amount;
            } else {
                consolidatedSquareMeter[materialName] = material.amount;
            }
        })
    });
    // Inicializar el objeto actualizado de totalSquareMeters
    const updatedTotalSquareMeters: { [key: string]: { amount: number, placas: number, price: number } } = {};

    Object.keys(consolidatedSquareMeter).forEach(material => {
        const materialData = materialsData.find(mat => mat.name === material);
        if (materialData) {
            const medida = materialData.meters ?? 0;
            const precio = materialData.price ?? 0;
            const amountNeeded = consolidatedSquareMeter[material];
            let placasNeeded = 1;
            if (amountNeeded > medida) {
                placasNeeded = Math.ceil(amountNeeded / medida);
            }
            const totalPrice = placasNeeded * precio;

            updatedTotalSquareMeters[material] = {
                amount: parseFloat(amountNeeded.toFixed(3)),
                placas: placasNeeded,
                price: parseFloat(totalPrice.toFixed(2))
            };
        }
    });
    // console.log("[CREACION DE TOTAL SQUARE]: ", updatedTotalSquareMeters)

    return updatedTotalSquareMeters
};