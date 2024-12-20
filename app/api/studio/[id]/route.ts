import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next'
import mime from 'mime';
import { readFileSync } from "fs";
const sharp = require('sharp');

const fs = require('fs');

export async function POST(request: NextRequest, response: NextApiResponse) {

    let formData = await request.formData()

    let storyName = formData.get('storyName')
    let fileLocation = `public/game-library/${storyName}`

    let levelData = JSON.parse(formData.get('levelData') as string)
    let fullTree = formData.get('fullTreeData')

    if (formData.get('image')) {
        let image = formData.get('image') as File
        const ext = mime.getExtension(mime.getType(image.name) || '')
        const buffer = Buffer.from(await image.arrayBuffer());

        //Removes existing image
        if (fs.existsSync(`${fileLocation}/${levelData.id}.png`)) {
            await fs.unlinkSync(`${fileLocation}/${levelData.id}.png`);
        }
        
        await sharp(buffer).resize(400, 400, { fit: "contain" })
            .png({ compressionLevel:1 })
            .toFile(`${fileLocation}/${levelData.id}.png`)
            .then((res) => {
                console.log('compressed')
            })
            .catch((err) => {
                console.log(`error ${err}`)
            })
    }

    if (!fs.existsSync(fileLocation)) {
        fs.mkdirSync(fileLocation);
    }

    fs.writeFileSync(`${fileLocation}/${storyName}.json`, fullTree)
    return NextResponse.json({ message: "Info submitted" }, { status: 200 });

}

export async function GET(request: NextApiRequest, context: { params: { id: string } }, response: NextApiResponse) {
    let fileName = context.params.id
    let fileLocation = `public/game-library/${fileName}/${fileName}.json`
    let exists = fs.existsSync(fileLocation)
    if (!exists) {
        return NextResponse.json(null, { status: 404 });
    }
    let data = JSON.parse(readFileSync(fileLocation, 'utf-8'))
    return NextResponse.json(data, { status: 200 });

}


export async function DELETE(request: NextApiRequest, context: { params: { id: string } }, response: NextApiResponse) {
    let fileName = context.params.id
    let fileLocation = `public/game-library/${fileName}`
    let exists = fs.existsSync(fileLocation)
    if (!exists) {
        return NextResponse.json(null, { status: 404 });
    }

    fs.rmSync(fileLocation, { recursive: true, force: true })
    return NextResponse.json(`Removed ${fileName}`, { status: 200 });

}