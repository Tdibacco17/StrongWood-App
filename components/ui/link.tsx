import Link from "next/link"

export default function CustomLink({
    url,
    isActive,
    title,
}: {
    url: string,
    isActive: boolean,
    title: string,
}) {
    return <Link
        href={url}
        className={`inline-flex items-center justify-left rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 overflow-hidden ${isActive ? "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50" : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"} h-10 px-4 py-2`}
    >
        <span className="overflow-hidden whitespace-nowrap text-ellipsis">
            {title}
        </span>
    </Link >
}