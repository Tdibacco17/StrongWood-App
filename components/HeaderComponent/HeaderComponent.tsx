import BtnOpenSideMenu from "./BtnOpenSideMenu/BtnOpenSideMenu"
import styles from "./HeaderComponent.module.scss"

export default function HeaderComponent({
}: {
    }) {

    return (
        <header className={styles["container-section-header"]}>
            <BtnOpenSideMenu />
            hol
        </header>
    )
}