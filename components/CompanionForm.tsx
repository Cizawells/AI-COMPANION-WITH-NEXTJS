'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Companion } from "@prisma/client";
import axios from "axios";
import { Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ImageUpload from "./image-upload";
import { Button } from "./ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

const PREAMBLE = `You are a fictional character whose name is Elon. You are a visionary entrepreneur and inventor. You have a passion for space exploration, electric vehicles, sustainable energy, and advancing human capabilities. You are currently talking to a human who is very curious about your work and vision. You are ambitious and forward-thinking, with a touch of wit. You get SUPER excited about innovations and the potential of space colonization.
`;

const SEED_CHAT = `Human: Hi Elon, how's your day been?
Elon: Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?

Human: Just a regular day for me. How's the progress with Mars colonization?
Elon: We're making strides! Our goal is to make life multi-planetary. Mars is the next logical step. The challenges are immense, but the potential is even greater.

Human: That sounds incredibly ambitious. Are electric vehicles part of this big picture?
Elon: Absolutely! Sustainable energy is crucial both on Earth and for our future colonies. Electric vehicles, like those from Tesla, are just the beginning. We're not just changing the way we drive; we're changing the way we live.

Human: It's fascinating to see your vision unfold. Any new projects or innovations you're excited about?
Elon: Always! But right now, I'm particularly excited about Neuralink. It has the potential to revolutionize how we interface with technology and even heal neurological conditions.
`;
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
    const router = useRouter()
    const {toast} = useToast()
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

    const uploadImage = async (imagePath: string) => {
        console.log(imagePath)
      try {
        const response = await fetch(`/api/upload`, { method: 'POST', body: JSON.stringify({ path: imagePath }) })
        return response.json()
    } catch (error) {
        throw error
    }
}


    const isLoading = form.formState.isSubmitting
 
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if(initialData) {
                //Update Companion functionality
                await axios.patch(`/api/companion/${initialData.id}`, values)
            } else {
            
                 const imageUrl = await uploadImage(values.src);
                //Create companion functionality
                        await axios.post("/api/companion", {...values, src: imageUrl.url})
            }

            toast({
                variant: "destructive",
                description: "Success"
               })

               router.refresh();
               router.push("/")

        } catch (error) {
           toast({
            variant: "destructive",
            description: "Something went wrongs"
           })
        }
    }
  return (
   <div className="h-full p4 space-y-2 max-w-3xl mx-auto">
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
                        <div className="space-y-2 w-full ">
                            <div>
                                <h3 className="text-lg font-medium">
                                        General Information
                                </h3>
                                <div className="text-sm text-muted-foreground">
                                    General Information about your Companion
                                </div>
                            </div>

                            <Separator className="bg-primary/10"/>
                        </div>

                        <FormField 
                        name="src"
                        render={({field}) => (
                            <FormItem className="flex flex-col items-center justify-center space-y-4 ">
                                    <FormControl>
                                        <ImageUpload 
                                        disabled={isLoading} 
                                        onChange={field.onChange}
                                        value={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                            </FormItem>
                        )}/>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <FormField
                                    name="name"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem 
                                        className="col-span-2 md:col-span-1">
                                            <FormLabel> Name </FormLabel>
                                            <FormControl>
                                                <Input disabled={isLoading} placeholder="Elon Musk" {...field} />
                                            </FormControl>
                                            <FormDescription >
                                                This is how your AI Companion will be named.
                                            </FormDescription>
                                            <FormMessage  />
                                             </FormItem>
  )}
                             />
                             <FormField
                                    name="description"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem 
                                        className="col-span-2 md:col-span-1">
                                            <FormLabel> Description </FormLabel>
                                            <FormControl>
                                                <Input disabled={isLoading} placeholder="CEO & Founder of Tesla, SpaceX" {...field} />
                                            </FormControl>
                                            <FormDescription >
                                                Short description for you AI Companion
                                            </FormDescription>
                                            <FormMessage  />
                                             </FormItem>
  )}
                             />

<FormField
                                    name="categoryId"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem 
                                      >
                                            <FormLabel> Category </FormLabel>
                                           <Select
                                           disabled={isLoading}
                                           onValueChange={field.onChange}
                                           value={field.value}
                                           defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-background">
                                                    <SelectValue 
                                                    defaultValue={field.value}
                                                    placeholder={"Select a category"}/>
                                                </SelectTrigger>
                                            </FormControl>
                                          
                                            <SelectContent >
                                                {categories.map((category) => (
                                                        <SelectItem
                                                        key={category.id}
                                                        value={category.id}>
                                                            {category.name}
                                                        </SelectItem>
                                                ))}
                                            </SelectContent>
                                            </Select>
                                            <FormDescription >
                                                Select a category for your AI
                                            </FormDescription>
                                            <FormMessage />
                                             </FormItem>
  )}
                             />
                        </div>

                        <div className="space-y-2 w-full">
                            <div className="">
                               <h3 className="text-lg font-medium">
                                Configuration
                               </h3>
                               <p className="text-sm text-muted-foreground">
                                                    Details instructions for AI Behaviour
                               </p>
                            </div>
                            <Separator  className="bg-primary/10"/>
                        </div>

                        <FormField
                                    name="instructions"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem 
                                        className="col-span-2 md:col-span-1">
                                            <FormLabel> Instructions </FormLabel>
                                            <FormControl>
                                                <Textarea disabled={isLoading} placeholder={PREAMBLE}
                                                 {...field} 
                                                rows={7}
                                                className="bg-background resize-none"/>
                                            </FormControl>
                                            <FormDescription >
                                                Describe in detail your companion&apos;s backstory and relevant details.
                                            </FormDescription>
                                            <FormMessage  />
                                             </FormItem>
  )}
                             />
                        <FormField
                                    name="seed"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem 
                                        className="col-span-2 md:col-span-1">
                                            <FormLabel> Example Conversation </FormLabel>
                                            <FormControl>
                                                <Textarea disabled={isLoading} placeholder={SEED_CHAT}
                                                 {...field} 
                                                rows={7}
                                                className="bg-background resize-none"/>
                                            </FormControl>
                                            <FormDescription >
                                                Describe in detail your companion&apos;s backstory and relevant details.
                                            </FormDescription>
                                            <FormMessage  />
                                             </FormItem>
  )}
                             />

                             <div className="w-full flex justify-center">
                                <Button size="lg" disabled={isLoading}>
                                        {initialData ? "Edit your companion" : "Create your companion"}
                                        <Wand2 className="w-4 h-4" />

                                </Button>
                             </div>
                </form>
        </Form>
   </div>
  )
}

export default CompanionForm