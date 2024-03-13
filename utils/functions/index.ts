import { ExcelDataInterface, MeasurementsInterface, SquareMetersInterface } from '@/types';
import { AlacenaInterface, AlacenaTypes, BajoMesadaInterface, BajoMesadaTypes, IslaInterface, IslaTypes } from '@/types/cocinaTypes';
import { CategoryType, SelectedOptionType } from '@/types/reducer';

//conseguir el a,b,c y actualizar squareMeter si corresponde
export const handleMeasureSelect = ({
    itemData,
    setMeasurements,
    squareMeter,
    setSquareMeter,
    category
}: {
    itemData: ExcelDataInterface,
    setMeasurements: React.Dispatch<React.SetStateAction<MeasurementsInterface | undefined>>,
    squareMeter: SquareMetersInterface[],
    setSquareMeter: React.Dispatch<React.SetStateAction<SquareMetersInterface[]>>,
    category: CategoryType
}): void => {
    if (itemData && itemData.name) {
        const [ancho, alto, profundidad] = itemData.name.split('x').map(val => parseFloat(val.trim()));
        setMeasurements({ ancho, alto, profundidad });

        // Actualizar squareMeter si corresponde
        const newSquareMeter: SquareMetersInterface = {
            sectionId: category,
            title: "Melamina blanca",
            amount: itemData.meters ? parseFloat((itemData.meters).toFixed(3)) : 0
        };

        // Llamar al handleSquareMeterChange para actualizar o agregar el objeto en squareMeter
        handleSquareMeterChange(newSquareMeter, squareMeter, setSquareMeter);
    }
};

//material exterior
export const handleMaterialExterior = ({
    materialName,
    measurements,
    excelData,
    setSelectedOption,
    category,
    squareMeter,
    setSquareMeter,
}: {
    materialName: string,
    measurements: MeasurementsInterface | undefined,
    excelData: ExcelDataInterface[],
    setSelectedOption: React.Dispatch<React.SetStateAction<any>>,
    category: CategoryType,
    squareMeter: SquareMetersInterface[],
    setSquareMeter: React.Dispatch<React.SetStateAction<SquareMetersInterface[]>>,
}): void => {
    if (!measurements) return;
    const { ancho, alto } = measurements;
    const selectedMaterial = excelData.find((material: ExcelDataInterface) => material.name === materialName);

    if (selectedMaterial) {
        // let materialPrice = ancho * alto * selectedMaterial.price;
        // materialPrice = parseFloat(materialPrice.toFixed(2));
        setSelectedOption((prevState: any) => ({
            ...prevState,
            [category]: {
                ...prevState[category],
                data: {
                    ...prevState[category].data,
                    price: 0, //materialPrice,
                },
            },
        }));

        // Llamar al handle de square meters
        const newSquareMeter: SquareMetersInterface = {
            sectionId: category,
            title: selectedMaterial.name,
            amount: ancho * alto
        };
        handleSquareMeterChange(newSquareMeter, squareMeter, setSquareMeter);
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
    squareMeter,
    setSquareMeter,
}: {
    itemData: string,
    materialName: string,
    measurements: MeasurementsInterface | undefined,
    excelData: ExcelDataInterface[],
    setSelectedOption: React.Dispatch<React.SetStateAction<any>>,
    category: CategoryType,
    squareMeter: SquareMetersInterface[],
    setSquareMeter: React.Dispatch<React.SetStateAction<SquareMetersInterface[]>>,
}): void => {
    if (!measurements) return;
    const lateralSelection: number = itemData === "No" ? 0 : parseInt(itemData);
    const { alto, profundidad } = measurements;
    const selectedMaterial = excelData.find((material: ExcelDataInterface) => material.name === materialName);

    if (selectedMaterial) {
        // let materialPrice = alto * profundidad * selectedMaterial.price;
        // if (typeof lateralSelection === 'number') {
        //     if (lateralSelection > 1) {
        //         materialPrice = materialPrice * lateralSelection;
        //     }
        //     if (lateralSelection === 0) {
        //         materialPrice = 0;
        //     }
        // }
        // materialPrice = parseFloat(materialPrice.toFixed(2));
        setSelectedOption((prevState: any) => ({
            ...prevState,
            [category]: {
                ...prevState[category],
                data: {
                    ...prevState[category].data,
                    price: 0, //materialPrice,
                },
            },
        }));
        // Llamar al handle de square meters
        const newSquareMeter: SquareMetersInterface = {
            sectionId: category,
            title: selectedMaterial.name,
            amount: parseFloat((alto * profundidad * lateralSelection).toFixed(3))
        };
        handleSquareMeterChange(newSquareMeter, squareMeter, setSquareMeter);
    }
};
//fondo
export const handleFondo = ({
    itemData,
    measurements,
    excelData,
    setSelectedOption,
    category,
    squareMeter,
    setSquareMeter,
}: {
    itemData: string,
    measurements: MeasurementsInterface | undefined,
    excelData: ExcelDataInterface[],
    setSelectedOption: React.Dispatch<React.SetStateAction<any>>,
    category: CategoryType,
    squareMeter: SquareMetersInterface[],
    setSquareMeter: React.Dispatch<React.SetStateAction<SquareMetersInterface[]>>,
}): void => {
    if (!measurements) return;
    const { ancho, alto } = measurements;
    // const materialPrice = itemData === "No" ? 0 : (ancho * alto * excelData[1].price);

    setSelectedOption((prevState: any) => ({
        ...prevState,
        [category]: {
            ...prevState[category],
            data: {
                ...prevState[category].data,
                price: 0,//parseFloat(materialPrice.toFixed(2))
            },
        },
    }));

    // Llamar al handle de square meters
    const newSquareMeter: SquareMetersInterface = {
        sectionId: category,
        title: itemData,
        amount: parseFloat((ancho * alto).toFixed(3))
    };
    handleSquareMeterChange(newSquareMeter, squareMeter, setSquareMeter);
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
//puertas o cajones + input => bisagras / correderas
export const handleNumericInputChange = ({
    quantity,
    itemData,
    excelData,
    bajoMesadaProps,
    alacenaProps,
    islaProps
}: {
    quantity: number,
    itemData: ExcelDataInterface,
    excelData: ExcelDataInterface[],
    bajoMesadaProps?: {
        category: BajoMesadaTypes,
        setSelectedOption: React.Dispatch<React.SetStateAction<BajoMesadaInterface>>,
    },
    alacenaProps?: {
        category: AlacenaTypes,
        setSelectedOption: React.Dispatch<React.SetStateAction<AlacenaInterface>>,
    },
    islaProps?: {
        category: IslaTypes,
        setSelectedOption: React.Dispatch<React.SetStateAction<IslaInterface>>,
    }
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

    if (bajoMesadaProps) {
        // Actualizar el estado selectedOption con el nuevo precio => BAJOME SADA
        bajoMesadaProps.setSelectedOption((prevState: BajoMesadaInterface) => ({
            ...prevState,
            [bajoMesadaProps.category]: {
                ...prevState[bajoMesadaProps.category],
                data: {
                    ...prevState[bajoMesadaProps.category].data,
                    name: updatedName,
                    price: parseFloat(newPrice.toFixed(2))
                },
            },
        }));
    }
    if (alacenaProps) {
        // Actualizar el estado selectedOption con el nuevo precio => ALACENA
        alacenaProps.setSelectedOption((prevState: AlacenaInterface) => ({
            ...prevState,
            [alacenaProps.category]: {
                ...prevState[alacenaProps.category],
                data: {
                    ...prevState[alacenaProps.category].data,
                    name: updatedName,
                    price: parseFloat(newPrice.toFixed(2))
                },
            },
        }));
    }
    if (islaProps) {
        // Actualizar el estado selectedOption con el nuevo precio => ISLA
        islaProps.setSelectedOption((prevState: IslaInterface) => ({
            ...prevState,
            [islaProps.category]: {
                ...prevState[islaProps.category],
                data: {
                    ...prevState[islaProps.category].data,
                    name: updatedName,
                    price: parseFloat(newPrice.toFixed(2))
                },
            },
        }));
    }
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
export const handleBisagrasQuantityChange = ({
    event,
    setBisagrasQuantity,
    excelData,
    bajoMesadaProps,
    alacenaProps,
    islaProps
}: {
    event: React.ChangeEvent<HTMLInputElement>,
    setBisagrasQuantity: React.Dispatch<React.SetStateAction<number>>,
    excelData: ExcelDataInterface[],
    bajoMesadaProps?: {
        selectedOption: BajoMesadaInterface,
        setSelectedOption: React.Dispatch<React.SetStateAction<BajoMesadaInterface>>,
    },
    alacenaProps?: {
        selectedOption: AlacenaInterface,
        setSelectedOption: React.Dispatch<React.SetStateAction<AlacenaInterface>>,
    },
    islaProps?: {
        selectedOption: IslaInterface,
        setSelectedOption: React.Dispatch<React.SetStateAction<IslaInterface>>,
    }
}): void => {
    const newQuantity = parseInt(event.target.value);
    const updatedQuantity = newQuantity > 1 ? newQuantity : 1;
    setBisagrasQuantity(updatedQuantity);
    // Llamar a la función handleNumericInputChange para actualizar el precio de las bisagras BAJO MESADA
    if (bajoMesadaProps) {
        if (bajoMesadaProps.selectedOption.bisagras.data.name.trim().length > 0) {
            handleNumericInputChange({
                quantity: updatedQuantity,
                itemData: bajoMesadaProps.selectedOption.bisagras.data,
                excelData: excelData,
                bajoMesadaProps: {
                    setSelectedOption: bajoMesadaProps.setSelectedOption,
                    category: 'bisagras'
                },
            });
        }
    };
    if (alacenaProps) {
        if (alacenaProps.selectedOption.bisagras.data.name.trim().length > 0) {
            handleNumericInputChange({
                quantity: updatedQuantity,
                itemData: alacenaProps.selectedOption.bisagras.data,
                excelData: excelData,
                alacenaProps: {
                    setSelectedOption: alacenaProps.setSelectedOption,
                    category: 'bisagras'
                },
            });
        }
    }
    if (islaProps) {
        if (islaProps.selectedOption.bisagras.data.name.trim().length > 0) {
            handleNumericInputChange({
                quantity: updatedQuantity,
                itemData: islaProps.selectedOption.bisagras.data,
                excelData: excelData,
                islaProps: {
                    setSelectedOption: islaProps.setSelectedOption,
                    category: 'bisagras'
                },
            });
        }
    }
};
// handle de handleCorrederasQuantityChange 
export const handleCorrederasQuantityChange = ({
    event,
    setCorrederasQuantity,
    // selectedOption,
    excelData,
    // setSelectedOption,
    bajoMesadaProps,
    islaProps
}: {
    event: React.ChangeEvent<HTMLInputElement>,
    setCorrederasQuantity: React.Dispatch<React.SetStateAction<number>>,
    excelData: ExcelDataInterface[],
    bajoMesadaProps?: {
        selectedOption: BajoMesadaInterface,
        setSelectedOption: React.Dispatch<React.SetStateAction<BajoMesadaInterface>> // Agregar como argumento
    },
    islaProps?: {
        selectedOption: IslaInterface,
        setSelectedOption: React.Dispatch<React.SetStateAction<IslaInterface>> // Agregar como argumento
    }
}): void => {
    const newQuantity = parseInt(event.target.value);
    const updatedQuantity = newQuantity > 1 ? newQuantity : 1;
    setCorrederasQuantity(updatedQuantity);
    // Validar si hay una selección de correderas y si es así, llamar a handleNumericInputChange
    if (bajoMesadaProps) {
        if (bajoMesadaProps.selectedOption.correderas.data.name.trim().length > 0) {
            handleNumericInputChange({
                quantity: updatedQuantity,
                itemData: bajoMesadaProps.selectedOption.correderas.data,
                excelData: excelData,
                bajoMesadaProps: {
                    setSelectedOption: bajoMesadaProps.setSelectedOption,
                    category: 'correderas'
                },
            });
        }
    }
    if (islaProps) {
        if (islaProps.selectedOption.correderas.data.name.trim().length > 0) {
            handleNumericInputChange({
                quantity: updatedQuantity,
                itemData: islaProps.selectedOption.correderas.data,
                excelData: excelData,
                islaProps: {
                    setSelectedOption: islaProps.setSelectedOption,
                    category: 'correderas'
                },
            });
        }
    }
};

//cajones
export const handleCalculateDrawerPrice = ({
    measurements,
    drawerQuantity,
    // excelData,
    // setSelectedOption,
    squareMeter,
    setSquareMeter,
    category,
    bajoMesadaProps,
    islaProps
}: {
    bajoMesadaProps?: {
        setSelectedOption: React.Dispatch<React.SetStateAction<BajoMesadaInterface>>,
    },
    islaProps?: {
        setSelectedOption: React.Dispatch<React.SetStateAction<IslaInterface>>,
    },
    measurements: MeasurementsInterface | undefined,
    drawerQuantity: number,
    // excelData: ExcelDataInterface[],
    squareMeter: SquareMetersInterface[],
    setSquareMeter: React.Dispatch<React.SetStateAction<SquareMetersInterface[]>>,
    category: BajoMesadaTypes
}) => {
    if (!measurements) return
    const { ancho, profundidad } = measurements

    const separacionCajon = 0.1;

    let alturaCajon = 0.1;
    if (drawerQuantity === 2) {
        alturaCajon = 0.25;
    }
    const largoCajon = (profundidad - separacionCajon) * alturaCajon * 2;
    const anchoCajon = (ancho * alturaCajon) * 2;

    // let totalPrice = 0;

    // if (drawerQuantity !== 0) {
    //     totalPrice = (largoCajon + anchoCajon) * excelData[0].price; // exceldata[1] => melamina blanca posicion cero
    // }
    if (bajoMesadaProps) {
        bajoMesadaProps.setSelectedOption(prevState => ({
            ...prevState,
            [category]: {
                ...prevState[category],
                data: {
                    ...prevState[category].data,
                    price: 0 // parseFloat((totalPrice * Number(drawerQuantity)).toFixed(2))
                }
            }
        }));
    }
    if (islaProps) {
        islaProps.setSelectedOption(prevState => ({
            ...prevState,
            [category]: {
                ...prevState[category],
                data: {
                    ...prevState[category].data,
                    price: 0 // parseFloat((totalPrice * Number(drawerQuantity)).toFixed(2))
                }
            }
        }));
    }

    // Llamar al handle de square meters
    const newSquareMeter: SquareMetersInterface = {
        sectionId: category,
        title: 'Melamina blanca',
        amount: drawerQuantity === 0 ? 0 : parseFloat(((largoCajon + anchoCajon) * Number(drawerQuantity)).toFixed(3))
    };
    handleSquareMeterChange(newSquareMeter, squareMeter, setSquareMeter);
};

//piso cajon
export const handleCalculatePricePisoCajon = ({
    // setSelectedOption,
    measurements,
    excelData,
    drawerQuantity,
    category,
    itemData,
    squareMeter,
    setSquareMeter,
    bajoMesadaProps,
    islaProps
}: {
    bajoMesadaProps?: {
        setSelectedOption: React.Dispatch<React.SetStateAction<BajoMesadaInterface>>,
    },
    islaProps?: {
        setSelectedOption: React.Dispatch<React.SetStateAction<IslaInterface>>,
    },
    measurements: MeasurementsInterface | undefined,
    excelData: ExcelDataInterface[]
    drawerQuantity: number,
    category: BajoMesadaTypes,
    itemData: string,
    squareMeter: SquareMetersInterface[],
    setSquareMeter: React.Dispatch<React.SetStateAction<SquareMetersInterface[]>>,
}) => {
    if (!measurements) return
    const { ancho, profundidad } = measurements
    const selectedMaterial = excelData.find((material: ExcelDataInterface) => material.name === itemData);

    if (selectedMaterial) {
        // const totalPrice = (ancho * profundidad) * selectedMaterial.price;
        if (bajoMesadaProps) {
            bajoMesadaProps.setSelectedOption((prevState: any) => ({
                ...prevState,
                [category]: {
                    ...prevState[category],
                    data: {
                        ...prevState[category].data,
                        price: 0 //parseFloat((totalPrice * drawerQuantity).toFixed(2))
                        ,
                    },
                },
            }));
        }

        // Llamar al handle de square meters
        const newSquareMeter: SquareMetersInterface = {
            sectionId: category,
            title: selectedMaterial.name,
            amount: parseFloat((ancho * profundidad * drawerQuantity).toFixed(3))
        };
        handleSquareMeterChange(newSquareMeter, squareMeter, setSquareMeter);
    }
    return
}

// Manejar cambios en los metros cuadrados
export const handleSquareMeterChange = (
    newSquareMeter: SquareMetersInterface,
    squareMeter: SquareMetersInterface[],
    setSquareMeter: React.Dispatch<React.SetStateAction<SquareMetersInterface[]>>
): void => {
    // Verificar si ya existe un objeto con el mismo sectionId
    const existingIndex = squareMeter.findIndex(item => item.sectionId === newSquareMeter.sectionId);

    // Si la cantidad es 0 o se selecciona "No", eliminar el objeto correspondiente
    if (newSquareMeter.amount === 0 || newSquareMeter.title === "No") {
        // Filtrar el arreglo para eliminar el objeto con el sectionId correspondiente
        const updatedSquareMeter = squareMeter.filter(item => item.sectionId !== newSquareMeter.sectionId);
        // Actualizar el estado con el nuevo arreglo sin el objeto eliminado
        setSquareMeter(updatedSquareMeter);
    } else {
        // Si ya existe, actualizamos los metros cuadrados
        if (existingIndex !== -1) {
            setSquareMeter(prevState => {
                const updatedSquareMeter = [...prevState];
                updatedSquareMeter[existingIndex] = newSquareMeter;
                return updatedSquareMeter;
            });
        } else {
            // Si no existe, agregamos un nuevo objeto al arreglo
            setSquareMeter(prevState => [...prevState, newSquareMeter]);
        }
    }
};

//apertura
export const handleQuantityApertura = ({
    drawerQuantity,
    // setSelectedOption,
    category,
    itemData,
    excelData,
    bajoMesadaProps,
    alacenaProps,
    islaProps
}: {
    drawerQuantity: number,
    category: CategoryType,
    itemData: ExcelDataInterface,
    excelData: ExcelDataInterface[],
    bajoMesadaProps?: {
        setSelectedOption: React.Dispatch<React.SetStateAction<BajoMesadaInterface>>,
    },
    alacenaProps?: {
        setSelectedOption: React.Dispatch<React.SetStateAction<AlacenaInterface>>,
    },
    islaProps?: {
        setSelectedOption: React.Dispatch<React.SetStateAction<IslaInterface>>,
    }
}) => {
    const selectedMaterial = excelData.find((material: ExcelDataInterface) => material.name === itemData.name);
    if (selectedMaterial) {
        if (bajoMesadaProps) {
            bajoMesadaProps.setSelectedOption((prevState: any) => ({
                ...prevState,
                [category]: {
                    ...prevState[category],
                    data: {
                        ...prevState[category].data,
                        price: parseFloat((selectedMaterial.price * drawerQuantity).toFixed(3))
                        ,
                    },
                },
            }));
        };
        if (alacenaProps) {
            alacenaProps.setSelectedOption((prevState: any) => ({
                ...prevState,
                [category]: {
                    ...prevState[category],
                    data: {
                        ...prevState[category].data,
                        price: parseFloat((selectedMaterial.price * drawerQuantity).toFixed(3))
                        ,
                    },
                },
            }));
        }
        if (islaProps) {
            islaProps.setSelectedOption((prevState: any) => ({
                ...prevState,
                [category]: {
                    ...prevState[category],
                    data: {
                        ...prevState[category].data,
                        price: parseFloat((selectedMaterial.price * drawerQuantity).toFixed(3))
                        ,
                    },
                },
            }));
        }
    }
}

//estantes
export const handleCalculateShelfPrice = ({
    measurements,
    drawerQuantity,
    setSelectedOption,
    category,
    squareMeter,
    setSquareMeter
}: {
    measurements: MeasurementsInterface | undefined,
    drawerQuantity: number,
    setSelectedOption: React.Dispatch<React.SetStateAction<AlacenaInterface>>,
    category: AlacenaTypes,
    squareMeter: SquareMetersInterface[],
    setSquareMeter: React.Dispatch<React.SetStateAction<SquareMetersInterface[]>>,
}) => {
    if (!measurements) return
    const { ancho, profundidad } = measurements

    setSelectedOption(prevState => ({
        ...prevState,
        [category]: {
            ...prevState[category],
            data: {
                ...prevState[category].data,
                price: 0 // parseFloat((totalPrice * Number(drawerQuantity)).toFixed(2))
            }
        }
    }));

    // Llamar al handle de square meters
    const newSquareMeter: SquareMetersInterface = {
        sectionId: category,
        title: 'Melamina blanca',
        amount: drawerQuantity === 0 ? 0 : parseFloat(((ancho * profundidad) * Number(drawerQuantity)).toFixed(3))
    };
    handleSquareMeterChange(newSquareMeter, squareMeter, setSquareMeter);
}

//calcualr precio total de las selecciones
export const calculateTotalPrice = (selectedOption: SelectedOptionType, quantity: number) => {
    const totalPrice = Object.values(selectedOption).reduce((acc, curr) => acc + (typeof curr.data.price === 'number' ? curr.data.price : 0), 0);
    const totalPriceRounded = parseFloat((totalPrice * quantity).toFixed(2)); // Redondear a 2 decimales
    return totalPriceRounded;
};

//calcualr precio total de las selecciones
export const calculateTotalPriceM2 = (selectedOption: SelectedOptionType, squareMeters: { [key: string]: { amount: number, placas: number, price: number } }, quantity: number) => {
    // Calcular el precio total de las selecciones
    const totalPriceSelections = Object.values(selectedOption).reduce((acc, curr) => acc + (typeof curr.data.price === 'number' ? curr.data.price : 0), 0);

    // Calcular el precio total de los metros cuadrados
    const totalPriceSquareMeters = Object.values(squareMeters).reduce((acc, curr) => acc + curr.price, 0);

    // Calcular el precio total incluyendo la cantidad
    const totalPrice = totalPriceSelections + totalPriceSquareMeters;
    const totalPriceWithQuantity = parseFloat((totalPrice * quantity).toFixed(2)); // Redondear a 2 decimales

    return totalPriceWithQuantity;
};