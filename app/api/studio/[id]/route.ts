   // app/api/[id]/route.ts
   import { NextResponse, NextRequest } from "next/server";
   import { NextApiRequest, NextApiResponse } from 'next'
   import mime from 'mime';
import { readFileSync } from "fs";
   
   const fs = require('fs');

   export async function POST(request: NextRequest, response: NextApiResponse) {

    console.log("UPDATING")

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

export async function GET(request: NextApiRequest, context: { params: { id: string } }, response: NextApiResponse) {
    let fileName = context.params.id
    let fileLocation = `public/game-library/${fileName}/${fileName}.json`
    let exists = fs.existsSync(fileLocation)
    if(!exists){
        return NextResponse.json(null, { status: 404 });
    }
    let data = JSON.parse(readFileSync(fileLocation, 'utf-8'))
    return NextResponse.json(data, { status: 200 });

}