"use client";

import { FormEvent, useState, useRef } from "react";

import Form from "next/form";

import { useMutation } from "@tanstack/react-query";
import { fetchChatbotReply, Reply } from "@/app/lib/chatbot/getReply";

export function Chatbot() {
  const [query, setQuery] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);

  const mutation = useMutation({
    mutationFn: fetchChatbotReply,
    onSuccess: (data: Reply) => {
      // console.log(data.message);
      setQuery(data.message);
    },
    onError: () => {
      setQuery("An error occurred");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const query = formData.get("query") as string;
      mutation.mutate({ query: query });
    }
  };

  return (
    <div>
      <h1>Chatbot</h1>
      <Form onSubmit={handleSubmit} ref={formRef} action={""}>
        <input
          className="bg-white-200 border-2"
          type="text"
          name="query"
          id="query"
        ></input>
        <button className="border-2 rounded-sm p-8 pt-3 pb-3">Submit</button>
      </Form>
      {mutation.isPending && <p>Waiting for results...</p>}
      {mutation.isError && <p>Error: {mutation.error?.message}</p>}
      {mutation.isSuccess && <p>{query}</p>}
    </div>
  );
}
