export default function DividerComponent({
    title,
    size
}: {
    title: string,
    size: "medium" | "lg"
}) {
    return (
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t">
                </span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className={`bg-card px-2 text-${size} font-bold text-muted-foreground`}>
                    {title}
                </span>
            </div>
        </div>
    )
}