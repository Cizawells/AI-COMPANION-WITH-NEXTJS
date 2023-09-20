import ChatClient from "@/components/ChatClient"
import { auth, redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

interface ChatIdPageProps {
    params: {
        chatId: string
    }
}


const page = async ({ params }: ChatIdPageProps) => {
    
    const { userId } = auth()

    if (!userId) {
        return redirectToSignIn()
    }

    const companion = await prisma?.companion.findUnique({
        where: {
            id: params.chatId
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: "asc"
                },
                where: {
                    userId
                }
            },
            _count: {
                select: {
                    messages: true
                }
            }
        }
    })

    if (!companion) {
        return redirect("/")
    }
  return (
      <ChatClient companion={ companion} />
  )
}

export default page