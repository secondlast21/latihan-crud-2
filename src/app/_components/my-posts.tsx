"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export function MyPosts() {
  const [allPosts] = api.post.getAllByUser.useSuspenseQuery();
  const [deletingPostId, setDeletingPostId] = useState<number | undefined>();

  const utils = api.useUtils();
  const deletePost = api.post.deleteById.useMutation({
    onMutate: (variables) => {
      setDeletingPostId(variables.id);
    },
    onSuccess: async () => {
      await utils.post.invalidate();
      setDeletingPostId(undefined);
    },
    onError: () => {
      setDeletingPostId(undefined);
    },
  });

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-8 p-8 lg:justify-start">
        {allPosts.map((item) => (
          <Card key={item.id} className="min-w-80 lg:min-w-60">
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.author}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              <p>{item.content}</p>
            </CardContent>
            <CardContent className="text-sm">
              <Button
                onClick={() => deletePost.mutate({ id: item.id })}
                disabled={deletingPostId === item.id}
              >
                {deletingPostId === item.id ? "Deleting..." : "Delete"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
