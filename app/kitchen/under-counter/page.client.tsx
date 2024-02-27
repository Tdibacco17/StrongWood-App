'use client'
import BajoMesadaContainer from "@/container/BajoMesadaContainer/BajoMesadaContainer";
import { BajoMesadaExcelDataResponse, BajoMesadaInterface } from "@/types/cocinaTypes";
import { OptionType } from "@/types/reducer";

export default function UnderCounterPageClient({
    excelData,
    optionType,
    moduleType
}: {
    excelData: BajoMesadaExcelDataResponse,
    optionType: OptionType,
    moduleType: string
}) {
    const initialUnderCounterOption: BajoMesadaInterface = {
        medida: {
            title: "Medidas",
            data: { name: "", price: 0, meters: 0 }
        },
        materialExterior: {
            title: "Material exterior",
            data: { name: "", price: 0 }
        },
        panelDeCierre: {
            title: "Panel de cierre",
            data: { name: "", price: 0 }
        },
        fondo: {
            title: "Fondo",
            data: { name: "", price: 0, meters: 0 }
        },
        patas: {
            title: "Patas",
            data: { name: "", price: 0 }
        },
        zocalo: {
            title: "Zocalo",
            data: { name: "", price: 0, meters: 0 }
        },
        apertura: {
            title: "Apertura",
            data: { name: "", price: 0 }
        },
        pisoMetalico: {
            title: "Piso metalico",
            data: { name: "", price: 0 }
        },
        bisagras: {
            title: "Bisagras",
            data: { name: "", price: 0 }
        },
        correderas: {
            title: "Correderas",
            data: { name: "", price: 0 }
        },
    };

    return <BajoMesadaContainer
        excelData={excelData}
        initialSelectedOption={initialUnderCounterOption}
        optionType={optionType}
        moduleType={moduleType}
    />
}