import { ExcelDataInterface } from "@/types"
import { BajoMesadaExcelDataResponse, BajoMesadaInterface, BajoMesadaTypes } from "@/types/cocinaTypes"
import styles from "./BajoMesadaComponent.module.scss"
import SelectFieldComponent from "../SelectFieldComponent/SelectFieldComponent"
import TableSelectFieldsComponent from "../TableSelectFieldsComponent/TableSelectFieldsComponent"
import NameFieldComponent from "../NameFieldComponent/NameFieldComponent"

export default function BajoMesadaComponent({
    excelData,
    handleOptionSelect,
    selectedOption,
    handleSaveOptions,
    moduleName,
    setModuleName,
    quantity,
    handleQuantityChange,
    bisagrasQuantity,
    correderasQuantity,
    handleCorrederasQuantityChange,
    handleBisagrasQuantityChange,
    totalPriceWithQuantity,
    measurements,
}: {
    excelData: BajoMesadaExcelDataResponse,
    handleOptionSelect: (category: BajoMesadaTypes, itemData: ExcelDataInterface) => void,
    selectedOption: BajoMesadaInterface,
    handleSaveOptions: () => void,
    moduleName: string,
    setModuleName: Function,
    quantity: number,
    handleQuantityChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    bisagrasQuantity: number,
    correderasQuantity: number,
    handleCorrederasQuantityChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleBisagrasQuantityChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    totalPriceWithQuantity: number,
    measurements: boolean,
}) {
    return (
        <div className={styles["container-section-bajomesada"]}>
            <div className={styles["wrapper-column"]}>
                <NameFieldComponent moduleName={moduleName} setModuleName={setModuleName} />
                <SelectFieldComponent title="Medida" excelData={excelData.medidas}
                    isDisabled={true} showNumericInput={false}
                    bajoMesadaProps={{
                        selectedOption: selectedOption,
                        selectedOptionType: "medida",
                        handleOptionSelect: handleOptionSelect,
                    }} />
                <SelectFieldComponent title="Material exterior" excelData={excelData.materiales}
                    isDisabled={measurements} showNumericInput={false}
                    bajoMesadaProps={{
                        selectedOption: selectedOption,
                        selectedOptionType: "materialExterior",
                        handleOptionSelect: handleOptionSelect,
                    }} />
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Panel de cierre" excelData={excelData.panelDeCierre}
                        isDisabled={selectedOption.materialExterior.data.name.length > 0} showNumericInput={false}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "panelDeCierre",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Fondo" excelData={excelData.fondo}
                        isDisabled={selectedOption.panelDeCierre.data.name.length > 0} showNumericInput={false}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "fondo",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Patas" excelData={excelData.patas}
                        isDisabled={selectedOption.fondo.data.name.length > 0} showNumericInput={false}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "patas",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Zocalo" excelData={excelData.zocalo}
                        isDisabled={selectedOption.patas.data.name.length > 0} showNumericInput={false}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "zocalo",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                </div>
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Apertura" excelData={excelData.aperturas}
                        isDisabled={selectedOption.zocalo.data.name.length > 0} showNumericInput={false}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "apertura",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Piso metalico" excelData={excelData.pisoMetalico}
                        isDisabled={selectedOption.apertura.data.name.length > 0} showNumericInput={false}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "pisoMetalico",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                </div>
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Bisagras" excelData={excelData.bisagras}
                        inputQuantity={bisagrasQuantity} handleQuantityInputChange={handleBisagrasQuantityChange}
                        isDisabled={selectedOption.pisoMetalico.data.name.length > 0} showNumericInput={true}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "bisagras",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Correderas" excelData={excelData.correderas}
                        inputQuantity={correderasQuantity} handleQuantityInputChange={handleCorrederasQuantityChange}
                        isDisabled={selectedOption.bisagras.data.name.length > 0} showNumericInput={true}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "correderas",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                </div>
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Cubiertero" excelData={excelData.cubiertero}
                        isDisabled={selectedOption.correderas.data.name.length > 0} showNumericInput={false}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "cubiertero",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Carro esquinero" excelData={excelData.carroEsquinero}
                        isDisabled={selectedOption.cubiertero.data.name.length > 0} showNumericInput={false}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "carroEsquinero",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Carro especiero" excelData={excelData.carroEspeciero}
                        isDisabled={selectedOption.carroEsquinero.data.name.length > 0} showNumericInput={false}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "carroEspeciero",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                </div>
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Carro verdulero" excelData={excelData.carroVerdulero}
                        isDisabled={selectedOption.carroEspeciero.data.name.length > 0} showNumericInput={false}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "carroVerdulero",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Canasto verdulero" excelData={excelData.canastoVerdulero}
                        isDisabled={selectedOption.carroVerdulero.data.name.length > 0} showNumericInput={false}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "canastoVerdulero",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Tacho" excelData={excelData.tacho}
                        isDisabled={selectedOption.canastoVerdulero.data.name.length > 0} showNumericInput={false}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "tacho",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                </div>
                <TableSelectFieldsComponent quantity={quantity} moduleName={moduleName} handleSaveOptions={handleSaveOptions}
                    handleQuantityChange={handleQuantityChange} selectedOption={selectedOption} totalPriceWithQuantity={totalPriceWithQuantity} />
            </div>
        </div>
    )
}