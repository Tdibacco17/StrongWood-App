'use client'
import { initialOptionsState, reducer } from "@/reducer/SaveOptionesRuder";
import { OptionType, SaveOptionsInterface, SavedOptionsContextInterface, } from "@/types/reducer";
import { ReactNode, createContext, useEffect, useReducer } from "react";

export const SaveOptionsContext = createContext<SavedOptionsContextInterface | {}>({});

export const SaveOptionsProvider = ({ children }: { children: ReactNode }) => {
    const [saveOptions, dispatch] = useReducer(reducer, initialOptionsState);
    // console.log("[saveOptions]: ", saveOptions)

    const handleSaveOptionsChange = (optionType: OptionType, newOption: SaveOptionsInterface) => {
        dispatch({ type: 'ADD_OPTION', payload: { optionType, option: newOption } });
    };

    const handleRemoveOption = (optionType: OptionType, index: number) => {
        dispatch({ type: 'REMOVE_OPTION', payload: { optionType, index } });
    };

    const handleClearOptions = (optionType: OptionType) => {
        dispatch({ type: 'CLEAR_OPTIONS', payload: { optionType } });
    };

    const getTotalPriceOfOptions = (optionType: OptionType) => {
        const totalPrice = saveOptions[optionType].data
            .reduce((total: number, option: SaveOptionsInterface) => total + option.totalPrice, 0);

        return parseFloat(totalPrice.toFixed(2));
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
            }
        }
    }, []);

    return (
        <SaveOptionsContext.Provider
            value={{
                saveOptions,
                handleSaveOptionsChange,
                handleRemoveOption,
                handleClearOptions,
                getTotalPriceOfOptions
            }}>
            {children}
        </SaveOptionsContext.Provider>
    );
};