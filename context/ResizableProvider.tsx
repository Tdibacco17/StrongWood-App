'use client'
import { createContext, useState } from "react";

export interface ResizableContextInterface {
    isSidebarOpen: boolean,
    toggleSidebarHandle: () => void
}

export const ResizableContext = createContext<ResizableContextInterface | {}>({});

export const ResizableProvider = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

    const toggleSidebarHandle: () => void = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <ResizableContext.Provider
            value={{
                isSidebarOpen,
                toggleSidebarHandle
            }}>
            {children}
        </ResizableContext.Provider>
    );
}