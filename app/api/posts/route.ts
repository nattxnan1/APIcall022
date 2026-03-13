import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const body = await req.json();

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      published: true,   
      authorId: 1,       
    },
  });

  return NextResponse.json(post);
}

export async function PUT(req: Request) {
  const body = await req.json();

  const post = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
      published: body.published ?? true,
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(req: Request) {
  const body = await req.json();

  const post = await prisma.post.delete({
    where: {
      id: body.id,
    },
  });

  return NextResponse.json(post);
}