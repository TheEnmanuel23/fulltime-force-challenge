import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import type { ReactElement } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "ui";
import { cn } from "ui/src/lib/utils";

export interface Participant {
  name: string;
  avatar: string;
  username: string;
  profile: string;
}

export function ParticipantHoverCard({
  participant,
  className,
}: {
  participant: Participant;
  className: string;
}): ReactElement {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Image
          alt={participant.name}
          className={cn("rounded-full border", className)}
          height={22}
          src={participant.avatar}
          width={22}
        />
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex items-center gap-4">
          <Image
            alt={participant.name}
            className={cn("rounded-full border", className)}
            height={80}
            src={participant.avatar}
            width={80}
          />

          <div className="space-y-2">
            <h4 className="text-lg leading-none">{participant.name}</h4>
            <h4 className="leading-none text-muted-foreground">
              @{participant.username}
            </h4>
            <a
              className="block underline"
              href={participant.profile}
              rel="noreferrer"
              target="_blank"
            >
              View Profile <ExternalLinkIcon className="inline" />
            </a>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
