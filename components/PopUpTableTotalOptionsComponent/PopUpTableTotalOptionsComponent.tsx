import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import styles from "./PopUpTableTotalOptionsComponent.module.scss"
import { Badge } from "../ui/badge";
import { UseSavedOptions } from "@/hook/UseSavedOptions";
import { OptionType } from "@/types/reducer";
import { TableSelectFieldsInterface } from "@/types";
import React from "react";

export default function PopUpTableTotalOptionsComponent({
    selectedItemIndex,
    optionType,
    handleCloseDialog
}: {
    selectedItemIndex: number | null,
    optionType: OptionType,
    handleCloseDialog: () => void
}) {
    const { saveOptions } = UseSavedOptions();

    return (
        <>
            {selectedItemIndex !== null && (
                <div className={styles["container-section-popup"]}>
                    <Card className={styles["wrapper"]}>
                        <CardHeader >
                            <CardTitle className={`${styles["card-header"]} text-lg font-bold`}>
                                <div className="flex items-center">
                                    <Badge variant="outline">{saveOptions[optionType].data[selectedItemIndex].moduleType}</Badge>
                                    <p className="pl-4">{saveOptions[optionType].data[selectedItemIndex].name}</p>
                                </div>
                                <Button variant="outline" size="icon" className="text-sm font-medium" onClick={handleCloseDialog}>X</Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className={styles["scroll-table"]}>
                            <Table>
                                <TableHeader className={styles["line-top"]}>
                                    <TableRow className={styles["row-active"]}>
                                        <TableHead className="w-[300px]">CATEGORIA</TableHead>
                                        <TableHead >ELEMENTO</TableHead>
                                        <TableHead className="text-right">PRECIO</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow >
                                        <TableCell className="text-medium font-medium">Medidas</TableCell>
                                        <TableCell colSpan={3} className="font-medium">
                                            {(saveOptions[optionType].data[selectedItemIndex].measurements) &&
                                                Object.values(saveOptions[optionType].data[selectedItemIndex].measurements).map((itemData: number | "", index: number) => {
                                                    return <React.Fragment key={index}>
                                                        {`${itemData}m ${index === 2 ? "" : "x "}`}
                                                    </React.Fragment>
                                                })}
                                        </TableCell>
                                    </TableRow>
                                    {Object.entries(saveOptions[optionType].data[selectedItemIndex].moduleData).map(([category, item]: [string, TableSelectFieldsInterface]) => {
                                        if (item.data.name === "No") return
                                        return <TableRow key={category}>
                                            <TableCell className="text-medium font-medium">{item.title}</TableCell>
                                            <TableCell className="font-medium">{item.data.name}</TableCell>
                                            <TableCell className="text-right font-medium">{item.data.price === 0 ? "" : `$${item.data.price}`}</TableCell>
                                        </TableRow>
                                    })}
                                </TableBody>
                                <TableHeader className={styles["line-top"]}>
                                    <TableRow className={styles["row-active"]}>
                                        <TableHead className="w-[300px]">MATERIALES A UTILIZAR</TableHead>
                                        <TableHead colSpan={2}>M2</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Object.entries(saveOptions[optionType].data[selectedItemIndex].materials).map(([title, { amount }], index) => (
                                        <TableRow key={index}>
                                            <TableCell className="text-medium font-medium">{title}</TableCell>
                                            <TableCell colSpan={2} className="font-medium">{amount} m</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter className={styles["line-bottom"]}>
                                    <TableRow>
                                        <TableCell colSpan={2} className="text-lg">Total x {saveOptions[optionType].data[selectedItemIndex].quantity} modulo</TableCell>
                                        <TableCell className="text-right text-lg">${saveOptions[optionType].data[selectedItemIndex].totalPrice}</TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    )
}