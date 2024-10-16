import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next'
const fs = require('fs');
// To handle a POST request to /api

export async function POST(request: NextRequest, response: NextApiResponse) {

    let formData = await request.formData()
    let levelData = JSON.parse(formData.get('levelData')) 
    let image = formData.get('image')
    let buffer = Buffer.from(await image.arrayBuffer());

    

    // console.log(buff)

    fs.writeFileSync(`public/testfgsdf.jpg`, buffer)
    
    

        return NextResponse.json({ message: "Info submitted" }, { status: 200 });

}

