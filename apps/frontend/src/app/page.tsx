import { Button } from "ui";
import { trpc } from "../trpc";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const response = await trpc.getCommits.query({ page });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>click here</Button>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </main>
  );
}
