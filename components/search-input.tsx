'use client'

import { useDebounce } from "@/app/hooks/use-debounce"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"
import { ChangeEventHandler, useEffect, useState } from "react"
import { Input } from "./ui/input"

const SearchInput = () => {

    const router = useRouter();
    const searchParams = useSearchParams()

    const categoryId = searchParams.get("categoryId");
    const name = searchParams.get("name");
    const [value, setValue] = useState(name || "")

    const debouncedValue = useDebounce<string>(value, 500)
    console.log(debouncedValue)
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
    }

    useEffect(() => {
        const query = {
            name: debouncedValue,
            categoryId: categoryId,
        }

        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, { skipEmptyString: true, skipNull: true })
        router.push(url)
    }, [debouncedValue, router, categoryId])
  return (
      <div className='relative'>
          <Search className="absolute h-4 w-4 top-3 lef-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-10 bg-primary/10" onChange={onChange} value={value}/>
    </div>
  )
}

export default SearchInput