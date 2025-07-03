
import { NextResponse } from "next/server"
import connectDB from "../../../../utils/database"

import { ItemModel } from "../../../../utils/schemaModels"

export async function GET(request, context) {
    console.log(context.params.id) // Assuming you want to log the ID from the URL
    try {
        await connectDB()
        const singleItem = await ItemModel.findById(context.params.id) // Fetching the item by ID
        // Assuming you have a function to get a single item, e.g., ItemModel.findById(id)
    return NextResponse.json({ message: '아이템 단건 조회 성공', singleItem: singleItem })
} catch {
    return NextResponse.json({ message: '아이템 단건 조회 실패'})
}
}