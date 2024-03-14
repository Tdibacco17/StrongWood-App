import styles from "./SkeletonTableTotalOptionsComponent.module.scss"

export default function SkeletonTableTotalOptionsComponent() {
    return (
        <div className={styles["container-table-skeleton"]}>
            <div className={styles["item"]} />
            <div className={styles["item"]} />
            <div className={styles["item"]} />
            <div className={styles["item"]} />
            <div className={styles["item"]} />
            <div className={styles["item"]} />
        </div>
    )
}