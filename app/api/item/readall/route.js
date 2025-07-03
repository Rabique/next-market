import { NextResponse } from "next/server"
import connectDB from "../../../utils/database"
import { ItemModel } from "../../../utils/schemaModels"

export async function GET() {
  try{
     await connectDB()
     const allItems = await ItemModel.find()
     return NextResponse.json({message: '아이템 목록 조회 성공', allItems:allItems })
} catch {
  return NextResponse.json({message: '아이템 목록 조회 실패'})
}
}

export const revalidate = 0
