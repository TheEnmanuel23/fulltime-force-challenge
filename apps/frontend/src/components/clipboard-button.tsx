"use client";

import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { type ReactElement, useState } from "react";

export function ClipBoardButton({ text }: { text: string }): ReactElement {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied((prev) => !prev);
      })
      .catch(() => {
        setCopied(false);
      });
  };

  return (
    <button
      className="text-xs text-muted-foreground dark:text-gray-300"
      onClick={copyToClipboard}
      type="button"
    >
      {copied ? (
        <CheckIcon className="h-4 w-4 text-green-600" />
      ) : (
        <CopyIcon className="h-4 w-4" />
      )}
    </button>
  );
}
