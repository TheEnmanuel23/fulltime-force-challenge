"use client";

import Image from "next/image";

interface Participant {
  name: string;
  avatar: string;
  username: string;
}

export function Participants({
  author,
  committer,
}: {
  author: Participant;
  committer: Participant;
}) {
  return (
    <div className="flex cursor-pointer group">
      <Image
        alt={author.name}
        className="rounded-full z-10 border"
        height={22}
        src={author.avatar}
        width={22}
      />
      {author.username !== committer.username && (
        <Image
          alt={committer.name}
          className="rounded-full border ml-[-10px] group-hover:ml-0"
          height={22}
          src={committer.avatar}
          width={22}
        />
      )}
    </div>
  );
}
