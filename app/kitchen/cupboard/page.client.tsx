import AlacenaContainer from "@/container/AlacenaContainer/AlacenaContainer";
import { MeasurementsInterface } from "@/types";
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
    const initialMeasurementOption: MeasurementsInterface = {
        ancho: "",
        alto: "",
        profundidad: ""
    }

    const initialCupboardOption: AlacenaInterface = {
        materialExterior: {
            title: "Material exterior",
            data: { name: "", price: 0 }
        },
        panelDeCierre: {
            title: "Panel de cierre",
            data: { name: "", price: 0 }
        },
        cierreTecho: {
            title: "Cierre techo",
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
        initialSelectedOption={initialCupboardOption}
        initialMeasurementOption={initialMeasurementOption}
        optionType={optionType}
        moduleType={moduleType}
        subTitle={"De ser necesario utilizar la coma. ( Pensado para modulos de 0.20m a 1m de ancho )"}
    />
}