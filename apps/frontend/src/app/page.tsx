import { ModeToggle } from "../components/mode-toggle";
import { trpc } from "../trpc";
import { Participants } from "../components/participants";
import { ClipBoardButton } from "../components/clipboard-button";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { data } = await trpc.getCommits.query({ page });

  return (
    <main className="flex justify-center py-10">
      <div className="space-y-10 w-full px-10">
        <header className="space-y-6 flex flex-col items-center">
          <ModeToggle />
          <h2 className="text-black text-xl tracking-tight font-bold mb-3 dark:text-slate-200">
            Commits
          </h2>
        </header>
        <div>
          <ul className="divide-y divide-gray-300 border border-gray-300 dark:border-gray-800 dark:divide-gray-800 rounded-md">
            {data.map((item) => (
              <li key={item.sha}>
                <div className="flex justify-between items-center py-2 px-4">
                  <div>
                    <a
                      className="text-sm font-semibold hover:underline hover:text-blue-600"
                      href={item.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {item.message}
                    </a>
                    <Participants
                      author={item.author}
                      committer={item.committer}
                      date={item.date}
                    />
                  </div>
                  <div className="hidden md:flex border border-gray-300 dark:border-gray-800 h-fit items-center justify-between rounded-md">
                    <div className="py-1 px-2 rounded-l-md flex">
                      <ClipBoardButton text={item.url} />
                    </div>
                    <div className="py-1 px-2 border-l border-gray-300 dark:border-gray-800 rounded-r-md flex">
                      <a
                        className="text-xs text-muted-foreground dark:text-gray-300"
                        href={item.url}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {item.sha.substring(0, 7)}
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
