import { Companion } from '@prisma/client'
import React from 'react'

interface CompanionProps {
    data: (Companion & {
_count:  {
    messages: number
}
    })[]
}

const Companions = ({data}: ) => {
  return (
    <div>Companions</div>
  )
}

export default Companions