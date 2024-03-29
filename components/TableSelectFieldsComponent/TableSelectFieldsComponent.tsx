import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption
} from "@/components/ui/table"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { MeasurementsInterface, TableSelectFieldsInterface } from "@/types"
import styles from "./TableSelectFieldsComponent.module.scss"
import { SelectedOptionType } from "@/types/reducer"
import React from "react"

export default function TableSelectFieldsComponent({
    handleQuantityChange,
    handleSaveOptions,
    moduleName,
    quantity,
    selectedOption,
    totalPriceWithQuantity,
    measurements,
    isDisabled
}: {
    handleQuantityChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleSaveOptions: () => void,
    moduleName: string,
    quantity: number,
    selectedOption: SelectedOptionType,
    totalPriceWithQuantity: number,
    measurements: MeasurementsInterface,
    isDisabled: boolean
}) {
    return (
        <div className={styles["container-section-table"]}>
            <Table>
                <TableCaption className="pt-12 mt-0">
                    <Button variant="outline" size="lg" className="text-sm font-bold" onClick={handleSaveOptions}>GUARDAR MODULO COTIZADO</Button>
                </TableCaption>
                <TableHeader className={moduleName.length > 0 ? styles["line-top"] : ""}>
                    <TableRow className={moduleName.length > 0 ? styles["row-active"] : ""}>
                        <TableCell colSpan={moduleName.length > 0 ? 0 : 3} className="text-medium font-medium text-muted-foreground">NOMBRE DEL MODULO</TableCell>
                        {moduleName.length > 0 &&
                            <TableCell colSpan={2} className={`text-medium font-medium`}>{moduleName}</TableCell>}
                        <TableCell className="flex justify-end items-center gap-4">
                            <p className={`${!isDisabled ? "opacity-50" : ""} text-medium font-medium`} >Cantidad</p>
                            <Input
                                disabled={!isDisabled}
                                type="number"
                                value={quantity.toString()}
                                onChange={handleQuantityChange}
                                className={`w-16 ${quantity !== 1 ? styles["active"] : ""}`}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow className={styles["row-active"]}>
                        <TableHead className="w-[200px]">CATEGORIA</TableHead>
                        <TableHead colSpan={2}>ELEMENTO</TableHead>
                        <TableHead className="text-right">PRECIO</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className={`${(measurements.alto !== "" && measurements.ancho !== "" && measurements.profundidad !== "") ? "" : "opacity-20"}`}>
                        <TableCell className="text-medium font-medium">Medidas</TableCell>
                        <TableCell colSpan={3} className="font-medium">
                            {(measurements.alto !== "" && measurements.ancho !== "" && measurements.profundidad !== "") &&
                                Object.values(measurements).map((itemData: number | "", index: number) => {
                                    return <React.Fragment key={index}>
                                        {`${itemData}m ${index === 2 ? "" : "x "}`}
                                    </React.Fragment>
                                })}
                        </TableCell>
                    </TableRow>
                    {Object.entries(selectedOption).map(([category, item]: [string, TableSelectFieldsInterface]) => {
                        return <TableRow key={category} className={(item.data.price === 0 && (item.data.name === "No" || item.data.name === "")) ? "opacity-20" : ""}>
                            <TableCell className="text-medium font-medium">{item.title}</TableCell>
                            <TableCell className="font-medium" colSpan={2}>{item.data.name}</TableCell>
                            <TableCell className="text-right font-medium">{item.data.price === 0 ? "" : `$${item.data.price}`}</TableCell>
                        </TableRow>
                    })}
                </TableBody>
                <TableFooter className={styles["line-bottom"]}>
                    <TableRow>
                        <TableCell colSpan={3} className="text-lg">Total</TableCell>
                        <TableCell className="text-right text-lg">${totalPriceWithQuantity}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div >
    )
}