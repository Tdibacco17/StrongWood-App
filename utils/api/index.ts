import { ExcelDataInterface, } from "@/types"
import {
    AlacenaExcelDataResponse, AlacenaSectionTitle, BajoMesadaExcelDataResponse, BajoMesadaSectionTitle,
} from "@/types/cocinaTypes";

const api = {
    cocina: {
        bajoMesada: {
            list: async (): Promise<BajoMesadaExcelDataResponse> => {
                const text = await fetch(`${process.env.COCINA_BAJO_MESADA}`, { cache: "no-store" }).then((res) => res.text())
                const rows = text.split("\n");

                // Definir arrays para almacenar los datos de medidas y materiales
                const medidas: ExcelDataInterface[] = [];
                const materiales: ExcelDataInterface[] = [];
                const panelDeCierre: ExcelDataInterface[] = [];
                const fondos: ExcelDataInterface[] = [];
                const patas: ExcelDataInterface[] = [];
                const zocalo: ExcelDataInterface[] = [];
                const aperturas: ExcelDataInterface[] = [];
                const pisoMetalico: ExcelDataInterface[] = [];
                const puertas: ExcelDataInterface[] = [];
                const cajones: ExcelDataInterface[] = [];
                const bisagras: ExcelDataInterface[] = [];
                const correderas: ExcelDataInterface[] = [];
                const cubiertero: ExcelDataInterface[] = [];
                const carroEsquinero: ExcelDataInterface[] = [];
                const carroEspeciero: ExcelDataInterface[] = [];
                const carroVerdulero: ExcelDataInterface[] = [];
                const canastoVerdulero: ExcelDataInterface[] = [];
                const tacho: ExcelDataInterface[] = [];

                // Función para procesar cada fila y añadir al array correspondiente
                const processRow = (sectionArray: ExcelDataInterface[], sectionName: BajoMesadaSectionTitle): ((row: string) => void) => {
                    // Esta función interna será devuelta y se encargará del procesamiento de cada fila
                    return (row: string) => {
                        const [name, price, meters] = row.split("\t");

                        // Verificar si la fila no comienza con el nombre de la sección
                        if (!name.startsWith(sectionName)) {
                            // Crear un objeto para almacenar los datos de la fila
                            const rowData: ExcelDataInterface = {
                                name,
                                price: parseFloat(price.replace(",", ".")), // Convertir el precio a un número de punto flotante
                            };

                            // Verificar si hay datos para metros y si son válidos
                            if (meters && !isNaN(parseFloat(meters.replace(",", ".")))) {
                                rowData.meters = parseFloat(meters.replace(",", ".")); // Convertir los metros a un número de punto flotante si son válidos
                            }

                            // Agregar los datos de la fila al array correspondiente
                            sectionArray.push(rowData);
                        }
                    };
                };

                // Definir mapeo de secciones a funciones de procesamiento
                const sectionProcessors: Record<BajoMesadaSectionTitle, (row: string) => void> = {
                    "medidas": processRow(medidas, "medidas"),
                    "materiales": processRow(materiales, "materiales"),
                    "panel de cierre": processRow(panelDeCierre, "panel de cierre"),
                    "fondos": processRow(fondos, "fondos"),
                    "patas": processRow(patas, "patas"),
                    "zocalo": processRow(zocalo, "zocalo"),
                    "aperturas": processRow(aperturas, "aperturas"),
                    "piso metalico": processRow(pisoMetalico, "piso metalico"),
                    "puertas": processRow(puertas, "puertas"),
                    "cajones": processRow(cajones, "cajones"),
                    "bisagras": processRow(bisagras, "bisagras"),
                    "correderas": processRow(correderas, "correderas"),
                    "cubiertero": processRow(cubiertero, "cubiertero"),
                    "carro esquinero": processRow(carroEsquinero, "carro esquinero"),
                    "carro especiero": processRow(carroEspeciero, "carro especiero"),
                    "carro verdulero": processRow(carroVerdulero, "carro verdulero"),
                    "canasto verdulero": processRow(canastoVerdulero, "canasto verdulero"),
                    "tacho": processRow(tacho, "tacho"),
                    // Puedes agregar más secciones aquí según sea necesario
                };

                // Procesar cada fila del archivo TSV
                let currentSection: BajoMesadaSectionTitle | null = null;
                for (const row of rows) {
                    const [sectionName] = row.split("\t");

                    // Verificar si estamos procesando una nueva sección
                    if (sectionName in sectionProcessors) {
                        currentSection = sectionName as BajoMesadaSectionTitle;
                    }

                    // Procesar fila utilizando la función de procesamiento correspondiente
                    if (currentSection && sectionProcessors[currentSection]) {
                        sectionProcessors[currentSection](row);
                    }
                }

                // Retornamos el objeto con las medidas y materiales
                return {
                    medidas, materiales, panelDeCierre, fondos, patas, zocalo, aperturas,
                    pisoMetalico, puertas, cajones, bisagras, correderas, cubiertero, carroEsquinero,
                    carroEspeciero, carroVerdulero, canastoVerdulero, tacho
                };
            }
        },
        // alacena:{
        //     list: async (): Promise<AlacenaExcelDataResponse> => {
        //         const text = await fetch(`${process.env.COCINA_ALACENA}`, { cache: "no-store" }).then((res) => res.text())
        //         const rows = text.split("\n");

        //         // Definir arrays para almacenar los datos de medidas y materiales
        //         const medidas: ExcelDataInterface[] = [];
        //         const materiales: ExcelDataInterface[] = [];

        //         // Función para procesar cada fila y añadir al array correspondiente
        //         const processRow = (sectionArray: ExcelDataInterface[], sectionName: AlacenaSectionTitle): ((row: string) => void) => {
        //             // Esta función interna será devuelta y se encargará del procesamiento de cada fila
        //             return (row: string) => {
        //                 const [name, price, meters] = row.split("\t");

        //                 // Verificar si la fila no comienza con el nombre de la sección
        //                 if (!name.startsWith(sectionName)) {
        //                     // Crear un objeto para almacenar los datos de la fila
        //                     const rowData: ExcelDataInterface = {
        //                         name,
        //                         price: parseFloat(price.replace(",", ".")), // Convertir el precio a un número de punto flotante
        //                     };

        //                     // Verificar si hay datos para metros y si son válidos
        //                     if (meters && !isNaN(parseFloat(meters.replace(",", ".")))) {
        //                         rowData.meters = parseFloat(meters.replace(",", ".")); // Convertir los metros a un número de punto flotante si son válidos
        //                     }

        //                     // Agregar los datos de la fila al array correspondiente
        //                     sectionArray.push(rowData);
        //                 }
        //             };
        //         };

        //         // Definir mapeo de secciones a funciones de procesamiento
        //         const sectionProcessors: Record<AlacenaSectionTitle, (row: string) => void> = {
        //             "medidas": processRow(medidas, "medidas"),
        //             "materiales": processRow(materiales, "materiales"),
        //             //"fondo": processRow(fondo, "fondo"),
        //             // Puedes agregar más secciones aquí según sea necesario
        //         };

        //         // Procesar cada fila del archivo TSV
        //         let currentSection: AlacenaSectionTitle | null = null;
        //         for (const row of rows) {
        //             const [sectionName] = row.split("\t");

        //             // Verificar si estamos procesando una nueva sección
        //             if (sectionName in sectionProcessors) {
        //                 currentSection = sectionName as AlacenaSectionTitle;
        //             }

        //             // Procesar fila utilizando la función de procesamiento correspondiente
        //             if (currentSection && sectionProcessors[currentSection]) {
        //                 sectionProcessors[currentSection](row);
        //             }
        //         }

        //         // Retornamos el objeto con las medidas y materiales
        //         return { medidas, materiales };
        //     }
        // }
    }
}

export default api