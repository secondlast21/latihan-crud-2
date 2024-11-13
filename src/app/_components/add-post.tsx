"use client";

import { api } from "~/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const formSchema = z.object({
  name: z.string().min(1),
  content: z.string().min(1),
  author: z.string().min(1),
});

export function AddPost() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      content: "",
      author: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    createPost.mutate(values);
  }

  const utils = api.useUtils();

  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      (document.getElementById("my_modal_2") as HTMLDialogElement).close();
    },
  });

  return (
    <>
      <div className="sticky top-0 z-10 flex justify-end bg-white p-4">
        <Button
          onClick={() =>
            (
              document.getElementById("my_modal_2") as HTMLDialogElement
            ).showModal()
          }
        >
          Add a post
        </Button>
      </div>
      <div className="flex w-full max-w-xs items-center justify-center">
        <dialog id="my_modal_2" className="rounded-md p-4">
          <div className="min-w-80">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title" {...field} />
                      </FormControl>
                      <FormDescription>Your post title</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Input placeholder="Content" {...field} />
                      </FormControl>
                      <FormDescription>Your post content</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fallback Author</FormLabel>
                      <FormControl>
                        <Input placeholder="Fallback Author Name" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your post fallback author Name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={createPost.isPending}>
                  {createPost.isPending ? "Adding Post" : "Submit"}
                </Button>
              </form>
            </Form>
          </div>
          <form method="dialog" className="flex justify-end">
            <Button>Close</Button>
          </form>
        </dialog>
      </div>
    </>
  );
}
