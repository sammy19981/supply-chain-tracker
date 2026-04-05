import React from "react";

function formatInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <strong key={match.index} className="font-semibold text-gray-900">
        {match[1]}
      </strong>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export function renderAIContent(content: string) {
  const lines = content.split("\n");

  return (
    <div className="space-y-1 text-sm text-gray-700">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (trimmed === "") return null;

        // Section heading: full line wrapped in **...**
        if (/^\*\*[^*]+\*\*$/.test(trimmed)) {
          return (
            <h4
              key={i}
              className="mb-1 mt-5 border-b pb-1 text-sm font-semibold text-gray-900 first:mt-0"
            >
              {trimmed.replace(/\*\*/g, "")}
            </h4>
          );
        }

        // Numbered list item
        if (/^\d+\.\s/.test(trimmed)) {
          const text = trimmed.replace(/^\d+\.\s*/, "");
          const num = trimmed.match(/^(\d+)\./)?.[1];
          return (
            <div key={i} className="flex gap-2 py-0.5 pl-2">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-semibold text-purple-700">
                {num}
              </span>
              <p className="leading-relaxed">{formatInlineMarkdown(text)}</p>
            </div>
          );
        }

        // Bullet point
        if (/^[-•]\s/.test(trimmed)) {
          const text = trimmed.replace(/^[-•]\s*/, "");
          return (
            <div key={i} className="flex gap-2 py-0.5 pl-2">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-400" />
              <p className="leading-relaxed">{formatInlineMarkdown(text)}</p>
            </div>
          );
        }

        // Regular paragraph
        return (
          <p key={i} className="leading-relaxed">
            {formatInlineMarkdown(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
