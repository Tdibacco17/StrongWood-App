'use client'
import styles from "./HeaderComponent.module.scss"
import data from "@/models/es.json"
import { ItemNavigation } from "@/types"
import { usePathname } from "next/navigation"
import CustomLink from "../ui/link"
import { Button } from "../ui/button"
import { useResizableContext } from "@/hook/useResizableContext "

export default function HeaderComponent() {
    const { toggleSidebarHandle } = useResizableContext();
    const pathName = usePathname().split('/')[1];
    
    return (
        <header className={styles["container-section-header"]}>
            <Button variant={"outline"} size={"icon"} onClick={toggleSidebarHandle}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </Button>
            <nav>
                {Object.values(data.headerComponent.navigation).map((itemData: ItemNavigation, index: number) => {
                    const active = pathName === itemData.url.split('/')[1];
                    return <CustomLink
                        key={index}
                        url={itemData.url}
                        title={itemData.title}
                        isActive={!active}
                    />
                })}
            </nav>
        </header>
    )
}