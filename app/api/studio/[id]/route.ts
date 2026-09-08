import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next'
import { readFileSync } from "fs";
import path from "path";
import { IMAGE_EXTENSIONS, isValidStoryName, storyDir, storyFile } from "@/lib/gameLibrary";
const sharp = require('sharp');

const fs = require('fs');

// Levels are displayed at 560px, so there is nothing to gain from storing more.
const IMAGE_SIZE = 560;

export async function POST(request: NextRequest, response: NextApiResponse) {

    let formData = await request.formData()

    let storyName = formData.get('storyName')

    if (!isValidStoryName(storyName)) {
        return NextResponse.json({ message: "Invalid story name" }, { status: 400 });
    }

    let fileLocation = storyDir(storyName)

    let levelData = JSON.parse(formData.get('levelData') as string)
    let fullTree = formData.get('fullTreeData')

    if (!fs.existsSync(fileLocation)) {
        fs.mkdirSync(fileLocation, { recursive: true });
    }

    if (formData.get('image')) {
        let image = formData.get('image') as File
        const buffer = Buffer.from(await image.arrayBuffer());

        //Removes existing images so an older encoding can't shadow the new one
        for (const ext of IMAGE_EXTENSIONS) {
            const existing = path.join(fileLocation, `${levelData.id}${ext}`)
            if (fs.existsSync(existing)) {
                fs.unlinkSync(existing);
            }
        }

        await sharp(buffer).resize(IMAGE_SIZE, IMAGE_SIZE, { fit: "contain" })
            .webp({ quality: 80 })
            .toFile(path.join(fileLocation, `${levelData.id}.webp`))
            .catch((err) => {
                console.log(`error ${err}`)
            })
    }

    fs.writeFileSync(storyFile(storyName), fullTree)
    return NextResponse.json({ message: "Info submitted" }, { status: 200 });

}

export async function GET(request: NextApiRequest, context: { params: { id: string } }, response: NextApiResponse) {
    let fileName = context.params.id

    if (!isValidStoryName(fileName)) {
        return NextResponse.json(null, { status: 400 });
    }

    let fileLocation = storyFile(fileName)
    let exists = fs.existsSync(fileLocation)
    if (!exists) {
        return NextResponse.json(null, { status: 404 });
    }
    let data = JSON.parse(readFileSync(fileLocation, 'utf-8'))
    return NextResponse.json(data, { status: 200 });

}

export async function DELETE(request: NextApiRequest, context: { params: { id: string } }, response: NextApiResponse) {
    let fileName = context.params.id

    if (!isValidStoryName(fileName)) {
        return NextResponse.json(null, { status: 400 });
    }

    let fileLocation = storyDir(fileName)
    let exists = fs.existsSync(fileLocation)
    if (!exists) {
        return NextResponse.json(null, { status: 404 });
    }

    fs.rmSync(fileLocation, { recursive: true, force: true })
    return NextResponse.json(`Removed ${fileName}`, { status: 200 });

}
