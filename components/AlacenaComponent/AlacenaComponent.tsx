import { ExcelDataInterface, MeasurementsInterface } from "@/types"
import styles from "./AlacenaComponent.module.scss"
import NameFieldComponent from "../NameFieldComponent/NameFieldComponent"
import TableSelectFieldsComponent from "../TableSelectFieldsComponent/TableSelectFieldsComponent"
import { AlacenaExcelDataResponse, AlacenaInterface, AlacenaTypes } from "@/types/cocinaTypes"
import SelectFieldComponent from "../SelectFieldComponent/SelectFieldComponent"
import DividerComponent from "../DividerComponent/DividerComponent"
import MeasureFieldComponent from "../MeasureFieldComponent/MeasureFieldComponent"

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
    measurements,
    handleMeasureChange,
    measurementSelected,
    subTitle
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
    measurements: MeasurementsInterface,
    handleMeasureChange: (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof MeasurementsInterface) => void,
    measurementSelected: boolean,
    subTitle?: string
}) {
    return (
        <div className={styles["container-section-alacena"]}>
            <div className={styles["wrapper-column"]}>
                <NameFieldComponent moduleName={moduleName} setModuleName={setModuleName} />
                <DividerComponent title="DIMENSIONES" size="medium" />
                <MeasureFieldComponent title="Medidas" subTitle={subTitle}
                    isDisabled={moduleName.trim().length > 0 ? false : true}
                    btnBlocked={selectedOption.materialExterior.data.name.length > 0}
                    measurements={measurements} handleMeasureChange={handleMeasureChange} />
                <DividerComponent title="MATERIALES Y FORMATO" size="medium" />
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Material exterior" excelData={excelData.materiales}
                        isDisabled={measurementSelected} showNumericInput={false}
                        btnBlocked={selectedOption.panelDeCierre.data.name.length > 0}
                        alacenaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "materialExterior",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                </div>
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Panel de cierre" excelData={excelData.panelDeCierre}
                        isDisabled={measurementSelected && selectedOption.materialExterior.data.name.length > 0} showNumericInput={false}
                        btnBlocked={selectedOption.cierreTecho.data.name.length > 0}
                        alacenaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "panelDeCierre",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Cierre techo" excelData={excelData.cierreTecho}
                        isDisabled={measurementSelected && selectedOption.panelDeCierre.data.name.length > 0} showNumericInput={false}
                        btnBlocked={selectedOption.fondo.data.name.length > 0}
                        alacenaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "cierreTecho",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Fondo" excelData={excelData.fondos.slice(0, 2)}
                        isDisabled={measurementSelected && selectedOption.cierreTecho.data.name.length > 0} showNumericInput={false}
                        alacenaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "fondo",
                            handleOptionSelect: handleOptionSelect,
                        }} />

                </div>
                <DividerComponent title="PUERTAS" size="medium" />
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Rebatibles" subTitle="Precio del frente contemplado en material exterior" excelData={excelData.rebatibles}
                        isDisabled={measurementSelected && selectedOption.fondo.data.name.length > 0} showNumericInput={false}
                        btnBlocked={selectedOption.bisagras.data.name.length > 0}
                        alacenaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "rebatibles",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Bisagras" excelData={excelData.bisagras}
                        inputQuantity={bisagrasQuantity} handleQuantityInputChange={handleBisagrasQuantityChangeWrapper}
                        isDisabled={measurementSelected && selectedOption.rebatibles.data.name.length > 0} showNumericInput={true}
                        btnBlocked={selectedOption.batientes.data.name.length > 0}
                        alacenaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "bisagras",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                </div>
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Batientes" subTitle="Precio del frente contemplado en material exterior" excelData={excelData.batientes}
                        isDisabled={measurementSelected && selectedOption.bisagras.data.name.length > 0} showNumericInput={false}
                        btnBlocked={selectedOption.apertura.data.name.length > 0}
                        alacenaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "batientes",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Apertura" excelData={excelData.aperturas}
                        isDisabled={measurementSelected && selectedOption.batientes.data.name.length > 0} showNumericInput={false}
                        btnBlocked={selectedOption.estantes.data.name.length > 0}
                        alacenaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "apertura",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                </div>
                <DividerComponent title="ACCESORIOS" size="medium" />
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Estantes" excelData={excelData.estantes}
                        isDisabled={measurementSelected && selectedOption.apertura.data.name.length > 0} showNumericInput={true}
                        btnBlocked={selectedOption.piston.data.name.length > 0}
                        alacenaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "estantes",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Piston" excelData={excelData.piston}
                        isDisabled={measurementSelected && selectedOption.estantes.data.name.length > 0} showNumericInput={false}
                        alacenaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "piston",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                </div>
                <DividerComponent title="SELECCIONES REALIZADAS" size="lg" />
                <TableSelectFieldsComponent quantity={quantity} moduleName={moduleName} handleSaveOptions={handleSaveOptions} measurements={measurements}
                    isDisabled={selectedOption.piston.data.name.length > 0 && selectedOption.piston.data.name !== ""} handleQuantityChange={handleQuantityChangeWrapper} selectedOption={selectedOption} totalPriceWithQuantity={totalPriceWithQuantity} />
            </div>
        </div>
    )
}