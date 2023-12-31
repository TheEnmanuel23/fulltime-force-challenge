import { Separator } from "ui";
import type { ReactElement } from "react";
import { ActionButton } from "./action-button";

export function Actions({
  hasNext,
  hasPrev,
  page,
}: {
  hasNext: boolean;
  hasPrev: boolean;
  page: number;
}): ReactElement {
  const hostname = process.env.URL_APP;

  return (
    <div className="flex justify-center">
      <div className="border border-gray-300 dark:border-gray-800 flex rounded-lg">
        <ActionButton
          className="rounded-l-lg"
          disabled={!hasPrev}
          href={`${hostname}?page=${page - 1}`}
          label="Newer"
        />

        <Separator orientation="vertical" />
        <ActionButton
          className="rounded-r-lg"
          disabled={!hasNext}
          href={`${hostname}?page=${page + 1}`}
          label="Older"
        />
      </div>
    </div>
  );
}
