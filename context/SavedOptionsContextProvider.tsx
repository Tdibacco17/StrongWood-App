'use client'
import { initialOptionsState, reducer } from "@/reducer/SaveOptionesRuder";
import { ExcelDataInterface } from "@/types";
import { OptionType, SaveOptionsInterface, SavedOptionsContextInterface, } from "@/types/reducer";
import { ReactNode, createContext, useEffect, useReducer, useState } from "react";

export const SaveOptionsContext = createContext<SavedOptionsContextInterface | {}>({});

export const SaveOptionsProvider = ({ children }: { children: ReactNode }) => {
    const [saveOptions, dispatch] = useReducer(reducer, initialOptionsState);
    const [loading, setLoading] = useState<boolean>(true);
    // console.log("[saveOptions]: ", saveOptions)

    const handleSaveOptionsChange = (optionType: OptionType, newOption: SaveOptionsInterface) => {
        dispatch({ type: 'ADD_OPTION', payload: { optionType, option: newOption } });
    };

    const handleSaveMaterialsChange = (optionType: OptionType, materialsData: ExcelDataInterface[]) => {
        dispatch({ type: 'UPDATE_OPTIONS', payload: { optionType, materialsData } });
    }

    const handleRemoveOption = (optionType: OptionType, index: number) => {
        dispatch({ type: 'REMOVE_OPTION', payload: { optionType, index } });
    };

    const handleClearOptions = (optionType: OptionType) => {
        dispatch({ type: 'CLEAR_OPTIONS', payload: { optionType } });
    };

    const getTotalPriceOfOptions = (optionType: OptionType) => {
        let totalPriceGeneral = 0;
        const options = saveOptions[optionType].data;

        // Sumar los precios de cada ítem en options al total general
        totalPriceGeneral += options.reduce((total: number, option: SaveOptionsInterface) => total + option.totalPrice, 0);

        // Sumar los precios de los objetos en totalMaterials al total general
        const totalMaterials = saveOptions[optionType].totalMaterials;
        Object.values(totalMaterials).forEach((item: any) => {
            totalPriceGeneral += item.price;
        });

        return parseFloat(totalPriceGeneral.toFixed(3));
    };


    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedData = localStorage.getItem('saveOptions');
            if (savedData) {
                try {
                    const parsedData = JSON.parse(savedData);
                    dispatch({ type: 'SET_OPTIONS', payload: parsedData });
                } catch (error) {
                    console.error('Error parsing stored savedData:', error);
                }
            } else {
                // No hay datos guardados, inicializar con el estado inicial
                dispatch({ type: 'SET_OPTIONS', payload: initialOptionsState });
            }
            setTimeout(() => {
                setLoading(false);
            }, 750)
        }
    }, []);

    return (
        <SaveOptionsContext.Provider
            value={{
                saveOptions,
                handleSaveOptionsChange,
                handleSaveMaterialsChange,
                handleRemoveOption,
                handleClearOptions,
                getTotalPriceOfOptions,
                loading
            }}>
            {children}
        </SaveOptionsContext.Provider>
    );
};