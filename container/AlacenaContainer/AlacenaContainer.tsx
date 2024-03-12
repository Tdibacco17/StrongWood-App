import AlacenaComponent from "@/components/AlacenaComponent/AlacenaComponent";
import { UseSavedOptions } from "@/hook/UseSavedOptions";
import { ExcelDataInterface, MeasurementsInterface, SquareMetersInterface } from "@/types";
import { AlacenaExcelDataResponse, AlacenaInterface, AlacenaTypes } from "@/types/cocinaTypes"
import { OptionType, SaveOptionsInterface } from "@/types/reducer"
import { calculateTotalPrice, handleBisagrasQuantityChange, handleCalculateDrawerPrice, handleCalculateShelfPrice, handleFondo, handleMaterialExterior, handleMeasureSelect, handleNumericInputChange, handlePanelDeCierre, handleQuantityApertura, handleQuantityChange } from "@/utils/functions";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AlacenaContainer({
    initialSelectedOption,
    excelData,
    optionType,
    moduleType
}: {
    initialSelectedOption: AlacenaInterface,
    excelData: AlacenaExcelDataResponse,
    optionType: OptionType,
    moduleType: string
}) {
    const [moduleName, setModuleName] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [measurements, setMeasurements] = useState<MeasurementsInterface | undefined>(undefined);
    const [selectedOption, setSelectedOption] = useState<AlacenaInterface>(initialSelectedOption);
    const [bisagrasQuantity, setBisagrasQuantity] = useState<number>(1);
    const [squareMeter, setSquareMeter] = useState<SquareMetersInterface[]>([])
    const [totalSquareMeters, setTotalSquareMeters] = useState<{ [key: string]: { amount: number } }>({});
    const { handleSaveOptionsChange, handleSaveMaterialsChange } = UseSavedOptions();

    //actualizador de selecciones
    const handleOptionSelect = (
        category: AlacenaTypes,
        itemData: ExcelDataInterface
    ): void => {
        setSelectedOption((prevState: AlacenaInterface) => ({
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
                    setSquareMeter
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
            if (category === 'fondo') {
                handleFondo({
                    itemData: itemData.name,
                    measurements,
                    excelData: excelData.fondos,
                    setSelectedOption,
                    category,
                    squareMeter,
                    setSquareMeter
                });
            }
            if (category === "batientes") {
                if (selectedOption.apertura.data.name.trim().length > 0) { // actualizo apertura
                    handleQuantityApertura({
                        drawerQuantity: itemData.name !== "No" ? Number(itemData.name) : 0,
                        alacenaProps: {
                            setSelectedOption,
                        },
                        category: 'apertura',
                        itemData: selectedOption.apertura.data,
                        excelData: excelData.aperturas
                    })
                }
            }
            if (category === "rebatibles") {
                if (selectedOption.apertura.data.name.trim().length > 0) { // actualizo apertura
                    handleQuantityApertura({
                        drawerQuantity: itemData.name !== "No" ? Number(itemData.name) : 0,
                        alacenaProps: {
                            setSelectedOption,
                        },
                        category: 'apertura',
                        itemData: selectedOption.apertura.data,
                        excelData: excelData.aperturas
                    })
                }
            }
            if (category === "estantes") {
                handleCalculateShelfPrice({
                    category,
                    drawerQuantity: itemData.name !== "No" ? Number(itemData.name) : 0,
                    measurements,
                    setSelectedOption,
                    setSquareMeter,
                    squareMeter
                })
            }
        }
        if (category === "apertura") {
            if (selectedOption.batientes.data.name.trim().length > 0) {
                handleQuantityApertura({
                    drawerQuantity: selectedOption.batientes.data.name !== "No" ? Number(selectedOption.batientes.data.name) : 0,
                    alacenaProps: {
                        setSelectedOption,
                    },
                    category,
                    itemData,
                    excelData: excelData.aperturas
                })
            }
            if (selectedOption.rebatibles.data.name.trim().length > 0) {
                handleQuantityApertura({
                    drawerQuantity: selectedOption.rebatibles.data.name !== "No" ? Number(selectedOption.rebatibles.data.name) : 0,
                    alacenaProps: {
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
                alacenaProps: {
                    setSelectedOption,
                    category
                }
            });
        }
    }


    //cantidad de bisagras
    const handleBisagrasQuantityChangeWrapper = (event: React.ChangeEvent<HTMLInputElement>): void => {
        handleBisagrasQuantityChange({
            event,
            setBisagrasQuantity,
            alacenaProps: {
                setSelectedOption,
                selectedOption
            },
            excelData: excelData.bisagras,
        });
    };

    //cantidad del modulo total
    const handleQuantityChangeWrapper = (event: React.ChangeEvent<HTMLInputElement>): void => {
        handleQuantityChange(event, setQuantity);
    };

    //actualizacion de precio total
    const totalPriceWithQuantity = calculateTotalPrice(selectedOption, quantity);

    useEffect(() => {
        if (selectedOption.materialExterior.data.name.trim().length > 0) { //actualiamos materialExterior
            handleMaterialExterior({
                materialName: selectedOption.materialExterior.data.name,
                measurements,
                excelData: excelData.materiales,
                setSelectedOption,
                category: 'materialExterior',
                setSquareMeter,
                squareMeter
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
        if (selectedOption.fondo.data.name.trim().length > 0) { //  actualizamos fondo
            handleFondo({
                itemData: selectedOption.fondo.data.name,
                measurements,
                excelData: excelData.fondos,
                setSelectedOption,
                category: 'fondo',
                squareMeter,
                setSquareMeter
            });
        }
        if (selectedOption.estantes.data.name.trim().length > 0) { //Actualizo estantes
            handleCalculateShelfPrice({
                category: 'estantes',
                drawerQuantity: selectedOption.estantes.data.name !== "No" ? Number(selectedOption.estantes.data.name) : 0,
                measurements,
                setSelectedOption,
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
            materials: totalSquareMeters
        };

        // Limpiar los campos
        setModuleName('');
        setQuantity(1);
        setSelectedOption(initialSelectedOption);
        setMeasurements(undefined)
        setBisagrasQuantity(1)
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

    return <AlacenaComponent
        excelData={excelData}
        moduleName={moduleName}
        setModuleName={setModuleName}
        handleOptionSelect={handleOptionSelect}
        selectedOption={selectedOption}
        quantity={quantity}
        handleSaveOptions={handleSaveOptions}
        handleQuantityChangeWrapper={handleQuantityChangeWrapper}
        totalPriceWithQuantity={totalPriceWithQuantity}
        bisagrasQuantity={bisagrasQuantity}
        handleBisagrasQuantityChangeWrapper={handleBisagrasQuantityChangeWrapper}
        measurements={measurements ? true : false}
    />
}