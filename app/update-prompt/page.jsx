"use client";

import {useEffect, useState} from "react"
import {useRouter, useSearchParams} from "next/navigation"
import Form from "@components/Form"


const EditPrompt = () => {
  const router = useRouter();
  //const {data : session} = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({prompt: "", tag: ""});
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id"); 

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt : data.prompt,
        tag : data.tag,
      })
    }  
    if (prompt.id) getPromptDetails() 
  },[promptId])
  
 
  const editPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    if (!promptId) return alert("Missing Prompt Id");
    try {
      const response 
        = await fetch(`/api/prompt/${promptId}`, 
          { method: "PATCH", 
            body : JSON.stringify({prompt: post.prompt, 
            tag: post.tag
      })});
      if (response.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
      
  }  
  
  return (
   <Form 
      type ="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}/>
  )
}

export default EditPrompt;
