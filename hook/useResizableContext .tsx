import { ResizableContext, ResizableContextInterface } from "@/context/ResizableProvider";
import { useContext } from "react";

export const useResizableContext = () => {
    const context = useContext(ResizableContext);
    if (!context) {
        throw new Error("useResizableContext must be used within a ResizableProvider");
    }
    return context as ResizableContextInterface;
}