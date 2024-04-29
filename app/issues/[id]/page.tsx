import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';



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
       <Card className='prose'mt='2'>
       <ReactMarkdown>{issue.description}</ReactMarkdown>
       </Card>
    </div>
  )
}

export default IssueDetailPage