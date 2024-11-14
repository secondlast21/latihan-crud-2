import { auth } from "~/server/auth";
import { MyPosts } from "../_components/my-posts";
import { api, HydrateClient } from "~/trpc/server";
import DashboardLayout from "../_components/layouts/dashboardLayout";
import { AddPost } from "../_components/add-post";

export default async function Home() {
  const session = await auth();

  console.log(session)

  if (session?.user) {
    void api.post.getAllByUser.prefetch();
  }

  return (
    <HydrateClient>
      <DashboardLayout>
        <AddPost />
        <main className="flex min-h-screen flex-col items-center justify-center">
          {session?.user ? <MyPosts /> : <h1>You are not logged in</h1>}
        </main>
      </DashboardLayout>
    </HydrateClient>
  );
}
