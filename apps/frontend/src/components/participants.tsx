"use client";

import type { Participant } from "./participant-hover-card";
import { ParticipantHoverCard } from "./participant-hover-card";

export function Participants({
  author,
  committer,
}: {
  author: Participant;
  committer: Participant;
}) {
  "rounded-full z-10 border";
  return (
    <div className="flex cursor-pointer group">
      <ParticipantHoverCard className="z-10" participant={author} />
      {author.username !== committer.username && (
        <ParticipantHoverCard
          className="ml-[-10px] group-hover:ml-0"
          participant={committer}
        />
      )}
    </div>
  );
}
