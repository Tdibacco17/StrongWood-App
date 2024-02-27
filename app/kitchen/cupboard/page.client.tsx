'use client'
import AlacenaComponent from "@/components/AlacenaComponent/AlacenaComponent";
import { AlacenaExcelDataResponse, AlacenaInterface } from "@/types/cocinaTypes";
import { OptionType } from "@/types/reducer";

export default function CupboardPageClient({
    excelData,
    optionType,
    moduleType
}: {
    excelData: AlacenaExcelDataResponse,
    optionType: OptionType,
    moduleType: string
}) {
    // const initialAlacenaOption: AlacenaInterface = {
    //     medida: {
    //         title: "Medidas",
    //         data: { name: "", price: 0, meters: 0 }
    //     },
    //     materialExterior: {
    //         title: "Material exterior",
    //         data: { name: "", price: 0 }
    //     },
    //     panelDeCierre: {
    //         title: "Panel de cierre",
    //         data: { name: "", price: 0 }
    //     },
    // };
    return <></>
    // return <ModuleContainer
    //     excelData={excelData}
    //     Component={AlacenaComponent}
    //     initialSelectedOption={initialAlacenaOption}
    //     optionType={optionType}
    //     moduleType={moduleType}
    // />
}