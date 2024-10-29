import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next'
import mime from 'mime';

const fs = require('fs');
// To handle a POST request to /api

export async function POST(request: NextRequest, response: NextApiResponse) {

    let data = await request.json()
    let fileLocation = `public/game-library/${data.name}`
    let storyName = data.name

    if(fs.existsSync(fileLocation)){
        return NextResponse.json({ message: "Name already exists" }, { status: 403 });
    }
    else{
        fs.mkdirSync(fileLocation);
        fs.writeFileSync(`${fileLocation}/${storyName}.json`, '')
        return NextResponse.json({ message: "Info submitted" }, { status: 200 });
    }

}

