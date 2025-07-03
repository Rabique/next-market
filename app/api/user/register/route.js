import { NextResponse} from "next/server"
import connectDB from "../../../utils/database" 
import { UserModel } from "../../../utils/schemaModels"

export async function POST(request) {
    const reqBody = await request.json()

    try {
        await connectDB()
        const newUser = new UserModel(reqBody)
        await newUser.save() // Saving the new user to the database
        return NextResponse.json({ message: '회원가입 성공' })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: '회원가입 실패' })
    }
}   