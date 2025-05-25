import connectMongoDB from "@/db";
import Order from "@/models/Orders";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
    const {id} = params;
    console.log(id)
    try {
        // console.log(params.id);
        await connectMongoDB();
        const order = await Order.findById(id);
        if (!order) {
            return NextResponse.error("Order not found", 404);
        }
        return NextResponse.json({ order });
    } catch (error) {
        console.error("Error fetching order:", error);
        return NextResponse.error("Internal Server Error", 500);
    }
}
export async function PUT(request, {params}){
    const {id} = params;
    const {status} =await request.json();
    console.log(status);
    await connectMongoDB();
    await Order.findByIdAndUpdate(id ,{status:status});
    return NextResponse.json({message:"Order Status Updated"},{status:200});

}