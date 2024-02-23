'use client'

import { useResizableContext } from "@/hook/useResizableContext ";

export default function BtnOpenSideMenu() {
    const { toggleSidebarHandle } = useResizableContext();

    return <button onClick={toggleSidebarHandle}>
        boton sidebar
    </button>
}