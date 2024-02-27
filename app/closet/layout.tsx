import DashboardLayout from "@/layout/DashboardLayout";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DashboardLayout navType={"closet"}>
            {children}
        </DashboardLayout>
    );
}
