import { Text } from '@radix-ui/themes'
import React, { PropsWithChildren, ReactNode } from 'react'


const ErrorMessage = ({children}:PropsWithChildren) => {
 if (!children) return null;
  return (
    <Text color='red' as='p'></Text>
  )
}

export default ErrorMessage
