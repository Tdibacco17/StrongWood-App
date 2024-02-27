'use client'
import styles from "./TableTotalOptionsComponent.module.scss"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button";
import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { UseSavedOptions } from "@/hook/UseSavedOptions";
import { OptionType, SaveOptionsInterface } from "@/types/reducer";
import PopUpTableTotalOptionsComponent from "../PopUpTableTotalOptionsComponent/PopUpTableTotalOptionsComponent";

export function TableTotalOptionsComponent() {
    const { saveOptions, handleRemoveOption, handleClearOptions, getTotalPriceOfOptions } = UseSavedOptions();

    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

    const handleDetailsClick = (index: number) => {
        setSelectedItemIndex(index);
    };

    const handleCloseDialog = () => {
        setSelectedItemIndex(null);
    };

    return (
        <section className={styles["section-total-options"]}>
            {Object.entries(saveOptions).map(([optionType, data]) => {
                const typedOptionType = optionType as OptionType;

                if (data.data.length > 0) {
                    return (
                        <div key={optionType} className={styles["table"]}>
                            <p>COTIZACIÓN {data.title.toUpperCase()}</p>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>NOMBRE DE MÓDULOS</TableHead>
                                        <TableHead className="text-center">CANTIDAD</TableHead>
                                        <TableHead className="text-right">PRECIO</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.data.map((item: SaveOptionsInterface, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium space-x-2 w-[500px]">
                                                <Badge variant="outline">{item.moduleType}</Badge>
                                                <span>{item.name}</span>
                                            </TableCell>
                                            <TableCell className="font-medium text-center">{item.quantity}</TableCell>
                                            <TableCell className="text-right">${item.totalPrice}</TableCell>
                                            <TableCell className="flex justify-end">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button size="icon" variant="ghost">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                            </svg>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-[160px]">
                                                        <DropdownMenuGroup>
                                                            <DropdownMenuItem onClick={() => handleDetailsClick(index)}>
                                                                Ver detalles
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() => handleRemoveOption(typedOptionType, index)}>
                                                                Eliminar
                                                            </DropdownMenuItem>
                                                        </DropdownMenuGroup>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={2} className="text-lg">Total</TableCell>
                                        <TableCell className="text-right text-lg">${getTotalPriceOfOptions(typedOptionType)}</TableCell>
                                        <TableCell className="flex justify-end">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button size="icon" variant="ghost">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                        </svg>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-[160px]">
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem
                                                            onClick={() => handleClearOptions(typedOptionType)}>
                                                            Eliminar todo
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                            <PopUpTableTotalOptionsComponent selectedItemIndex={selectedItemIndex} optionType={typedOptionType} handleCloseDialog={handleCloseDialog} />
                        </div>
                    );
                } else {
                    return null;
                }
            })}
        </section >
    )
}