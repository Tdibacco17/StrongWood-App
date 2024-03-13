import { IslaExcelDataResponse } from "@/types/cocinaTypes";
import api from "@/utils/api"
import IslandPageClient from "./page.client";

export default async function IslandPage() {
    const excelData: IslaExcelDataResponse = await api.cocina.isla.list();
    return <IslandPageClient excelData={excelData} optionType="kitchen" moduleType="Isla" />
}