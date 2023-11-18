import Link from "next/link";
import type { ReactElement } from "react";
import { cn } from "ui/src/lib/utils";

export function ActionButton({
  disabled,
  href,
  className,
}: {
  disabled: boolean;
  href: string;
  className: string;
}): ReactElement {
  return (
    <div
      className={cn(className, {
        "bg-gray-200 dark:bg-gray-800": disabled,
      })}
    >
      {!disabled ? (
        <Link
          className="block text-sm text-muted-foreground dark:text-gray-300 p-2"
          href={href}
        >
          Older
        </Link>
      ) : (
        <span className="block text-sm text-muted-foreground dark:text-gray-300 p-2 ">
          Older
        </span>
      )}
    </div>
  );
}
