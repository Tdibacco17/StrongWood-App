import { ExcelDataInterface } from "@/types";
import styles from "./SelectFieldComponent.module.scss"
import { Button } from "../ui/button";
import { AlacenaInterface, AlacenaTypes, BajoMesadaInterface, BajoMesadaTypes } from "@/types/cocinaTypes";
import { Input } from "../ui/input";

export default function SelectFieldComponent({
    excelData,
    inputQuantity,
    handleQuantityInputChange,
    bajoMesadaProps,
    // alacenaProps,
    title,
    subTitle,
    isDisabled,
    showNumericInput,
    btnBlocked
}: {
    excelData?: ExcelDataInterface[]; // Marcar excelData como opcional
    inputQuantity?: number,
    handleQuantityInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    bajoMesadaProps: {
        handleOptionSelect: (category: BajoMesadaTypes, itemData: ExcelDataInterface) => void;
        selectedOption: BajoMesadaInterface;
        selectedOptionType: BajoMesadaTypes;
    };
    // alacenaProps?: {
    //     handleOptionSelect: (category: AlacenaTypes, itemData: ExcelDataInterface) => void;
    //     selectedOption: AlacenaInterface;
    //     selectedOptionType: AlacenaTypes;
    // };
    title: string;
    subTitle?: string,
    isDisabled: boolean,
    showNumericInput: boolean,
    btnBlocked?: boolean
}) {

    const isOptionSelected = (itemData: ExcelDataInterface) => {
        if (bajoMesadaProps) {
            const selectedItemName = bajoMesadaProps.selectedOption[bajoMesadaProps.selectedOptionType]?.data?.name;
            return selectedItemName && selectedItemName.startsWith(itemData.name);
        }
        //  else if (alacenaProps) {
        //     const selectedItemName = alacenaProps.selectedOption[alacenaProps.selectedOptionType]?.data?.name;
        //     return selectedItemName && selectedItemName.startsWith(itemData.name);
        // }
        return false;
    };
    const handleOptionSelect = (category: BajoMesadaTypes | AlacenaTypes, itemData: ExcelDataInterface) => {
        if (bajoMesadaProps) {
            bajoMesadaProps.handleOptionSelect(category as BajoMesadaTypes, itemData);
        }
        // else if (alacenaProps) {
        //     alacenaProps.handleOptionSelect(category as AlacenaTypes, itemData);
        // }
    };

    // Verificar si excelData está definido antes de usarlo
    if (!excelData) return null;

    return (
        <div className={styles["container-select-field"]}>
            <div className={styles["wrapper"]}>
                <div>
                    <p className={`${!isDisabled ? "opacity-50" : ""}`}>{title}</p>
                    {subTitle &&
                        <p className={`${!isDisabled ? "opacity-50" : ""} text-sm text-muted-foreground`}>{subTitle}</p>}
                </div>
                {showNumericInput && inputQuantity && handleQuantityInputChange &&
                    <Input
                        disabled={!isDisabled}
                        type="number"
                        value={inputQuantity.toString()}
                        onChange={handleQuantityInputChange}
                        className={`w-16 ${inputQuantity !== 1 ? styles["active"] : ""}`}
                    />
                }
            </div>
            <div className={styles["options"]}>
                {excelData.map((itemData: ExcelDataInterface, index: number) => (
                    <Button
                        disabled={!isDisabled ||( btnBlocked && index !== 0)}
                        variant="secondary"
                        key={index}
                        onClick={() => handleOptionSelect(
                            // bajoMesadaProps ?
                            bajoMesadaProps.selectedOptionType
                            // : alacenaProps?.selectedOptionType
                            // ?? "medida",
                            , itemData)}
                        className={`${styles["btn-custom"]} ${isOptionSelected(itemData) ? styles["btn-active"] : ""}`}
                    >
                        {itemData.name}
                    </Button>
                ))}
            </div>
        </div>
    );
}
