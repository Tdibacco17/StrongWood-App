import { BajoMesadaExcelDataResponse } from "@/types/cocinaTypes";
import api from "@/utils/api"
import TowerDownPagePageClient from "./page.client";

export default async function TowerDownPage() {
    const excelData: BajoMesadaExcelDataResponse = await api.cocina.bajoMesada.list();
    return <TowerDownPagePageClient excelData={excelData} optionType="kitchen" moduleType="Torre abajo" />
}