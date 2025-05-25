import connectMongoDB from "@/db";
import Order from "@/models/Orders";
import { NextResponse } from "next/server";

export async function POST(request){
    const requestBody = await request.json();
    console.log(requestBody);
    
    // Destructure the properties from the requestBody
    const { name, address, mobile_no, whatsapp, totalPrice, adultSizes, childSizes, paymentMethod, model } = requestBody;
    
    
    await connectMongoDB();
    await Order.create({name,address,mobile_no, whatsapp_no:whatsapp,total_price:totalPrice,adult_sizes:adultSizes,model:model, child_sizes:childSizes, payment_method:paymentMethod,isPaid:false});
    return NextResponse.json({message:"Order Confirmed"},{status: 201});
}

export async function GET(){
    await connectMongoDB();
    const orders =await Order.find();
    return NextResponse.json({orders})
}

// export async function DELETE(request){
//     const id = request.nextUrl.searchParams.get('id');
//     await connectMongoDB();
//     await Topic.findByIdAndDelete(id);
//     return NextResponse.json({message:"Topic deleted successfully"},{status:200});
// }