import { ExcelDataInterface, MeasurementsInterface } from '@/types';
import { AlacenaInterface, AlacenaTypes, BajoMesadaInterface, BajoMesadaTypes } from '@/types/cocinaTypes';
import { CategoryType, SelectedOptionType } from '@/types/reducer';

//conseguir el a,b,c
export const handleMeasureSelect = (
    itemData: ExcelDataInterface,
    setMeasurements: React.Dispatch<React.SetStateAction<MeasurementsInterface | undefined>>
): void => {
    if (itemData && itemData.name) {
        const [ancho, alto, profundidad] = itemData.name.split('x').map(val => parseFloat(val.trim()));
        setMeasurements({ ancho, alto, profundidad });
    }
};
//material exterior
export const handleMaterialExterior = ({
    materialName,
    measurements,
    excelData,
    setSelectedOption,
    category,
}: {
    materialName: string,
    measurements: MeasurementsInterface | undefined,
    excelData: ExcelDataInterface[],
    setSelectedOption: React.Dispatch<React.SetStateAction<any>>,
    category: CategoryType,
}): void => {
    if (!measurements) return;
    const { ancho, alto } = measurements;
    const selectedMaterial = excelData.find((material: ExcelDataInterface) => material.name === materialName);
    if (selectedMaterial) {
        let materialPrice = ancho * alto * selectedMaterial.price;
        materialPrice = parseFloat(materialPrice.toFixed(2));
        setSelectedOption((prevState: any) => ({
            ...prevState,
            [category]: {
                ...prevState[category],
                data: {
                    ...prevState[category].data,
                    price: materialPrice,
                },
            },
        }));
    }
};
//panel de cierre
export const handlePanelDeCierre = ({
    itemData,
    materialName,
    measurements,
    excelData,
    setSelectedOption,
    category,
}: {
    itemData: string,
    materialName: string,
    measurements: MeasurementsInterface | undefined,
    excelData: ExcelDataInterface[],
    setSelectedOption: React.Dispatch<React.SetStateAction<any>>,
    category: CategoryType,
}): void => {
    if (!measurements) return;
    const lateralSelection: number = itemData === "No" ? 0 : parseInt(itemData);
    const { alto, profundidad } = measurements;
    const selectedMaterial = excelData.find((material: ExcelDataInterface) => material.name === materialName);
    if (selectedMaterial) {
        let materialPrice = alto * profundidad * selectedMaterial.price;
        if (typeof lateralSelection === 'number') {
            if (lateralSelection > 1) {
                materialPrice = materialPrice * lateralSelection; //multiplica x 2
            }
            if (lateralSelection === 0) {
                materialPrice = 0;
            }
        }
        materialPrice = parseFloat(materialPrice.toFixed(2));
        setSelectedOption((prevState: any) => ({
            ...prevState,
            [category]: {
                ...prevState[category],
                data: {
                    ...prevState[category].data,
                    price: materialPrice,
                },
            },
        }));
    }
};
//fondo
export const handleFondo = ({
    itemData,
    measurements,
    excelData,
    setSelectedOption,
    category,
}: {
    itemData: string,
    measurements: MeasurementsInterface | undefined,
    excelData: ExcelDataInterface[],
    setSelectedOption: React.Dispatch<React.SetStateAction<any>>,
    category: CategoryType,
}): void => {
    if (!measurements) return;
    const { ancho, profundidad } = measurements;
    const materialPrice = itemData === "No" ? 0 : ((ancho * profundidad) * excelData[1].price) / excelData[1].meters!;

    setSelectedOption((prevState: any) => ({
        ...prevState,
        [category]: {
            ...prevState[category],
            data: {
                ...prevState[category].data,
                price: parseFloat(materialPrice.toFixed(2))
            },
        },
    }));
};
//zocalo
export const handleZocalo = ({
    itemData,
    measurements,
    excelData,
    setSelectedOption,
    category,
}: {
    itemData: string,
    measurements: MeasurementsInterface | undefined,
    excelData: ExcelDataInterface[],
    setSelectedOption: React.Dispatch<React.SetStateAction<any>>,
    category: keyof BajoMesadaInterface,
}): void => {
    if (!measurements) return;
    const { ancho } = measurements;
    const materialPrice = itemData === "No" ? 0 : (ancho * excelData[1].price) / excelData[1].meters!;

    setSelectedOption((prevState: any) => ({
        ...prevState,
        [category]: {
            ...prevState[category],
            data: {
                ...prevState[category].data,
                price: parseFloat(materialPrice.toFixed(2))
            },
        },
    }));
};
//puertas o cajones + input
export const handleNumericInputChange = ({
    quantity,
    itemData,
    excelData,
    setSelectedOption,
    category
}: {
    quantity: number,
    itemData: ExcelDataInterface,
    excelData: ExcelDataInterface[],
    setSelectedOption: React.Dispatch<React.SetStateAction<BajoMesadaInterface>>,
    category: BajoMesadaTypes
}): void => {
    if (itemData.name === "No") return;
    // Eliminar la parte de la cantidad del nombre
    const itemNameWithoutQuantity = itemData.name.split(' x')[0];

    // Encontrar el artículo específico dentro de excelData
    const selectedItem = excelData.find(data => data.name.startsWith(itemNameWithoutQuantity));

    if (!selectedItem) return;

    // Calcular el nuevo precio multiplicando el precio del artículo por la cantidad
    const newPrice = quantity * selectedItem.price;

    // Actualizar el nombre del artículo según la cantidad
    const updatedName = quantity > 1 ? `${selectedItem.name} x${quantity}` : selectedItem.name;

    // Actualizar el estado selectedOption con el nuevo precio
    setSelectedOption((prevState: BajoMesadaInterface) => ({
        ...prevState,
        [category]: {
            ...prevState[category],
            data: {
                ...prevState[category].data,
                name: updatedName,
                price: parseFloat(newPrice.toFixed(2))
            },
        },
    }));
};

//handle de handleQuantityChange ( calcula cuantos modulos )
export const handleQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setQuantity: React.Dispatch<React.SetStateAction<number>>
): void => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity > 1 ? newQuantity : 1);
};

// handle de handleBisagrasQuantityChange
export const handleBisagrasQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setBisagrasQuantity: React.Dispatch<React.SetStateAction<number>>,
    selectedOption: BajoMesadaInterface,
    excelData: ExcelDataInterface[],
    setSelectedOption: React.Dispatch<React.SetStateAction<BajoMesadaInterface>> // Agregar como argumento
): void => {
    const newQuantity = parseInt(event.target.value);
    const updatedQuantity = newQuantity > 1 ? newQuantity : 1;
    setBisagrasQuantity(updatedQuantity);
    // Llamar a la función handleNumericInputChange para actualizar el precio de las bisagras
    if (selectedOption.bisagras.data.name.trim().length > 0) {
        handleNumericInputChange({
            quantity: updatedQuantity,
            itemData: selectedOption.bisagras.data,
            excelData: excelData,
            setSelectedOption: setSelectedOption, // Propiedad necesaria aquí
            category: 'bisagras'
        });
    }
};
// handle de handleCorrederasQuantityChange 
export const handleCorrederasQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setCorrederasQuantity: React.Dispatch<React.SetStateAction<number>>,
    selectedOption: BajoMesadaInterface,
    excelData: ExcelDataInterface[],
    setSelectedOption: React.Dispatch<React.SetStateAction<BajoMesadaInterface>> // Agregar como argumento
): void => {
    const newQuantity = parseInt(event.target.value);
    const updatedQuantity = newQuantity > 1 ? newQuantity : 1;
    setCorrederasQuantity(updatedQuantity);
    // Validar si hay una selección de correderas y si es así, llamar a handleNumericInputChange
    if (selectedOption.correderas.data.name.trim().length > 0) {
        handleNumericInputChange({
            quantity: updatedQuantity,
            itemData: selectedOption.correderas.data,
            excelData: excelData,
            setSelectedOption: setSelectedOption, // Propiedad necesaria aquí
            category: 'correderas'
        });
    }
};

//cajones
export const handleCalculateDrawerPrice = (
    {
        measurements,
        drawerQuantity,
        excelData,
        setSelectedOption
    }: {
        setSelectedOption: React.Dispatch<React.SetStateAction<BajoMesadaInterface>>,
        measurements: MeasurementsInterface | undefined,
        drawerQuantity: number,
        excelData: ExcelDataInterface[]
    }
) => {
    if (!measurements) return
    const { ancho, profundidad } = measurements

    let alturaCajon = 0.1
    if (drawerQuantity === 2) { // si son 2 cajones
        alturaCajon = 0.25
    }

    // const tapaCajon = alto / Number(drawerQuantity);
    const separacionCajon = 0.1
    const largoCajon = ((profundidad - separacionCajon) * alturaCajon) * 2;
    const anchoCajon = (ancho * alturaCajon) * 2;
    const materialPrice = ((ancho * (profundidad - separacionCajon)) * excelData[1].price) / excelData[1].meters!;
    const totalPrice = /*tapaCajon +*/ largoCajon + anchoCajon + materialPrice;

    // Actualizar el precio de los cajones en el estado selectedOption
    setSelectedOption(prevState => ({
        ...prevState,
        cajones: {
            ...prevState.cajones,
            data: {
                ...prevState.cajones.data,
                price: parseFloat((totalPrice * Number(drawerQuantity)).toFixed(2))
            }
        }
    }));
};

//calcualr precio total de las selecciones
export const calculateTotalPrice = (selectedOption: SelectedOptionType, quantity: number) => {
    const totalPrice = Object.values(selectedOption).reduce((acc, curr) => acc + (typeof curr.data.price === 'number' ? curr.data.price : 0), 0);
    const totalPriceRounded = parseFloat((totalPrice * quantity).toFixed(2)); // Redondear a 2 decimales
    return totalPriceRounded;
};
