'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Companion } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface CompanionFormProps {
    initialData: Companion | null;
    categories: Category[]
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    description: z.string().min(1, {
        message: "Description is required"
    }),
    instructions: z.string().min(200, {
        message: "Instructions require at least 200 characters"
    }),
    seed: z.string().min(200, {
        message: "seed require at least 200 characters"
    }),
    src: z.string().min(1, {
        message: "src is required"
    }),
    categoryId: z.string().min(1, {
        message: "category is required"
    }),
})

const CompanionForm = ({ categories, initialData }: CompanionFormProps) => {
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            description: "",
            instructions: "",
            seed: "",
            src: "",
            categoryId: undefined
        }
    })

    const isLoading = form.formState.isSubmitting

    
  return (
    <div>CompanionForm</div>
  )
}

export default CompanionForm