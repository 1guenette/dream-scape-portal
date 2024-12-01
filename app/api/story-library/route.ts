import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next'
import mime from 'mime';

const fs = require('fs');
// To handle a POST request to /api

export async function GET(request: NextRequest, response: NextApiResponse) {
    let list = fs.readdirSync(`public/game-library/`)
    return NextResponse.json({ list}, { status: 200 });

}

