
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'


const IssuesPage = () => {
  return (<div>
    <Button><Link href='/issues/new'>new issue</Link></Button>
</div>)
}

export default IssuesPage
