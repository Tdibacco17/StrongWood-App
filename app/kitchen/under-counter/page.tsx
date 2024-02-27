import { BajoMesadaExcelDataResponse } from "@/types/cocinaTypes";
import api from "@/utils/api"
import UnderCounterPageClient from "./page.client";

export default async function UnderCounterPage() {
    const excelData: BajoMesadaExcelDataResponse = await api.cocina.bajoMesada.list();
    return <UnderCounterPageClient excelData={excelData} optionType="kitchen" moduleType="Bajo Mesada" />
}