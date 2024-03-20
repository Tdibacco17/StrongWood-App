'use client'
import BajoMesadaComponent from "@/components/BajoMesadaComponent/BajoMesadaComponent";
import { UseSavedOptions } from "@/hook/UseSavedOptions";
import { ExcelDataInterface, MeasurementsInterface, SquareMetersInterface } from "@/types";
import { BajoMesadaExcelDataResponse, BajoMesadaInterface, BajoMesadaTypes, ModuleType } from "@/types/cocinaTypes";
import { OptionType, SaveOptionsInterface } from "@/types/reducer";
import {
    calculateTotalPrice, handleFondo, handleMaterialExterior, handleMeasureSelect, handleNumericInputChange, handlePanelDeCierre,
    handleZocalo, handleBisagrasQuantityChange, handleCorrederasQuantityChange, handleQuantityChange, handleCalculateDrawerPrice, handleCalculatePricePisoCajon, calculateTotalPriceM2, handleQuantityApertura
} from "@/utils/functions";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function BajoMesadaContainer({
    initialSelectedOption,
    initialMeasurementOption,
    excelData,
    optionType,
    moduleType,
    subTitle
}: {
    initialSelectedOption: BajoMesadaInterface,
    initialMeasurementOption: MeasurementsInterface,
    excelData: BajoMesadaExcelDataResponse,
    optionType: OptionType,
    moduleType: ModuleType,
    subTitle?: string
}) {
    const [moduleName, setModuleName] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [measurements, setMeasurements] = useState<MeasurementsInterface>(initialMeasurementOption);
    const [selectedOption, setSelectedOption] = useState<BajoMesadaInterface>(initialSelectedOption);
    const [bisagrasQuantity, setBisagrasQuantity] = useState<number>(1);
    const [correderasQuantity, setCorrederasQuantity] = useState<number>(1);
    const [squareMeter, setSquareMeter] = useState<SquareMetersInterface[]>([])
    const [totalSquareMeters, setTotalSquareMeters] = useState<{ [key: string]: { amount: number } }>({});
    const { handleSaveOptionsChange, handleSaveMaterialsChange } = UseSavedOptions();
    //actualizador de selecciones de medidas(inputs)
    const handleMeasureChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof MeasurementsInterface) => {
        let value = e.target.value.replace(",", ".");
        if (value === "" || parseFloat(value) < 0) {
            value = "0";
        }
        setMeasurements(prevState => ({
            ...prevState,
            [fieldName]: parseFloat(value)
        }));
    };

    //agregamos las medidas a squareMeters
    useEffect(() => {
        const { ancho, alto, profundidad } = measurements;
        if (ancho !== "" && alto !== "" && profundidad !== "") {
            handleMeasureSelect({
                measurements,
                squareMeter,
                setSquareMeter,
                category: "medidas",
            });
        }
    }, [measurements])

    //actualizador de selecciones
    const handleOptionSelect = (
        category: BajoMesadaTypes,
        itemData: ExcelDataInterface
    ): void => {
        setSelectedOption((prevState: BajoMesadaInterface) => ({
            ...prevState,
            [category]: {
                ...prevState[category],
                data: {
                    ...prevState[category].data,
                    name: itemData.name,
                    price: parseFloat(itemData.price.toFixed(3))
                },
            },
        }));
        const { ancho, alto, profundidad } = measurements;
        if (ancho !== "" && alto !== "" && profundidad !== "") {
            if (category === 'materialExterior') {
                handleMaterialExterior({
                    materialName: itemData.name,
                    measurements,
                    setSelectedOption,
                    category,
                    squareMeter,
                    setSquareMeter,
                    itemData
                })
            }
            if (category === 'panelDeCierre') {
                handlePanelDeCierre({
                    itemData: itemData.name,
                    materialName: selectedOption.materialExterior.data.name,
                    measurements,
                    setSelectedOption: setSelectedOption,
                    category,
                    setSquareMeter,
                    squareMeter
                });
            }
            if (category === 'cierreAtras') {
                handleMaterialExterior({
                    materialName: selectedOption.materialExterior.data.name,
                    measurements,
                    setSelectedOption,
                    category,
                    squareMeter,
                    setSquareMeter,
                    itemData
                })
            }
            if (category === 'fondo') {
                handleFondo({
                    materialName: itemData.name,
                    measurements,
                    setSelectedOption,
                    category,
                    squareMeter,
                    setSquareMeter
                });
            }
            if (category === 'zocalo') {
                handleZocalo({
                    itemData: itemData.name,
                    measurements,
                    excelData: excelData.zocalo,
                    setSelectedOption,
                    category,
                });
            }
            if (category === "cajones") {
                handleCalculateDrawerPrice({
                    measurements,
                    bajoMesadaProps: {
                        setSelectedOption,
                        category
                    },
                    drawerQuantity: itemData.name !== "No" ? Number(itemData.name) : 0,
                    setSquareMeter,
                    squareMeter
                })
            }
            if (category === "pisoCajon") {
                if (selectedOption.cajones.data.name.trim().length > 0) {
                    handleCalculatePricePisoCajon({
                        measurements,
                        materialName: itemData.name,
                        bajoMesadaProps: {
                            setSelectedOption,
                            category
                        },
                        drawerQuantity: selectedOption.cajones.data.name !== "No" ? Number(selectedOption.cajones.data.name) : 0,
                        setSquareMeter,
                        squareMeter,
                    })
                }
            }
            if (category === "cajonInterno") {
                //hacer 2 en una
                handleCalculateDrawerPrice({
                    measurements,
                    bajoMesadaProps: {
                        setSelectedOption,
                        category
                    },
                    drawerQuantity: itemData.name !== "No" ? Number(itemData.name) : 0,
                    setSquareMeter,
                    squareMeter
                })
            }
            if (category === "pisoCajonInterno") {
                if (selectedOption.cajones.data.name.trim().length > 0 && selectedOption.cajonInterno.data.name.trim().length > 0) {
                    handleCalculatePricePisoCajon({
                        measurements,
                        materialName: itemData.name,
                        bajoMesadaProps: {
                            setSelectedOption,
                            category: "pisoCajonInterno"
                        },
                        drawerQuantity: selectedOption.cajonInterno.data.name !== "No" ? Number(selectedOption.cajonInterno.data.name) : 0,
                        setSquareMeter,
                        squareMeter
                    })
                }
            }
        }
        if (category === "apertura") {
            if (selectedOption.cajones.data.name.trim().length > 0) {
                handleQuantityApertura({
                    drawerQuantity: selectedOption.cajones.data.name !== "No"
                        ? selectedOption.cajonInterno.data.name !== "No"
                            ? Number(selectedOption.cajonInterno.data.name) + Number(selectedOption.cajones.data.name)
                            : Number(selectedOption.cajones.data.name)
                        : 0,
                    category,
                    materialName: itemData.name,
                    excelData: excelData.aperturas,
                    bajoMesadaProps: {
                        setSelectedOption,
                    }
                })
            } else if (selectedOption.puertas.data.name.trim().length > 0) {
                handleQuantityApertura({
                    drawerQuantity: selectedOption.puertas.data.name !== "No" ? Number(selectedOption.puertas.data.name) : 0,
                    bajoMesadaProps: {
                        setSelectedOption,
                    },
                    category,
                    materialName: itemData.name,
                    excelData: excelData.aperturas
                })
            }
        }
        if (category === "bisagras") {
            handleNumericInputChange({
                quantity: bisagrasQuantity,
                itemData,
                excelData: excelData.bisagras,
                bajoMesadaProps: {
                    setSelectedOption,
                    category
                },
            });
        }
        if (category === "correderas") {
            handleNumericInputChange({
                quantity: correderasQuantity,
                itemData,
                excelData: excelData.correderas,
                bajoMesadaProps: {
                    setSelectedOption,
                    category
                },
            })
        }
    };
    //cantidad de bisagras
    const handleBisagrasQuantityChangeWrapper = (event: React.ChangeEvent<HTMLInputElement>): void => {
        handleBisagrasQuantityChange({
            event,
            setBisagrasQuantity,
            bajoMesadaProps: {
                selectedOption,
                setSelectedOption
            },
            excelData: excelData.bisagras,
        });
    };
    //cantidad de correderas
    const handleCorrederasQuantityChangeWrapper = (event: React.ChangeEvent<HTMLInputElement>): void => {
        handleCorrederasQuantityChange({ event, setCorrederasQuantity, excelData: excelData.correderas, bajoMesadaProps: { setSelectedOption, selectedOption } });
    };
    //cantidad del modulo total
    const handleQuantityChangeWrapper = (event: React.ChangeEvent<HTMLInputElement>): void => {
        handleQuantityChange(event, setQuantity);
    };
    //actualizacion de precio total
    const totalPriceWithQuantity = calculateTotalPrice(selectedOption, quantity);
    //actualizacion de vuelta atras en selecciones

    useEffect(() => {
        const consolidatedSquareMeter: { [key: string]: number } = {};
        const combinedData = [...excelData.materiales, ...excelData.fondos.slice(1)];

        // Consolidar los metros cuadrados
        squareMeter.forEach(item => {
            if (consolidatedSquareMeter[item.title]) {
                consolidatedSquareMeter[item.title] += item.amount;
            } else {
                consolidatedSquareMeter[item.title] = item.amount;
            }
        });

        // Inicializar el objeto actualizado de totalSquareMeters
        const updatedTotalSquareMeters: { [key: string]: { amount: number } } = {};
        // Calcular los datos actualizados de totalSquareMeters
        Object.keys(consolidatedSquareMeter).forEach(material => {
            const materialData = combinedData.find(mat => mat.name === material);
            if (materialData) {
                const amountNeeded = consolidatedSquareMeter[material];
                updatedTotalSquareMeters[material] = {
                    amount: parseFloat(amountNeeded.toFixed(3)),
                };
            }
        });

        // Eliminar materiales no presentes en squareMeter de totalSquareMeters
        Object.keys(totalSquareMeters).forEach(material => {
            if (!Object.keys(consolidatedSquareMeter).includes(material)) {
                delete updatedTotalSquareMeters[material];
            }
        });

        // Actualizar el estado de totalSquareMeters
        setTotalSquareMeters(updatedTotalSquareMeters);
    }, [squareMeter]);

    //guardar selecciones
    const handleSaveOptions = (): void => {
        // Verificar si algún campo de opción es inválido
        const isAnyOptionInvalid = Object.values(selectedOption).some(
            (option) => !option.data.name || option.data.name.trim() === ''
        );

        // Si el nombre del módulo está en blanco o alguna opción es inválida, salimos de la función
        if (moduleName.trim() === '' || isAnyOptionInvalid) {
            // Manejar el caso en que falten opciones seleccionadas
            toast.warning("COMPLETE TODOS LOS CAMPOS ANTES DE GUARDAR.", {
                duration: 3000,
            });
            return;
        }

        // Crear un nuevo objeto de datos guardados
        const newData: SaveOptionsInterface = {
            moduleType: moduleType,
            name: moduleName,
            totalPrice: calculateTotalPrice(selectedOption, quantity),
            quantity,
            moduleData: { ...selectedOption },
            measurements,
            materials: totalSquareMeters
        };

        // Limpiar los campos
        setModuleName('');
        setQuantity(1);
        setSelectedOption(initialSelectedOption);
        setMeasurements(initialMeasurementOption)
        setBisagrasQuantity(1)
        setCorrederasQuantity(1)
        setSquareMeter([]);
        setTotalSquareMeters({})
        // Llama a la función para guardar las opciones
        handleSaveOptionsChange(optionType, newData);
        handleSaveMaterialsChange(optionType, [...excelData.materiales, ...excelData.fondos.slice(1)]);
        toast.success("MODULO CREADO CORRECTAMENTE.", {
            duration: 3000,
        })
        return;
    };

    return <BajoMesadaComponent
        handleOptionSelect={handleOptionSelect}
        handleQuantityChangeWrapper={handleQuantityChangeWrapper}
        handleSaveOptions={handleSaveOptions}
        moduleName={moduleName}
        setModuleName={setModuleName}
        quantity={quantity}
        selectedOption={selectedOption}
        excelData={excelData}
        totalPriceWithQuantity={totalPriceWithQuantity}
        measurements={measurements}
        bisagrasQuantity={bisagrasQuantity}
        correderasQuantity={correderasQuantity}
        handleCorrederasQuantityChangeWrapper={handleCorrederasQuantityChangeWrapper}
        handleBisagrasQuantityChangeWrapper={handleBisagrasQuantityChangeWrapper}
        handleMeasureChange={handleMeasureChange}
        measurementSelected={
            (measurements.ancho !== "" && measurements.ancho !== 0) &&
            (measurements.alto !== "" && measurements.alto !== 0) &&
            (measurements.profundidad !== "" && measurements.profundidad !== 0)
        }
        subTitle={subTitle}
    />
}