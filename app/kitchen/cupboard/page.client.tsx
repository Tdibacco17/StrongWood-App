'use client'
import AlacenaContainer from "@/container/AlacenaContainer/AlacenaContainer";
import { AlacenaExcelDataResponse, AlacenaInterface, ModuleType } from "@/types/cocinaTypes";
import { OptionType } from "@/types/reducer";

export default function CupboardPageClient({
    excelData,
    optionType,
    moduleType
}: {
    excelData: AlacenaExcelDataResponse,
    optionType: OptionType,
    moduleType: ModuleType
}) {
    const initialAlacenaOption: AlacenaInterface = {
        medida: {
            title: "Medidas",
            data: { name: "", price: 0 }
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
            data: { name: "", price: 0 }
        },
        rebatibles: {
            title: "Rebatibles",
            data: { name: "", price: 0 }
        },
        batientes: {
            title: "Batientes",
            data: { name: "", price: 0 }
        },
        bisagras: {
            title: "Bisagras",
            data: { name: "", price: 0 }
        },
        apertura: {
            title: "Apertura",
            data: { name: "", price: 0 }
        },
        estantes: {
            title: "Estantes",
            data: { name: "", price: 0 }
        },
        piston: {
            title: "Piston",
            data: { name: "", price: 0 }
        },
    };
    return <AlacenaContainer
        excelData={excelData}
        initialSelectedOption={initialAlacenaOption}
        optionType={optionType}
        moduleType={moduleType}
    />
}