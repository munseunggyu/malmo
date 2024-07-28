import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface IProps {
  content: string;
}

export default function MarkdownViewer({ content }: IProps) {
  return (
    <ReactMarkdown
      className={"prose prose-white "}
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node, ...props }) => (
          <a {...props} target='_blank' rel='noopener noreferrer' />
        )
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
