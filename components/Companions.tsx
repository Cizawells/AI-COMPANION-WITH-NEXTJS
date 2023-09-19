import { Companion } from '@prisma/client'

interface CompanionProps {
    data: (Companion & {
_count:  {
    messages: number
}
    })[]
}

const Companions = ({data}: CompanionProps) => {
  return (
    <div>Companions</div>
  )
}

export default Companions