import prisma from '@/prisma/client'
import IssueSummary from './IssueSummary'
import LatestIssues from './LatestIssues'

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } })
  const in_progress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  })
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } })
  return <IssueSummary open={open} inProgress={in_progress} closed={closed} />
}
