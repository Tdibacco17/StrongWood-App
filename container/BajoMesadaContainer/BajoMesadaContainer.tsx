import BajoMesadaComponent from "@/components/BajoMesadaComponent/BajoMesadaComponent";
import { UseSavedOptions } from "@/hook/UseSavedOptions";
import { ExcelDataInterface, MeasurementsInterface } from "@/types";
import { BajoMesadaExcelDataResponse, BajoMesadaInterface, BajoMesadaTypes, DrawerType } from "@/types/cocinaTypes";
import { OptionType, SaveOptionsInterface } from "@/types/reducer";
import { calculateTotalPrice, handleFondo, handleMaterialExterior, handleMeasureSelect, handleNumericInputChange, handlePanelDeCierre, handleZocalo } from "@/utils/functions";
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

    const handleBisagrasQuantityChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newQuantity = parseInt(event.target.value);
        const updatedQuantity = newQuantity > 1 ? newQuantity : 1;
        setBisagrasQuantity(updatedQuantity);
        // Llamar a la función handleNumericInputChange para actualizar el precio de las bisagras
        if (selectedOption.bisagras.data.name.trim().length > 0) {
            handleNumericInputChange({
                quantity: updatedQuantity,
                itemData: selectedOption.bisagras.data,
                excelData: excelData.bisagras,
                setSelectedOption,
                category: 'bisagras'
            });
        }
    };

    const handleCorrederasQuantityChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newQuantity = parseInt(event.target.value);
        const updatedQuantity = newQuantity > 1 ? newQuantity : 1;
        setCorrederasQuantity(updatedQuantity);
        // Validar si hay una selección de correderas y si es así, llamar a handleNumericInputChange
        if (selectedOption.correderas.data.name.trim().length > 0) {
            handleNumericInputChange({
                quantity: updatedQuantity,
                itemData: selectedOption.correderas.data,
                excelData: excelData.correderas,
                setSelectedOption,
                category: 'correderas'
            });
        }
    };

    const { handleSaveOptionsChange } = UseSavedOptions();

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
            handleMeasureSelect(itemData, setMeasurements);
        }
        if (measurements) {
            if (category === 'materialExterior') {
                handleMaterialExterior({
                    materialName: itemData.name,
                    measurements,
                    excelData: excelData.materiales,
                    setSelectedOption,
                    category
                })
                if (selectedOption.panelDeCierre.data.name.trim().length > 0) { // actualizamos panel de cierre
                    handlePanelDeCierre({
                        itemData: itemData.name,
                        materialName: itemData.name,
                        measurements,
                        excelData: excelData.materiales,
                        setSelectedOption,
                        category: 'panelDeCierre'
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
                    category
                });
            }
            if (category === 'fondo') {
                handleFondo({
                    itemData: itemData.name,
                    measurements,
                    excelData: excelData.fondo,
                    setSelectedOption,
                    category,
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

    const handleQuantityChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const newQuantity = parseInt(event.target.value);
        setQuantity(newQuantity > 1 ? newQuantity : 1);
    };
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
            totalPrice: calculateTotalPrice(selectedOption, quantity), // Asegúrate de importar esta función
            quantity,
            moduleData: { ...selectedOption },
        };

        // Limpiar los campos
        setModuleName('');
        setQuantity(1);
        setSelectedOption(initialSelectedOption);
        setMeasurements(undefined)
        // Llama a la función para guardar las opciones
        handleSaveOptionsChange(optionType, newData);
        toast.success("MODULO CREADO CORRECTAMENTE.", {
            duration: 3000,
        })
        return;
    };

    const totalPriceWithQuantity = calculateTotalPrice(selectedOption, quantity);

    useEffect(() => {
        if (selectedOption.materialExterior.data.name.trim().length > 0) { //actualiamos materialExterior
            handleMaterialExterior({
                materialName: selectedOption.materialExterior.data.name,
                measurements,
                excelData: excelData.materiales,
                setSelectedOption,
                category: 'materialExterior'
            })
        }
        if (selectedOption.panelDeCierre.data.name.trim().length > 0) { // actualizamos panel de cierre
            handlePanelDeCierre({
                itemData: selectedOption.panelDeCierre.data.name,
                materialName: selectedOption.materialExterior.data.name,
                measurements,
                excelData: excelData.materiales,
                setSelectedOption,
                category: 'panelDeCierre'
            });
        }
        if (selectedOption.fondo.data.name.trim().length > 0) { //  actualizamos fondo
            handleFondo({
                itemData: selectedOption.fondo.data.name,
                measurements,
                excelData: excelData.fondo,
                setSelectedOption,
                category: 'fondo',
            });
        }
        if (selectedOption.zocalo.data.name.trim().length > 0) {
            handleZocalo({
                itemData: selectedOption.zocalo.data.name,
                measurements,
                excelData: excelData.zocalo,
                setSelectedOption,
                category: 'zocalo',
            });
        }
    }, [measurements])

    return <BajoMesadaComponent
        handleOptionSelect={handleOptionSelect}
        handleQuantityChange={handleQuantityChange}
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
        handleCorrederasQuantityChange={handleCorrederasQuantityChange}
        handleBisagrasQuantityChange={handleBisagrasQuantityChange}
    />
}