import { revalidateTag } from "next/cache";

export async function GET() {
    try {
        revalidateTag("kitchen");

        return Response.json({ revalidated: true });
    } catch (error) {
        console.error("Error en GET:", error);
        return Response.json({ error: "Ocurrió un error al procesar la solicitud." }, { status: 500 });
    }
}
