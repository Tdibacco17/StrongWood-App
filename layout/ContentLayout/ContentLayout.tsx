'use client'
import { useResizableContext } from "@/hook/useResizableContext ";
import styles from "./ContentLayout.module.scss"

export default function ContentLayout({ children }: { children: React.ReactNode }) {
    const { isSidebarOpen } = useResizableContext();

    return (
        <main id="top" className={`${styles["container-section-layout-content"]} ${isSidebarOpen ? "" : "closed"}`}>
            {children}
        </main>
    )
}