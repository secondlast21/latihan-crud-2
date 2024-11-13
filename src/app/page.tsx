import { api, HydrateClient } from "~/trpc/server";
import DashboardLayout from "./_components/layouts/dashboardLayout";
import { AllPosts } from "./_components/all-posts";

export default async function Home() {
  void api.post.getAll.prefetch();

  return (
    <HydrateClient>
      <DashboardLayout>
        <main className="flex min-h-screen flex-col items-center justify-center">
          <AllPosts />
        </main>
      </DashboardLayout>
    </HydrateClient>
  );
}
