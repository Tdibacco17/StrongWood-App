import { BajoMesadaExcelDataResponse, ExcelDataInterface, BajoMesadaSectionTitle } from "@/types"

const api = {
    cocina: {
        bajoMesada: {
            list: async (): Promise<BajoMesadaExcelDataResponse> => {
                const text = await fetch(`${process.env.BAJO_MESADA}`, { cache: "no-store" }).then((res) => res.text())
                const rows = text.split("\n");

                // Definir arrays para almacenar los datos de medidas y materiales
                const medidas: ExcelDataInterface[] = [];
                const materiales: ExcelDataInterface[] = [];

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
                console.log(medidas, "MEDIDAS")
                console.log(materiales, "MATERIALES")
                // Retornamos el objeto con las medidas y materiales
                return { medidas, materiales };
            }
        }
    }
}

export default api