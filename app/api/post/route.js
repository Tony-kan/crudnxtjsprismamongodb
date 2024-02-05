import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";

//create a post request(body),extract title and description from json body
//use prisma to create newPost in the db and pass in received data
//upon  success return nxtresponse ,fail returns post,status 500
export const POST = async (request) => {
  try {
    const body = await request.json();
    const { title, description } = body;

    const newPost = await prisma.post.create({
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(newPost);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
};

//fetch posts from db using prisma

export const GET = async () => {
  try {
    const posts = await prisma.post.findMany();

    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
};
