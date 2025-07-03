import {NextResponse} from 'next/server'
import { jwtVerify} from 'jose'

export async function middleware(request) {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15QGdtYWlsLmNvbSIsImV4cCI6MTc1MTUyNDc0NH0.fKRkBxUlPsaNOhRdfzQOZTTy3Hiyz72c2udFq1-Oa0g"
    //const token = await request.headers.get('authorization')?.split("")[1] // Getting the token from the request headers
    
    if (!token) {
        return NextResponse.json({ message: '인증 실패: 토큰이 없습니다' }, { status: 401 }) // Returning an error if the token is not present
    }   

    try {
        const secretKey = new TextEncoder().encode("next-market-app-book") // Encoding the secret key
        const decodedJwt = await jwtVerify(token, secretKey) // Verifying the token with the secret key
        console.log("decodedJwt:", decodedJwt) // Logging the decoded JWT for debugging
        return NextResponse.next() // Proceeding to the next middleware or route handler if the token is present
    } catch {
        return NextResponse.json({ message: '인증 실패: 토큰이 유효하지 않습니다' }, { status: 401 }) // Returning an error if the token is invalid 
    }
    
    
}   

export const config = {
    matcher: [
        "/api/item/create",
        '/api/item/update/:path*',
        '/api/item/delete/:path*'
    ]       
}
