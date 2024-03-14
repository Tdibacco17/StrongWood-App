'use client'
import IslaComponent from "@/components/IslaComponent/IslaComponent";
import { UseSavedOptions } from "@/hook/UseSavedOptions";
import { ExcelDataInterface, MeasurementsInterface, SquareMetersInterface } from "@/types";
import { IslaExcelDataResponse, IslaInterface, IslaTypes, ModuleType } from "@/types/cocinaTypes";
import { OptionType, SaveOptionsInterface } from "@/types/reducer";
import {
    calculateTotalPrice, handleBisagrasQuantityChange, handleCalculateDrawerPrice, handleCalculatePricePisoCajon,
    handleCorrederasQuantityChange, handleFondo, handleMaterialExterior, handleMeasureSelect, handleNumericInputChange,
    handlePanelDeCierre, handleQuantityApertura, handleQuantityChange, handleZocalo
} from "@/utils/functions";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function IslaContainer({
    initialSelectedOption,
    excelData,
    optionType,
    moduleType
}: {
    initialSelectedOption: IslaInterface,
    excelData: IslaExcelDataResponse,
    optionType: OptionType,
    moduleType: ModuleType
}) {
    const [moduleName, setModuleName] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [measurements, setMeasurements] = useState<MeasurementsInterface | undefined>(undefined);
    const [selectedOption, setSelectedOption] = useState<IslaInterface>(initialSelectedOption);
    const [bisagrasQuantity, setBisagrasQuantity] = useState<number>(1);
    const [correderasQuantity, setCorrederasQuantity] = useState<number>(1);
    const [squareMeter, setSquareMeter] = useState<SquareMetersInterface[]>([])
    const [totalSquareMeters, setTotalSquareMeters] = useState<{ [key: string]: { amount: number } }>({});
    const { handleSaveOptionsChange, handleSaveMaterialsChange } = UseSavedOptions();
    console.log(totalSquareMeters)
    //actualizador de selecciones
    const handleOptionSelect = (
        category: IslaTypes,
        itemData: ExcelDataInterface
    ): void => {
        setSelectedOption((prevState: IslaInterface) => ({
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
        if (category === 'medida') {
            handleMeasureSelect({
                itemData,
                setMeasurements,
                squareMeter,
                setSquareMeter,
                category
            });
        }
        if (measurements) {
            if (category === 'materialExterior') {
                handleMaterialExterior({
                    materialName: itemData.name,
                    measurements,
                    excelData: excelData.materiales,
                    setSelectedOption,
                    category,
                    squareMeter,
                    setSquareMeter,
                })
                if (selectedOption.panelDeCierre.data.name.trim().length > 0) { // actualizamos panel de cierre
                    handlePanelDeCierre({
                        itemData: selectedOption.panelDeCierre.data.name,
                        materialName: itemData.name,
                        measurements,
                        excelData: excelData.materiales,
                        setSelectedOption,
                        category: 'panelDeCierre',
                        setSquareMeter,
                        squareMeter
                    });
                }
            }
            if (category === 'panelDeCierre') {
                handlePanelDeCierre({
                    itemData: itemData.name,
                    materialName: selectedOption.materialExterior.data.name,
                    measurements,
                    excelData: excelData.materiales,
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
                    excelData: excelData.materiales,
                    setSelectedOption,
                    category,
                    squareMeter,
                    setSquareMeter,
                })
            }
            if (category === 'fondo') {
                handleFondo({
                    itemData: itemData.name,
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
            if (category === "puertas") {
                if (selectedOption.apertura.data.name.trim().length > 0) { // actualizo apertura
                    handleQuantityApertura({
                        drawerQuantity: itemData.name !== "No" ? Number(itemData.name) : 0,
                        islaProps: {
                            setSelectedOption,
                        },
                        category: 'apertura',
                        itemData: selectedOption.apertura.data,
                        excelData: excelData.aperturas
                    })
                }
            }
            if (category === "cajones") {
                handleCalculateDrawerPrice({
                    // excelData: excelData.materiales,
                    measurements,
                    islaProps: {
                        setSelectedOption,
                    },
                    drawerQuantity: itemData.name !== "No" ? Number(itemData.name) : 0,
                    category,
                    setSquareMeter,
                    squareMeter
                })
                if (selectedOption.pisoCajon.data.name.trim().length > 0 && selectedOption.pisoCajon.data.name !== "No") {
                    //actualizamos pisoCajon si cambiamos la cantidad de cajones
                    handleCalculatePricePisoCajon({
                        measurements,
                        itemData: selectedOption.pisoCajon.data.name,
                        islaProps: {
                            setSelectedOption,
                        },
                        excelData: excelData.fondos,
                        drawerQuantity: itemData.name !== "No" ? Number(itemData.name) : 0,
                        category: "pisoCajon",
                        setSquareMeter,
                        squareMeter
                    })
                }
                if (selectedOption.apertura.data.name.trim().length > 0) { // actualizo apertura
                    handleQuantityApertura({
                        drawerQuantity: itemData.name !== "No" ? Number(itemData.name) : 0,
                        islaProps: {
                            setSelectedOption,
                        },
                        category: 'apertura',
                        itemData: selectedOption.apertura.data,
                        excelData: excelData.aperturas
                    })
                }
            }
            if (category === "pisoCajon") {
                if (selectedOption.cajones.data.name.trim().length > 0) {
                    handleCalculatePricePisoCajon({
                        measurements,
                        itemData: itemData.name,
                        islaProps: {
                            setSelectedOption,
                        },
                        excelData: excelData.fondos,
                        drawerQuantity: selectedOption.cajones.data.name !== "No" ? Number(selectedOption.cajones.data.name) : 0,
                        category,
                        setSquareMeter,
                        squareMeter
                    })
                }
            }
        }
        if (category === "apertura") {
            if (selectedOption.cajones.data.name.trim().length > 0) {
                handleQuantityApertura({
                    drawerQuantity: selectedOption.cajones.data.name !== "No" ? Number(selectedOption.cajones.data.name) : 0,
                    category,
                    itemData,
                    excelData: excelData.aperturas,
                    islaProps: {
                        setSelectedOption,
                    }
                })
            }
            if (selectedOption.puertas.data.name.trim().length > 0) {
                handleQuantityApertura({
                    drawerQuantity: selectedOption.puertas.data.name !== "No" ? Number(selectedOption.puertas.data.name) : 0,
                    islaProps: {
                        setSelectedOption,
                    },
                    category,
                    itemData,
                    excelData: excelData.aperturas
                })
            }
        }
        if (category === "bisagras") {
            handleNumericInputChange({
                quantity: bisagrasQuantity,
                itemData,
                excelData: excelData.bisagras,
                islaProps: {
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
                islaProps: {
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
            islaProps: {
                selectedOption,
                setSelectedOption
            },
            excelData: excelData.bisagras,
        });
    };
    //cantidad de correderas
    const handleCorrederasQuantityChangeWrapper = (event: React.ChangeEvent<HTMLInputElement>): void => {
        handleCorrederasQuantityChange({ event, setCorrederasQuantity, excelData: excelData.correderas, islaProps: { setSelectedOption, selectedOption } });
    };
    //cantidad del modulo total
    const handleQuantityChangeWrapper = (event: React.ChangeEvent<HTMLInputElement>): void => {
        handleQuantityChange(event, setQuantity);
    };
    //actualizacion de precio total
    const totalPriceWithQuantity = calculateTotalPrice(selectedOption, quantity);
    //actualizacion de vuelta atras en selecciones
    useEffect(() => {
        if (selectedOption.materialExterior.data.name.trim().length > 0) { //actualiamos materialExterior
            handleMaterialExterior({
                materialName: selectedOption.materialExterior.data.name,
                measurements,
                excelData: excelData.materiales,
                setSelectedOption,
                category: 'materialExterior',
                setSquareMeter,
                squareMeter,
            })
        }
        if (selectedOption.panelDeCierre.data.name.trim().length > 0 && selectedOption.materialExterior.data.name.trim().length > 0) { // actualizamos panel de cierre
            handlePanelDeCierre({
                itemData: selectedOption.panelDeCierre.data.name,
                materialName: selectedOption.materialExterior.data.name,
                measurements,
                excelData: excelData.materiales,
                setSelectedOption,
                category: 'panelDeCierre',
                setSquareMeter,
                squareMeter
            });
        }
        if (selectedOption.cierreAtras.data.name.trim().length > 0) { //actualiamos cierreAtras
            handleMaterialExterior({
                materialName: selectedOption.materialExterior.data.name,
                measurements,
                excelData: excelData.materiales,
                setSelectedOption,
                category: 'cierreAtras',
                setSquareMeter,
                squareMeter,
            })
        }
        if (selectedOption.fondo.data.name.trim().length > 0) { //  actualizamos fondo
            handleFondo({
                itemData: selectedOption.fondo.data.name,
                measurements,
                setSelectedOption,
                category: 'fondo',
                squareMeter,
                setSquareMeter
            });
        }
        if (selectedOption.zocalo.data.name.trim().length > 0) {//  actualizamos zocalo
            handleZocalo({
                itemData: selectedOption.zocalo.data.name,
                measurements,
                excelData: excelData.zocalo,
                setSelectedOption,
                category: 'zocalo',
            });
        }
        if (selectedOption.cajones.data.name.trim().length > 0) { //Actualizo cajones
            handleCalculateDrawerPrice({
                // excelData: excelData.fondos,
                measurements,
                islaProps: {
                    setSelectedOption,
                },
                drawerQuantity: selectedOption.cajones.data.name !== "No" ? Number(selectedOption.cajones.data.name) : 0,
                category: "cajones",
                setSquareMeter,
                squareMeter
            })
        }
        if (selectedOption.pisoCajon.data.name.trim().length > 0) { //actualizamos pisoCajon
            handleCalculatePricePisoCajon({
                measurements,
                itemData: selectedOption.pisoCajon.data.name,
                islaProps: {
                    setSelectedOption,
                },
                excelData: excelData.fondos,
                drawerQuantity: selectedOption.cajones.data.name !== "No" ? Number(selectedOption.cajones.data.name) : 0,
                category: "pisoCajon",
                setSquareMeter,
                squareMeter
            })
        }
    }, [measurements])

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
                // const medida = materialData.meters ?? 0;
                // const precio = materialData.price ?? 0;
                const amountNeeded = consolidatedSquareMeter[material];
                // let placasNeeded = 1;
                // if (amountNeeded > medida) {
                //     placasNeeded = Math.ceil(amountNeeded / medida);
                // }
                // const totalPrice = placasNeeded * precio;

                updatedTotalSquareMeters[material] = {
                    amount: parseFloat(amountNeeded.toFixed(3)),
                    // placas: placasNeeded,
                    // price: parseFloat(totalPrice.toFixed(2))
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
            materials: totalSquareMeters
        };

        // Limpiar los campos
        setModuleName('');
        setQuantity(1);
        setSelectedOption(initialSelectedOption);
        setMeasurements(undefined)
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

    return <IslaComponent
        handleOptionSelect={handleOptionSelect}
        handleQuantityChangeWrapper={handleQuantityChangeWrapper}
        handleSaveOptions={handleSaveOptions}
        moduleName={moduleName}
        setModuleName={setModuleName}
        quantity={quantity}
        selectedOption={selectedOption}
        excelData={excelData}
        totalPriceWithQuantity={totalPriceWithQuantity}
        measurements={measurements ? true : false}
        bisagrasQuantity={bisagrasQuantity}
        correderasQuantity={correderasQuantity}
        handleCorrederasQuantityChangeWrapper={handleCorrederasQuantityChangeWrapper}
        handleBisagrasQuantityChangeWrapper={handleBisagrasQuantityChangeWrapper}
    />
}