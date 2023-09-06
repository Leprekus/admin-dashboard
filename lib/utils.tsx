import { type ClassValue, clsx } from "clsx"
import { ClipboardCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const onCopy = (text: string) => {
  navigator.clipboard.writeText(text)
  toast('Copied', { icon: <ClipboardCheck/>, position: 'bottom-right',  })
}

