"use client";

import { api } from "~/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function AllPosts() {
  const [allPosts] = api.post.getAll.useSuspenseQuery();

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
          </Card>
        ))}
      </div>
    </>
  );
}
