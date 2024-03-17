import { revalidateTag } from "next/cache";

export async function GET() {
    revalidateTag("kitchen");

    return Response.json({ revalidated: true })
}