import BajoMesadaContainer from "@/container/BajoMesadaContainer/BajoMesadaContainer";
import { MeasurementsInterface } from "@/types";
import { BajoMesadaExcelDataResponse, BajoMesadaInterface, ModuleType } from "@/types/cocinaTypes";
import { OptionType } from "@/types/reducer";

export default function IslandPageClient({
    excelData,
    optionType,
    moduleType
}: {
    excelData: BajoMesadaExcelDataResponse,
    optionType: OptionType,
    moduleType: ModuleType
}) {
    const initialMeasurementOption: MeasurementsInterface = {
        ancho: "",
        alto: "",
        profundidad: ""
    }

    const initialIslandOption: BajoMesadaInterface = {
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
        pisoCajon: {
            title: "Piso cajon",
            data: { name: "", price: 0 }
        },
        cajonInterno: {
            title: "Cajon interno",
            data: { name: "", price: 0 }
        },
        pisoCajonInterno: {
            title: "Piso cajon interno",
            data: { name: "", price: 0 }
        },
        correderas: {
            title: "Correderas",
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

    return <BajoMesadaContainer
        excelData={excelData}
        initialSelectedOption={initialIslandOption}
        initialMeasurementOption={initialMeasurementOption}
        optionType={optionType}
        moduleType={moduleType}
        subTitle={"De ser necesario utilizar la coma. ( Pensado para modulos de 0.50m a 1.50m de ancho )"}
    />
}