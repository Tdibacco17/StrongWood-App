import { revalidateTag } from "next/cache";

export async function GET() {
    revalidateTag('cocina');

    return Response.json({ revalidate: true })
}