import BajoMesadaComponent from "@/components/BajoMesadaComponent/BajoMesadaComponent";
import { UseSavedOptions } from "@/hook/UseSavedOptions";
import { ExcelDataInterface, MeasurementsInterface, SquareMetersInterface } from "@/types";
import { BajoMesadaExcelDataResponse, BajoMesadaInterface, BajoMesadaTypes } from "@/types/cocinaTypes";
import { OptionType, SaveOptionsInterface } from "@/types/reducer";
import {
    calculateTotalPrice, handleFondo, handleMaterialExterior, handleMeasureSelect, handleNumericInputChange, handlePanelDeCierre,
    handleZocalo, handleBisagrasQuantityChange, handleCorrederasQuantityChange, handleQuantityChange, handleCalculateDrawerPrice, handleCalculatePricePisoCajon
} from "@/utils/functions";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function BajoMesadaContainer({
    initialSelectedOption,
    excelData,
    optionType,
    moduleType
}: {
    initialSelectedOption: BajoMesadaInterface,
    excelData: BajoMesadaExcelDataResponse,
    optionType: OptionType,
    moduleType: string
}) {
    const [moduleName, setModuleName] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [measurements, setMeasurements] = useState<MeasurementsInterface | undefined>(undefined);
    const [selectedOption, setSelectedOption] = useState<BajoMesadaInterface>(initialSelectedOption);
    const [bisagrasQuantity, setBisagrasQuantity] = useState<number>(1);
    const [correderasQuantity, setCorrederasQuantity] = useState<number>(1);
    const [squareMeter, setSquareMeter] = useState<SquareMetersInterface[]>([])
    const { handleSaveOptionsChange } = UseSavedOptions();

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
                    price: parseFloat(itemData.price.toFixed(2))
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
                    excelData: excelData.materiales,
                    measurements,
                    setSelectedOption,
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
                        setSelectedOption,
                        excelData: excelData.fondos,
                        drawerQuantity: itemData.name !== "No" ? Number(itemData.name) : 0,
                        category: "pisoCajon",
                        setSquareMeter,
                        squareMeter
                    })
                }
            }
            if (category === "pisoCajon") {
                if (selectedOption.cajones.data.name.trim().length > 0) {
                    handleCalculatePricePisoCajon({
                        measurements,
                        itemData: itemData.name,
                        setSelectedOption,
                        excelData: excelData.fondos,
                        drawerQuantity: selectedOption.cajones.data.name !== "No" ? Number(selectedOption.cajones.data.name) : 0,
                        category,
                        setSquareMeter,
                        squareMeter
                    })
                }
            }
        }
        if (category === "bisagras") {
            handleNumericInputChange({
                quantity: bisagrasQuantity,
                itemData,
                excelData: excelData.bisagras,
                setSelectedOption,
                category
            });
        }
        if (category === "correderas") {
            handleNumericInputChange({
                quantity: correderasQuantity,
                itemData,
                excelData: excelData.correderas,
                setSelectedOption,
                category
            })
        }
    };
    //cantidad de bisagras
    const handleBisagrasQuantityChangeWrapper = (event: React.ChangeEvent<HTMLInputElement>): void => {
        handleBisagrasQuantityChange(event, setBisagrasQuantity, selectedOption, excelData.bisagras, setSelectedOption);
    };
    //cantidad de correderas
    const handleCorrederasQuantityChangeWrapper = (event: React.ChangeEvent<HTMLInputElement>): void => {
        handleCorrederasQuantityChange(event, setCorrederasQuantity, selectedOption, excelData.correderas, setSelectedOption);
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
                excelData: excelData.fondos,
                measurements,
                setSelectedOption,
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
                setSelectedOption,
                excelData: excelData.fondos,
                drawerQuantity: selectedOption.cajones.data.name !== "No" ? Number(selectedOption.cajones.data.name) : 0,
                category: "pisoCajon",
                setSquareMeter,
                squareMeter
            })
        }
    }, [measurements])

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
            materials: squareMeter
        };

        // Limpiar los campos
        setModuleName('');
        setQuantity(1);
        setSelectedOption(initialSelectedOption);
        setMeasurements(undefined)
        setBisagrasQuantity(1)
        setCorrederasQuantity(1)
        setSquareMeter([])
        // Llama a la función para guardar las opciones
        handleSaveOptionsChange(optionType, newData);
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
        measurements={measurements ? true : false}
        bisagrasQuantity={bisagrasQuantity}
        correderasQuantity={correderasQuantity}
        handleCorrederasQuantityChangeWrapper={handleCorrederasQuantityChangeWrapper}
        handleBisagrasQuantityChangeWrapper={handleBisagrasQuantityChangeWrapper}
    />
}