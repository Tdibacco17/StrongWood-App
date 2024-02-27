import styles from "./DashboardLayout.module.scss"
import HeaderComponent from "@/components/HeaderComponent/HeaderComponent";
import SidebarComponent from "@/components/SidebarComponent/SidebarComponent";

export default function DashboardLayout({
    children,
    navType
}: {
    children: React.ReactNode,
    navType: string
}) {
    return (
        <section className={styles["container-section-layout-dashboard"]}>
            <SidebarComponent navType={navType} />
            <main id="top" className={styles["container-section-layout-content"]}>
                <HeaderComponent />
                <div className={styles["scrollbar"]}>
                    {children}
                </div>
            </main>
        </section>
    )
}