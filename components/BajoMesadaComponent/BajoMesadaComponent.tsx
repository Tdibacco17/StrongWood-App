import { ExcelDataInterface, MeasurementsInterface, SquareMetersInterface } from "@/types"
import { BajoMesadaExcelDataResponse, BajoMesadaInterface, BajoMesadaTypes } from "@/types/cocinaTypes"
import styles from "./BajoMesadaComponent.module.scss"
import SelectFieldComponent from "../SelectFieldComponent/SelectFieldComponent"
import TableSelectFieldsComponent from "../TableSelectFieldsComponent/TableSelectFieldsComponent"
import NameFieldComponent from "../NameFieldComponent/NameFieldComponent"
import DividerComponent from "../DividerComponent/DividerComponent"
import MeasureFieldComponent from "../MeasureFieldComponent/MeasureFieldComponent"

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
    handleMeasureChange,
    measurementSelected,
    subTitle
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
    measurements: MeasurementsInterface,
    handleMeasureChange: (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof MeasurementsInterface) => void,
    measurementSelected: boolean,
    subTitle?: string
}) {
    return (
        <div className={styles["container-section-bajomesada"]}>
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
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "materialExterior",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                </div>
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Panel de cierre" excelData={excelData.panelDeCierre}
                        isDisabled={measurementSelected && selectedOption.materialExterior.data.name.length > 0} showNumericInput={false}
                        btnBlocked={selectedOption.cierreAtras.data.name.length > 0}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "panelDeCierre",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Panel de cierre ( atras )" excelData={excelData.cierreAtras}
                        isDisabled={measurementSelected && selectedOption.panelDeCierre.data.name.length > 0} showNumericInput={false}
                        btnBlocked={selectedOption.fondo.data.name.length > 0}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "cierreAtras",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Fondo" excelData={excelData.fondos.slice(0, 2)}
                        isDisabled={measurementSelected && selectedOption.cierreAtras.data.name.length > 0} showNumericInput={false}
                        btnBlocked={selectedOption.patas.data.name.length > 0}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "fondo",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Patas" excelData={excelData.patas}
                        isDisabled={measurementSelected && selectedOption.fondo.data.name.length > 0} showNumericInput={false}
                        btnBlocked={selectedOption.zocalo.data.name.length > 0}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "patas",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Zocalo" excelData={excelData.zocalo}
                        isDisabled={measurementSelected && selectedOption.patas.data.name.length > 0} showNumericInput={false}
                        btnBlocked={selectedOption.puertas.data.name.length > 0}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "zocalo",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                </div>
                <DividerComponent title="CAJON O PUERTAS" size="medium" />
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Puertas" subTitle="Precio del frente contemplado en material exterior" excelData={excelData.puertas}
                        isDisabled={measurementSelected && selectedOption.zocalo.data.name.length > 0} showNumericInput={false}
                        btnBlocked={selectedOption.bisagras.data.name.length > 0}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "puertas",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Bisagras" excelData={excelData.bisagras}
                        inputQuantity={bisagrasQuantity} handleQuantityInputChange={handleBisagrasQuantityChangeWrapper}
                        isDisabled={measurementSelected && selectedOption.puertas.data.name.length > 0} showNumericInput={true}
                        btnBlocked={selectedOption.cajones.data.name.length > 0}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "bisagras",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                </div>
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Cajones" subTitle="Precio del frente contemplado en material exterior" excelData={excelData.cajones}
                        isDisabled={measurementSelected && selectedOption.bisagras.data.name.length > 0} showNumericInput={false}
                        btnBlocked={selectedOption.correderas.data.name.length > 0}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "cajones",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Correderas" excelData={excelData.correderas}
                        inputQuantity={correderasQuantity} handleQuantityInputChange={handleCorrederasQuantityChangeWrapper}
                        isDisabled={measurementSelected && selectedOption.cajones.data.name.length > 0} showNumericInput={true}
                        btnBlocked={selectedOption.pisoCajon.data.name.length > 0}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "correderas",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                </div>
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Piso cajon" excelData={excelData.fondos}
                        isDisabled={measurementSelected && selectedOption.correderas.data.name.length > 0} showNumericInput={false}
                        btnBlocked={selectedOption.cajonInterno.data.name.length > 0}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "pisoCajon",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Cajon interno" excelData={excelData.cajonInterno}
                        isDisabled={measurementSelected && selectedOption.pisoCajon.data.name.length > 0} showNumericInput={false}
                        btnBlocked={selectedOption.pisoCajonInterno.data.name.length > 0}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "cajonInterno",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Piso cajon interno" excelData={excelData.fondos.slice(0, 2)}
                        isDisabled={measurementSelected && selectedOption.cajonInterno.data.name.length > 0} showNumericInput={false}
                        btnBlocked={selectedOption.apertura.data.name.length > 0}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "pisoCajonInterno",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Apertura" excelData={excelData.aperturas}
                        isDisabled={selectedOption.pisoCajonInterno.data.name.length > 0} showNumericInput={false}
                        btnBlocked={selectedOption.pisoMetalico.data.name.length > 0}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "apertura",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                </div>
                <DividerComponent title="ACCESORIOS" size="medium" />
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Piso metalico" excelData={excelData.pisoMetalico}
                        isDisabled={measurementSelected && selectedOption.apertura.data.name.length > 0} showNumericInput={false}
                        btnBlocked={selectedOption.pisoMetalico.data.name.length > 0}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "pisoMetalico",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Cubiertero" excelData={excelData.cubiertero}
                        isDisabled={measurementSelected && selectedOption.pisoMetalico.data.name.length > 0} showNumericInput={false}
                        btnBlocked={selectedOption.carroEsquinero.data.name.length > 0}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "cubiertero",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Carro esquinero" excelData={excelData.carroEsquinero}
                        isDisabled={measurementSelected && selectedOption.cubiertero.data.name.length > 0} showNumericInput={false}
                        btnBlocked={selectedOption.carroEspeciero.data.name.length > 0}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "carroEsquinero",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Carro especiero" excelData={excelData.carroEspeciero}
                        isDisabled={measurementSelected && selectedOption.carroEsquinero.data.name.length > 0} showNumericInput={false}
                        btnBlocked={selectedOption.carroVerdulero.data.name.length > 0}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "carroEspeciero",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                </div>
                <div className={styles["wrapper-row"]}>
                    <SelectFieldComponent title="Carro verdulero" excelData={excelData.carroVerdulero}
                        isDisabled={measurementSelected && selectedOption.carroEspeciero.data.name.length > 0} showNumericInput={false}
                        btnBlocked={selectedOption.canastoVerdulero.data.name.length > 0}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "carroVerdulero",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Canasto verdulero" excelData={excelData.canastoVerdulero}
                        isDisabled={measurementSelected && selectedOption.carroVerdulero.data.name.length > 0} showNumericInput={false}
                        btnBlocked={selectedOption.tacho.data.name.length > 0}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "canastoVerdulero",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                    <SelectFieldComponent title="Tacho" excelData={excelData.tacho}
                        isDisabled={measurementSelected && selectedOption.canastoVerdulero.data.name.length > 0} showNumericInput={false}
                        bajoMesadaProps={{
                            selectedOption: selectedOption,
                            selectedOptionType: "tacho",
                            handleOptionSelect: handleOptionSelect,
                        }} />
                </div>
                <DividerComponent title="SELECCIONES REALIZADAS" size="lg" />
                <TableSelectFieldsComponent quantity={quantity} measurements={measurements} moduleName={moduleName} handleSaveOptions={handleSaveOptions}
                    isDisabled={selectedOption.tacho.data.name.length > 0 && selectedOption.tacho.data.name !== ""} handleQuantityChange={handleQuantityChangeWrapper} selectedOption={selectedOption} totalPriceWithQuantity={totalPriceWithQuantity} />
            </div>
        </div>
    )
}