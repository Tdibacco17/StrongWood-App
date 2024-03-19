import { Input } from "../ui/input";
import styles from "./NameFieldComponent.module.scss"

export default function NameFieldComponent({
    moduleName,
    setModuleName,
}: {
    moduleName: string,
    setModuleName: Function,
}) {
    return (
        <div className={styles["container-name-field"]}>
            <label className="text-lg font-medium">Nombre del modulo</label>
            <Input
                placeholder="Escribir aca..."
                value={moduleName}
                className={`${styles["input-field"]} ${moduleName.trim().length > 0 ? styles["active"] : ""}`}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setModuleName(e.target.value)}
            />
        </div>
    )
}