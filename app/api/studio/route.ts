import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next'
import mime from 'mime';

const fs = require('fs');
// To handle a POST request to /api

export async function POST(request: NextRequest, response: NextApiResponse) {

    let formData = await request.formData()
    
    let storyName = formData.get('storyName')
    let fileLocation = `public/game-library/${storyName}`

    let levelData = JSON.parse(formData.get('levelData') as string) 
    let fullTree = formData.get('fullTreeData')
    let image = formData.get('image') as File
    
    const ext = mime.getExtension(mime.getType(image.name) || '')
    const buffer = Buffer.from(await image.arrayBuffer());
    
    if(!fs.existsSync(fileLocation)){
        fs.mkdirSync(fileLocation);
    }

    fs.writeFileSync(`${fileLocation}/${storyName}.json`, fullTree)
    fs.writeFileSync(`${fileLocation}/${levelData.id}.${ext}`, buffer)
    return NextResponse.json({ message: "Info submitted" }, { status: 200 });

}

