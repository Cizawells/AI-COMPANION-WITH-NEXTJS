'use client'

import { ChatRequestOptions } from "ai";
import { SendHorizonal } from "lucide-react";
import { ChangeEvent, FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ChatFormProps {
    input: string;
    handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void;
    isLoading: boolean
}

const ChatForm = ({
    input,
    handleInputChange,
    onSubmit,
    isLoading
}: ChatFormProps) => {
  return (
      <form action="" onSubmit={onSubmit} className="border-t border-primary/10 py-4 flex items-center gap-x-2">
          <Input
              disabled={isLoading}
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message"
              className="rounded-lg bg-primary/10"
          />

          <Button disabled={isLoading} variant="ghost" >
              <SendHorizonal className="h-6 w-6"/>
          </Button>
   </form>
  )
}

export default ChatForm