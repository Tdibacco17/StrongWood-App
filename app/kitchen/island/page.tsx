import { BajoMesadaExcelDataResponse } from "@/types/cocinaTypes";
import api from "@/utils/api"
import IslandPageClient from "./page.client";

export default async function IslandPage() {
    const excelData: BajoMesadaExcelDataResponse = await api.cocina.bajoMesada.list();
    return <IslandPageClient excelData={excelData} optionType="kitchen" moduleType="Isla" />
}