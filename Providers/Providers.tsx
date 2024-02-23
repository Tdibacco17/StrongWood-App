"use client"
import { ThemeProvider } from "@/Providers/ThemeProvider";
import { ResizableProvider } from "@/context/ResizableProvider";

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider>
            <ResizableProvider>
                {children}
            </ResizableProvider>
        </ThemeProvider>
    );
}
