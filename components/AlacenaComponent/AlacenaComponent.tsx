import { ExcelDataInterface } from "@/types"
import styles from "./AlacenaComponent.module.scss"
import NameFieldComponent from "../NameFieldComponent/NameFieldComponent"
import TableSelectFieldsComponent from "../TableSelectFieldsComponent/TableSelectFieldsComponent"
import { AlacenaExcelDataResponse, AlacenaInterface, AlacenaTypes } from "@/types/cocinaTypes"
import SelectFieldComponent from "../SelectFieldComponent/SelectFieldComponent"
import DividerComponent from "../DividerComponent/DividerComponent"

export default function AlacenaComponent({
    excelData,
    moduleName,
    setModuleName,
    handleOptionSelect,
    selectedOption,
    quantity,
    handleSaveOptions,
    handleQuantityChangeWrapper,
    totalPriceWithQuantity,
    bisagrasQuantity,
    handleBisagrasQuantityChangeWrapper,
    measurements
}: {
    excelData: AlacenaExcelDataResponse,
    moduleName: string,
    setModuleName: Function,
    handleOptionSelect: (category: AlacenaTypes, itemData: ExcelDataInterface) => void,
    selectedOption: AlacenaInterface,
    quantity: number,
    handleSaveOptions: () => void,
    handleQuantityChangeWrapper: (event: React.ChangeEvent<HTMLInputElement>) => void,
    totalPriceWithQuantity: number,
    bisagrasQuantity: number,
    handleBisagrasQuantityChangeWrapper: (event: React.ChangeEvent<HTMLInputElement>) => void,
    measurements: boolean
}) {
    return (
        <div className={styles["container-section-alacena"]}>
            <div className={styles["wrapper-column"]}>
                <NameFieldComponent moduleName={moduleName} setModuleName={setModuleName} />
                <DividerComponent title="DIMENSIONES" size="medium" />
                <SelectFieldComponent title="Medida" subTitle="( Ancho x Alto x Profundidad )" excelData={excelData.medidas}
                    isDisabled={true} showNumericInput={false}
                    alacenaProps={{
                        selectedOption: selectedOption,
                        selectedOptionType: "medida",
                        handleOptionSelect: handleOptionSelect,
                    }} />
                <DividerComponent title="MATERIALES Y FORMATO" size="medium" />
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Material exterior" excelData={excelData.materiales}
                        isDisabled={measurements} showNumericInput={false}
                        alacenaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "materialExterior",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                </div>
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Panel de cierre" excelData={excelData.panelDeCierre}
                        isDisabled={selectedOption.materialExterior.data.name.length > 0} showNumericInput={false}
                        alacenaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "panelDeCierre",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Fondo" excelData={excelData.fondos.slice(0, 2)}
                        isDisabled={selectedOption.panelDeCierre.data.name.length > 0} showNumericInput={false}
                        alacenaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "fondo",
                            handleOptionSelect: handleOptionSelect,
                        }} />

                </div>
                <DividerComponent title="PUERTAS" size="medium" />
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Rebatibles" subTitle="Precio del frente contemplado en material exterior" excelData={excelData.rebatibles}
                        isDisabled={selectedOption.fondo.data.name.length > 0} showNumericInput={false}
                        btnBlocked={selectedOption.batientes.data.name.trim().length > 0 && (selectedOption.batientes.data.name === "No" ? false : true)}
                        alacenaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "rebatibles",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Bisagras" excelData={excelData.bisagras}
                        inputQuantity={bisagrasQuantity} handleQuantityInputChange={handleBisagrasQuantityChangeWrapper}
                        isDisabled={selectedOption.rebatibles.data.name.length > 0} showNumericInput={true}
                        alacenaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "bisagras",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                </div>
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Batientes" subTitle="Precio del frente contemplado en material exterior" excelData={excelData.batientes}
                        isDisabled={selectedOption.bisagras.data.name.length > 0} showNumericInput={false}
                        btnBlocked={selectedOption.rebatibles.data.name === "No" ? false : true}
                        alacenaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "batientes",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Apertura" excelData={excelData.aperturas}
                        isDisabled={selectedOption.bisagras.data.name.length > 0} showNumericInput={false}
                        alacenaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "apertura",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                </div>
                <DividerComponent title="ACCESORIOS" size="medium" />
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Estantes" excelData={excelData.estantes}
                        isDisabled={selectedOption.apertura.data.name.length > 0} showNumericInput={true}
                        alacenaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "estantes",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Piston" excelData={excelData.piston}
                        isDisabled={selectedOption.estantes.data.name.length > 0} showNumericInput={false}
                        alacenaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "piston",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                </div>
                <DividerComponent title="SELECCIONES REALIZADAS" size="lg" />
                <TableSelectFieldsComponent quantity={quantity} moduleName={moduleName} handleSaveOptions={handleSaveOptions}
                    handleQuantityChange={handleQuantityChangeWrapper} selectedOption={selectedOption} totalPriceWithQuantity={totalPriceWithQuantity} />
            </div>
        </div>
    )
}