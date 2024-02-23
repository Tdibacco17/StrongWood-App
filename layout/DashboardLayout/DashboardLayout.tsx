import styles from "./DashboardLayout.module.scss"
import HeaderComponent from "@/components/HeaderComponent/HeaderComponent";
import SidebarComponent from "@/components/SidebarComponent/SidebarComponent";
import ContentLayout from "../ContentLayout/ContentLayout";

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
            <ContentLayout>
                <HeaderComponent />
                {children}
            </ContentLayout>
        </section>
    )
}