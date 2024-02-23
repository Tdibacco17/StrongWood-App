'use client'
import { useResizableContext } from "@/hook/useResizableContext ";
import styles from "./SidebarLayout.module.scss"

export default function SidebarLayout({
    children
}: {
    children: React.ReactNode
}) {
    const { isSidebarOpen } = useResizableContext();

    return (
        <section className={`${styles["container-section-layout-sidebar"]} ${isSidebarOpen ? "" : styles["close"]}`}>
            {children}
        </section>
    )
}