import { AlacenaExcelDataResponse } from "@/types/cocinaTypes";
import api from "@/utils/api"
import TowerUpPagePageClient from "./page.client";

export default async function TowerUpPage() {
    const excelData: AlacenaExcelDataResponse = await api.cocina.alacena.list();
    return <TowerUpPagePageClient excelData={excelData} optionType="kitchen" moduleType="Torre arriba" />
}