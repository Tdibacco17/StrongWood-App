import { ExcelDataInterface, SquareMetersInterface } from "@/types"
import { BajoMesadaExcelDataResponse, BajoMesadaInterface, BajoMesadaTypes } from "@/types/cocinaTypes"
import styles from "./BajoMesadaComponent.module.scss"
import SelectFieldComponent from "../SelectFieldComponent/SelectFieldComponent"
import TableSelectFieldsComponent from "../TableSelectFieldsComponent/TableSelectFieldsComponent"
import NameFieldComponent from "../NameFieldComponent/NameFieldComponent"
import DividerComponent from "../DividerComponent/DividerComponent"

export default function BajoMesadaComponent({
    excelData,
    handleOptionSelect,
    selectedOption,
    handleSaveOptions,
    moduleName,
    setModuleName,
    quantity,
    handleQuantityChangeWrapper,
    bisagrasQuantity,
    correderasQuantity,
    handleCorrederasQuantityChangeWrapper,
    handleBisagrasQuantityChangeWrapper,
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
    handleQuantityChangeWrapper: (event: React.ChangeEvent<HTMLInputElement>) => void,
    bisagrasQuantity: number,
    correderasQuantity: number,
    handleCorrederasQuantityChangeWrapper: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleBisagrasQuantityChangeWrapper: (event: React.ChangeEvent<HTMLInputElement>) => void,
    totalPriceWithQuantity: number,
    measurements: boolean,
}) {
    return (
        <div className={styles["container-section-bajomesada"]}>
            <div className={styles["wrapper-column"]}>
                <NameFieldComponent moduleName={moduleName} setModuleName={setModuleName} />
                <DividerComponent title="DIMENSIONES" size="medium" />
                <SelectFieldComponent title="Medida" subTitle="( Ancho x Alto x Profundidad )" excelData={excelData.medidas}
                    isDisabled={true} showNumericInput={false}
                    bajoMesadaProps={{
                        selectedOption: selectedOption,
                        selectedOptionType: "medida",
                        handleOptionSelect: handleOptionSelect,
                    }} />
                <DividerComponent title="MATERIALES Y FORMATO" size="medium" />
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Material exterior" excelData={excelData.materiales}
                        isDisabled={measurements} showNumericInput={false}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "materialExterior",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                </div>
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Panel de cierre" excelData={excelData.panelDeCierre}
                        isDisabled={selectedOption.materialExterior.data.name.length > 0} showNumericInput={false}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "panelDeCierre",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Fondo" excelData={excelData.fondos.slice(0, 2)}
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
                <DividerComponent title="CAJON O PUERTAS" size="medium" />
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Puertas" subTitle="Precio del frente contemplado en material exterior" excelData={excelData.puertas}
                        isDisabled={selectedOption.zocalo.data.name.length > 0} showNumericInput={false} btnBlocked={selectedOption.cajones.data.name.trim().length > 0 && (selectedOption.cajones.data.name === "No" ? false : true)}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "puertas",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Bisagras" excelData={excelData.bisagras}
                        inputQuantity={bisagrasQuantity} handleQuantityInputChange={handleBisagrasQuantityChangeWrapper}
                        isDisabled={selectedOption.puertas.data.name.length > 0} showNumericInput={true}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "bisagras",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                </div>
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Cajones" subTitle="Precio del frente contemplado en material exterior" excelData={excelData.cajones}
                        isDisabled={selectedOption.bisagras.data.name.length > 0} showNumericInput={false} btnBlocked={selectedOption.puertas.data.name === "No" ? false : true}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "cajones",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Correderas" excelData={excelData.correderas}
                        inputQuantity={correderasQuantity} handleQuantityInputChange={handleCorrederasQuantityChangeWrapper}
                        isDisabled={selectedOption.cajones.data.name.length > 0} showNumericInput={true}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "correderas",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                </div>
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Piso cajon" excelData={excelData.fondos}
                        isDisabled={selectedOption.correderas.data.name.length > 0} showNumericInput={false}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "pisoCajon",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Apertura" excelData={excelData.aperturas}
                        isDisabled={selectedOption.pisoCajon.data.name.length > 0} showNumericInput={false}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "apertura",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                </div>
                <DividerComponent title="ACCESORIOS" size="medium" />
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Piso metalico" excelData={excelData.pisoMetalico}
                        isDisabled={selectedOption.apertura.data.name.length > 0} showNumericInput={false}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "pisoMetalico",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Cubiertero" excelData={excelData.cubiertero}
                        isDisabled={selectedOption.pisoMetalico.data.name.length > 0} showNumericInput={false}
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
                <DividerComponent title="SELECCIONES REALIZADAS" size="lg" />
                <TableSelectFieldsComponent quantity={quantity} moduleName={moduleName} handleSaveOptions={handleSaveOptions}
                    handleQuantityChange={handleQuantityChangeWrapper} selectedOption={selectedOption} totalPriceWithQuantity={totalPriceWithQuantity} />
            </div>
        </div>
    )
}