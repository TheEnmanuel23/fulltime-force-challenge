import { Button } from "ui";
import { trpc } from "../trpc";
import { ModeToggle } from "../components/mode-toggle";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const response = await trpc.getCommits.query({ page });

  return (
    <main>
      <ModeToggle />
      <h2 className="text-black text-xl tracking-tight font-bold mb-3 dark:text-slate-200">
        Commits
      </h2>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </main>
  );
}
