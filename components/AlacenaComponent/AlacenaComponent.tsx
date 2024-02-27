import { ExcelDataInterface } from "@/types"
import styles from "./AlacenaComponent.module.scss"
import NameFieldComponent from "../NameFieldComponent/NameFieldComponent"
import TableSelectFieldsComponent from "../TableSelectFieldsComponent/TableSelectFieldsComponent"
import { AlacenaExcelDataResponse, AlacenaInterface, AlacenaTypes } from "@/types/cocinaTypes"
import SelectFieldComponent from "../SelectFieldComponent/SelectFieldComponent"

export default function AlacenaComponent({
    excelData,
    moduleName,
    setModuleName,
    handleOptionSelect,
    selectedOption,
    quantity,
    handleSaveOptions,
    handleQuantityChange,
    totalPriceWithQuantity
}: {
    excelData: AlacenaExcelDataResponse,
    moduleName: string,
    setModuleName: Function,
    handleOptionSelect: (category: AlacenaTypes, itemData: ExcelDataInterface) => void,
    selectedOption: AlacenaInterface,
    quantity: number,
    handleSaveOptions: () => void,
    handleQuantityChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    totalPriceWithQuantity: number
}) {
    return (
        <div className={styles["container-section-alacena"]}>
            {/* <div className={styles["wrapper-column"]}>
                <NameFieldComponent moduleName={moduleName} setModuleName={setModuleName} />
                <SelectFieldComponent title="Medida" excelData={excelData.medidas}
                    alacenaProps={{
                        selectedOption: selectedOption,
                        selectedOptionType: "medida",
                        handleOptionSelect: handleOptionSelect,
                    }}
                />
                <SelectFieldComponent title="Material exterior" excelData={excelData.materiales}
                    alacenaProps={{
                        selectedOption: selectedOption,
                        selectedOptionType: "materialExterior",
                        handleOptionSelect: handleOptionSelect,
                    }}
                />
            </div> */}
            {/* <TableSelectFieldsComponent quantity={quantity} moduleName={moduleName} handleSaveOptions={handleSaveOptions}
                handleQuantityChange={handleQuantityChange} selectedOption={selectedOption} totalPriceWithQuantity={totalPriceWithQuantity} /> */}
        </div>
    )
}