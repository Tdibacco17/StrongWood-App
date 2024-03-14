'use client'
import IslaContainer from "@/container/IslaContainer/IslaContainer";
import { IslaExcelDataResponse, IslaInterface, ModuleType } from "@/types/cocinaTypes";
import { OptionType } from "@/types/reducer";

export default function IslandPageClient({
    excelData,
    optionType,
    moduleType
}: {
    excelData: IslaExcelDataResponse,
    optionType: OptionType,
    moduleType: ModuleType
}) {
    const initialUnderCounterOption: IslaInterface = {
        medida: {
            title: "Medida",
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
        cierreAtras: {
            title: "Cierre atras",
            data: { name: "", price: 0 }
        },
        fondo: {
            title: "Fondo",
            data: { name: "", price: 0 }
        },
        patas: {
            title: "Patas",
            data: { name: "", price: 0 }
        },
        zocalo: {
            title: "Zocalo",
            data: { name: "", price: 0 }
        },
        puertas: {
            title: "Puertas",
            data: { name: "", price: 0 }
        },
        bisagras: {
            title: "Bisagras",
            data: { name: "", price: 0 }
        },
        cajones: {
            title: "Cajones",
            data: { name: "", price: 0 }
        },
        correderas: {
            title: "Correderas",
            data: { name: "", price: 0 }
        },
        pisoCajon: {
            title: "Piso cajon",
            data: { name: "", price: 0 }
        },
        apertura: {
            title: "Apertura",
            data: { name: "", price: 0 }
        },
        pisoMetalico: {
            title: "Piso metalico",
            data: { name: "", price: 0 }
        },
        cubiertero: {
            title: "Cubiertero",
            data: { name: "", price: 0 }
        },
        carroEsquinero: {
            title: "Carro esquinero",
            data: { name: "", price: 0 }
        },
        carroEspeciero: {
            title: "Carro especiero",
            data: { name: "", price: 0 }
        },
        carroVerdulero: {
            title: "Carro verdulero",
            data: { name: "", price: 0 }
        },
        canastoVerdulero: {
            title: "Canasto verdulero",
            data: { name: "", price: 0 }
        },
        tacho: {
            title: "Tacho",
            data: { name: "", price: 0 }
        },
    };

    return <IslaContainer
        excelData={excelData}
        initialSelectedOption={initialUnderCounterOption}
        optionType={optionType}
        moduleType={moduleType}
    />
}