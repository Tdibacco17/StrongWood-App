'use client'
import Link from "next/link"
import styles from "./SidebarComponent.module.scss"
import data from "@/models/es.json"
import { ItemNavigation } from "@/types"
import CustomLink from "../ui/link"
import { useResizableContext } from "@/hook/UseResizableContext"
import { usePathname } from "next/navigation"

export default function SidebarComponent({
    navType
}: {
    navType: string
}) {
    const { isSidebarOpen } = useResizableContext();
    const currentPathName = usePathname();
    const navigationOptions = data.sidebarComponent[navType as keyof typeof data.sidebarComponent];

    return (
        <section className={`${styles["container-section-sidebar"]} ${isSidebarOpen ? "" : styles["close"]}`}>
            <Link href={data.sidebarComponent.url} className={`${styles["logo"]} ${isSidebarOpen ? "" : styles["resize"]}`}>
                {isSidebarOpen ? data.sidebarComponent.title : data.sidebarComponent.smallTitle}
            </Link>
            <nav className={styles["nav-container"]}>
                {navigationOptions &&
                    Object.values(data.sidebarComponent[navType as keyof typeof data.sidebarComponent]).map((itemData: ItemNavigation, index: number) => {
                        const isActive = currentPathName === itemData.url || (currentPathName === "/" && itemData.url === "/");
                        return <CustomLink
                            key={index}
                            url={itemData.url}
                            title={itemData.title}
                            isActive={!isActive}
                        />
                    })}
            </nav>
        </section>
    )
}