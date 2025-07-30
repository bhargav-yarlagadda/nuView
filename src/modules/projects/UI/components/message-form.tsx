import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { useState } from "react"
import z from "zod"
import { toast } from "sonner"
import TextareaAutoSize from "react-textarea-autosize"
import { ArrowUp,Loader2Icon } from "lucide-react"

interface Props{
    projectId:string
}
const MessageForm = ({projectId}:Props)=>{
    return(
        <div></div>
    )

}
export default MessageForm