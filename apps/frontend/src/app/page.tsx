import { trpc } from "../trpc";

export default async function Home() {
  const response = await trpc.hello.query({ name: "enmanuel" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {response}
    </main>
  );
}
