import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
    revalidateTag('cocina');

    return NextResponse.json({ revalidate: true })
}