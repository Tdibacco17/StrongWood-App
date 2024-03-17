import React from "react"
import { Input } from "../ui/input"
import styles from "./MeasureFieldComponent.module.scss"
import { MeasurementsInterface } from "@/types";

export default function MeasureFieldComponent({
    measurements,
    handleMeasureChange,
    title,
    subTitle,
}: {
    measurements: MeasurementsInterface,
    handleMeasureChange: (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof MeasurementsInterface) => void,
    title: string;
    subTitle?: string,
}) {
    return (
        <div className={styles["container-section-measurements"]}>
            <div>
                <p>{title}</p>
                {subTitle &&
                    <p className={`text-sm text-muted-foreground`}>{subTitle}</p>}
            </div>
            <div className={styles["wrapper"]}>
                <div className={styles["container-name-field"]}>
                    <p>Ancho</p>
                    <Input
                        placeholder="En metros..."
                        value={measurements.ancho}
                        type="number"
                        className={`${styles["input-field"]} ${measurements.ancho && measurements.ancho >= 0.1 ? styles["active"] : ""}`}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleMeasureChange(e, 'ancho')}
                    />
                </div>
                <div className={styles["container-name-field"]}>
                    <p>Alto</p>
                    <Input
                        placeholder="En metros..."
                        value={measurements.alto}
                        type="number"
                        className={`${styles["input-field"]} ${measurements.alto && measurements.alto >= 0.1 ? styles["active"] : ""}`}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleMeasureChange(e, 'alto')}
                    />
                </div>
                <div className={styles["container-name-field"]}>
                    <p>Profundidad</p>
                    <Input
                        placeholder="En metros..."
                        value={measurements.profundidad}
                        type="number"
                        className={`${styles["input-field"]} ${measurements.profundidad && measurements.profundidad >= 0.1 ? styles["active"] : ""}`}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleMeasureChange(e, 'profundidad')}
                    />
                </div>
            </div>
        </div>
    )
}