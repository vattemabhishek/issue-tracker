import { issueSchema } from "@/app/createIssueSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
 request: NextRequest,
 {params}:{params:{id:string}}){

   const body = await request.json();

   const validation = issueSchema.safeParse(body);
  if(!validation.success)
   return NextResponse.json(validation.error.format(),{status:400})

  const issue = await prisma.issue.findUnique({
   where:{id:parseInt(params.id)}
  })

  if(!issue)
   return NextResponse.json({error:'Invaid issue'},{status:404})

  const updatedIssue = await prisma.issue.update({
   where: {id:issue.id},
   data:{
    title : body.title,
    // status : body.status,
    description : body.description
   }
  });
  return NextResponse.json(updatedIssue);


}