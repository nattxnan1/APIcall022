import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// READ - ดึง posts ทั้งหมด
export async function GET() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return NextResponse.json(posts);
}

// CREATE - สร้าง post
export async function POST(req: Request) {
  const body = await req.json();

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      published: true,   // กำหนดค่า default
      authorId: 1,       // ใช้ user id 1 ก่อน
    },
  });

  return NextResponse.json(post);
}

// UPDATE - แก้ไข post
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

// DELETE - ลบ post
export async function DELETE(req: Request) {
  const body = await req.json();

  const post = await prisma.post.delete({
    where: {
      id: body.id,
    },
  });

  return NextResponse.json(post);
}