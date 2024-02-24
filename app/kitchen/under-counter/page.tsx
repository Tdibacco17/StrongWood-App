import { BajoMesadaExcelDataResponse } from "@/types"
import api from "@/utils/api"

export default async function UnderCounterPage() {
    const excelData: BajoMesadaExcelDataResponse = await api.cocina.bajoMesada.list()
    return (
        <div>
            {JSON.stringify(excelData, null, 2)}
        </div>
    )
}