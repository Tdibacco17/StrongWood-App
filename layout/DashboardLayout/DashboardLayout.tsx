import styles from "./DashboardLayout.module.scss"
import HeaderComponent from "@/components/HeaderComponent/HeaderComponent";
import SidebarLayoutComponent from "../SidebarLayout/SidebarLayout";
import SidebarComponent from "@/components/SidebarComponent/SidebarComponent";
import ContentLayout from "../ContentLayout/ContentLayout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className={styles["container-section-layout-dashboard"]}>
            <SidebarLayoutComponent>
                <SidebarComponent />
            </SidebarLayoutComponent>
            <ContentLayout>
                <HeaderComponent />
                {children}
            </ContentLayout>
        </section>
    )
}