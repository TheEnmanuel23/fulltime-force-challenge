import { CopyIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { ModeToggle } from "../components/mode-toggle";
import { trpc } from "../trpc";
import { Participants } from "../components/participants";

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
                    <div className="flex gap-2 text-sm items-center">
                      <Participants
                        author={item.author}
                        committer={item.committer}
                      />
                      <p className="font-semibold text-xs">
                        {item.author.username}
                      </p>
                      <p className="text-muted-foreground text-xs space-x-1">
                        <span>commited</span>
                        <span>
                          {format(new Date(item.date), "MMM do, yyyy")}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:flex border border-gray-300 dark:border-gray-800 h-fit flex items-center justify-between rounded-md">
                    <div className="px-1 rounded-l-md">
                      <button className="text-xs text-muted-foreground dark:text-gray-300">
                        {/* <CheckIcon className="h-4 w-4 text-green-600" /> */}
                        <CopyIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="px-1 border-l border-gray-300 dark:border-gray-800 rounded-r-md">
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
