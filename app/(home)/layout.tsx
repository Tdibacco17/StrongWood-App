import DashboardLayout from "@/layout/DashboardLayout/DashboardLayout";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DashboardLayout navType={"home"}>
            {children}
        </DashboardLayout>
    );
}
