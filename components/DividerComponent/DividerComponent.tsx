export default function DividerComponent({
    title
}: {
    title: string
}) {
    return (
        <div className="relative">
            <div className="absolute inset-0 flex items-center pt-4">
                <span className="w-full border-t">
                </span>
            </div>
            <div className="relative flex justify-center text-xs uppercase pt-4">
                <span className="bg-card px-2 text-lg font-bold text-muted-foreground">
                    {title}
                </span>
            </div>
        </div>
    )
}