import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next'

// To handle a POST request to /api
export async function POST(request: NextApiRequest, response: NextApiResponse) {

    console.log("*******")
    let x = await request.json()
    console.log(x)
        console.log(request.body)

        return NextResponse.json({ message: "Info submitted" }, { status: 200 });

}

