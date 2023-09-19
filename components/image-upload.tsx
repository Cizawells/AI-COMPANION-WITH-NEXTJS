"use client"

import Image from "next/image";

interface ImageUploadProps {
    value: string;
    onChange: (src: string) => void;
    disabled?: boolean
}

import { ChangeEvent, useEffect, useState } from 'react';

const ImageUpload = ({value, onChange, disabled} : ImageUploadProps) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    })

    if(!isMounted) {
        return null
    }


     const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => { 
    e.preventDefault();

    const file = e.target.files?.[0];
    if (!file) return;

    console.log("whatt")
    if (!file.type.includes('image')) {
      return alert("Please upload an image file")
    }

    const reader = new FileReader();
    reader.readAsDataURL(file)

    reader.onload = () => {
      const result = reader.result as string;
      console.log(result)
      onChange( result)
    }
    }
    

  return (
    <div className=" flex justify-start w-full lg:min-h-400 min-h-200 relative">
        {/* <CldUploadButton
        onUpload={(result: any) => onChange(result.info.secure_url)}
        options={{
            maxFiles: 1
        }}
        >
            <div className="p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center">
                <div className="relative h-40 w-40">
                    <Image 
                    fill
                    alt="Upload"
                    src={value || "/placeholder.svg"}
                    className="rounded-lg object-cover"/>
                </div>
            </div>

        </CldUploadButton> */}

          <div className="flex justify-start ">
        <label htmlFor="poster" className="flexCenter ">
          {!value && 'Choose a poster for your project'}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={value !== null}
          className="form_image-input"
          onChange={handleChangeImage}
        />

        {value && (
          <Image
            src={value}
            className="sm:p-10 object-contain z-20"
            alt="Project poster"
            fill

          />
        )}
      </div>
    </div>
  )
}

export default ImageUpload