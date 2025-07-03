import {NextResponse} from "next/server"
import connectDB from "../../../../utils/database"
import {ItemModel} from "../../../../utils/schemaModels"    

export async function DELETE(request, context) {
    try {
        await connectDB()
        const singleItem = await ItemModel.findById(context.params.id) // Finding the item by ID    
        if (singleItem.email === reqBody.email) { 
            // Checking if the item belongs to the user
        await ItemModel.deleteOne({_id: context.params.id}) // Deleting the item by ID
        return NextResponse.json({ message: '아이템 삭제 성공' })
        } else {
            return NextResponse.json({ message: '다른 사용자가 작성한 아이템입니다.' })
        }
    } catch {
        return NextResponse.json({ message: '아이템 삭제 실패' })
    }
}