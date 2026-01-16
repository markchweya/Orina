import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { customer_email, customer_phone, location, house_number, items } = body ?? {};
    if (!customer_email || !customer_phone || !location || !house_number) {
      return NextResponse.json({ error: "Missing customer details" }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // 1) Create order
    const { data: order, error: orderErr } = await supabaseServer
      .from("orders")
      .insert([{ customer_email, customer_phone, location, house_number }])
      .select("id")
      .single();

    if (orderErr) throw orderErr;

    // 2) Create items
    const rows = items.map((x: any) => ({
      order_id: order.id,
      product_id: x.product_id,
      qty: x.qty,
      unit_price_kes: x.unit_price_kes,
    }));

    const { error: itemsErr } = await supabaseServer.from("order_items").insert(rows);
    if (itemsErr) throw itemsErr;

    return NextResponse.json({ order_id: order.id }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}
