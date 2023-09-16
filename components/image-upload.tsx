"use client"

interface ImageUploadProps {
    value: string;
    onChange: (src: string) => void;
    disabled?: boolean
}