"use client"

import ChatForm from "@/components/chat-form";
import ChatHeader from "@/components/chat-header";
import { ChatMessageProps } from "@/components/chat-message";
import ChatMessages from "@/components/chat-messages";
import { Companion, Message } from "@prisma/client";
import { useCompletion } from "ai/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface ChatClientProps {
    companion: Companion & {
        messages: Message[];
        _count: {
            messages: number
        }
}
}

const ChatClient = ({ companion }: ChatClientProps) => {

    const router = useRouter();

    const [messages, setMessages] = useState<ChatMessageProps[]>(companion.messages);

    const { input, isLoading, handleInputChange, handleSubmit, setInput } = useCompletion({
        api: `/api/chat/${companion.id}`,
        onFinish(prompt, completion) {

            console.log("")
            const systemMessage: ChatMessageProps = {
                role: "system",
                content: completion
            }
            console.log(systemMessage)

            setMessages((current) => [...current, systemMessage])
            setInput("");
            router.refresh()
        }
    })


    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        const userMessage: ChatMessageProps = {
            role: "user",
            content: input
        }

        setMessages((current) => [...current, userMessage])

        handleSubmit(e)
    }
  return (
      <div className="flex flex-col h-full p-4 space-y-2">
          <ChatHeader companion={companion} />
          <ChatMessages
              companion={companion}
              isLoading={isLoading}
              messages={messages}

          />

          <ChatForm
              isLoading={isLoading}
              input={input}
              handleInputChange={handleInputChange}
              onSubmit={ onSubmit} />
     </div>
  )
}

export default ChatClient