import { NextResponse} from "next/server"
import { SignJWT } from "jose"
import connectDB from "../../../utils/database"
import { UserModel } from "../../../utils/schemaModels"

export async function POST(request) {
    const reqBody = await request.json()

    try {
        await connectDB()
        const user = await UserModel.findOne({
            email: reqBody.email
            
        }) // Finding the user by email and password    
        if (user) {
            if (reqBody.password === user.password) { // Checking if the password matches
               const secretKey = new TextEncoder().encode("next-market-app-book") // Encoding the secret key
               const payload = {
                    email: user.email
                } // Creating the payload with user data

            const token = await new SignJWT(payload)
                .setProtectedHeader({ alg: 'HS256' }) // Setting the algorithm for the JWT
                .setExpirationTime('1d') // Setting the expiration time for the JWT
                .sign(secretKey) // Signing the JWT with the secret key
            console.log(token) // Logging the JWT for debugging
                

            return NextResponse.json({ message: '로그인 성공', token: token }) // Returning the JWT on successful login
           
        } else {
            return NextResponse.json({ message: '로그인 실패: 비밀번호가 올바르지 않습니다' }) // Returning an error message if the user is not found
        }
    } else {
            return NextResponse.json({ message: '로그인 실패: 사용자를 등록하십시오' }) // Returning an error message if the user is not found
        }
    } catch (error) {
        console.error(error) // Logging the error for debugging     
           
        return NextResponse.json({ message: '로그인 실패' }) // Returning an error message if there is an exception
    }   
}