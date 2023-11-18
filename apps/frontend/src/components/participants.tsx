"use client";

import { format } from "date-fns";
import type { Participant } from "./participant-hover-card";
import { ParticipantHoverCard } from "./participant-hover-card";

export function Participants({
  author,
  committer,
  date,
}: {
  author: Participant;
  committer: Participant;
  date: string;
}) {
  "rounded-full z-10 border";
  const committerAndAuthorAreDifferent = author.username !== committer.username;

  return (
    <div className="flex gap-2 text-sm items-center">
      <div className="flex cursor-pointer group">
        <ParticipantHoverCard className="z-10" participant={author} />
        {committerAndAuthorAreDifferent ? (
          <ParticipantHoverCard
            className="ml-[-10px] group-hover:ml-0"
            participant={committer}
          />
        ) : null}
      </div>
      <p className="space-x-1">
        {committerAndAuthorAreDifferent ? (
          <>
            <span className="font-semibold text-xs">{author.username}</span>
            <span className="text-muted-foreground text-xs">authored and</span>
            <span className="font-semibold text-xs">{committer.username}</span>
            <span className="text-muted-foreground text-xs">commited</span>
          </>
        ) : (
          <>
            <span className="font-semibold text-xs">{committer.username}</span>
            <span className="text-muted-foreground text-xs">commited</span>
          </>
        )}
        <span className="text-muted-foreground text-xs space-x-1">
          {format(new Date(date), "MMM do, yyyy")}
        </span>{" "}
      </p>
    </div>
  );
}
