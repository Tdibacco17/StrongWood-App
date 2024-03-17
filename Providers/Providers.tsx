"use client"
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ResizableProvider } from "@/context/ResizableProvider";
import { SaveOptionsProvider } from "@/context/SavedOptionsContextProvider";

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // <ThemeProvider>
            <ResizableProvider>
                <SaveOptionsProvider>
                    {children}
                </SaveOptionsProvider>
            </ResizableProvider>
        // </ThemeProvider
    );
}
