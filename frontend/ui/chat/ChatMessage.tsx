export default ChatMessage;
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import atomdark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import MessageOptions from "./MessageOptions";

function ChatMessage({ message, isSelf }) {
  return (
    <div className={`max-w-full relative`}>
      <div className="flex flex-col relative">
        <div
          className={`flex flex-row content-center items-center pt-1 relative ${
            isSelf ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`w-fit bg-base-300 p-1 px-2 rounded-xl relative group hover:bg-secondary-content max-w-full shadow-md ${
              message.read ? "" : "border border-primary"
            }`}
          >
            <MessageOptions message={message} />
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                h3(props) {
                  return <h3 className="text-xl" {...props} />;
                },
                code(props) {
                  const { children, className, node, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || "");
                  console.log("CODE", match);
                  return (
                    <SyntaxHighlighter
                      language={match ? match[1] : null}
                      style={atomdark}
                    >
                      {children}
                    </SyntaxHighlighter>
                  );
                },
              }}
            >
              {message.text}
            </Markdown>
            <div className="flex flex-row justify-end text-xs">
              {new Date(message.created)
                .toISOString()
                .slice(0, 19)
                .replace("T", " ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
