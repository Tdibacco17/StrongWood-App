import { revalidateTag } from "next/cache";

export async function Get() {
    revalidateTag("kitchen");

    return Response.json({ revalidated: true })
}