'use client'
import { ActionType, SaveOptionsDataInterface } from "@/types/reducer";
import { Reducer } from "react";

export const initialOptionsState: SaveOptionsDataInterface = {
    kitchen: {
        title: "Cocina",
        data: []
    },
    closet: {
        title: "Placar",
        data: []
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
                    data: []
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