import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react'


const IssueDetailPage = async ({params} : {params: {id: string}}) => {

  const issue=await prisma.issue.findUnique({
   where:{ id : parseInt(params.id)}
  });
  if(!issue)
   notFound();

  return (
    <div>
       <Heading as='h1'>{issue.title}</Heading>
       <Flex gap="3" my="2">
        <IssueStatusBadge status={issue.status}/>
        <Text>{issue.createdAt.toDateString()}</Text>
       </Flex>
       <Card>
       <p>{issue.description}</p>
       </Card>
    </div>
  )
}

export default IssueDetailPage
