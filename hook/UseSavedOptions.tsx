import { SaveOptionsContext } from "@/context/SavedOptionsContextProvider";
import { SavedOptionsContextInterface } from "@/types/reducer";
import { useContext } from "react";

export const UseSavedOptions = () => {
    const savedOptionsContext = useContext(SaveOptionsContext);

    if (!savedOptionsContext) {
        throw new Error("UseSavedOptions debe ser utilizado dentro de un SaveOptionsProvider");
    }

    return savedOptionsContext as SavedOptionsContextInterface;
};