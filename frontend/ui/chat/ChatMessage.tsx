export default ChatMessage;
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import atomdark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import MessageOptions from "./MessageOptions";

function ChatMessage({ message, isSelf, isTmpMessage = false }) {
  return (
    <div className={`relative`}>
      <div className="flex flex-col relative">
        <div
          className={`flex flex-row content-center items-center pt-1 group relative`}
        >
          <div
            className={`flex group w-full content-center items-center  relative hover:bg-accent rounded-xl px-1 ${
              isSelf ? "justify-end" : "justify-start"
            }`}
          >
            <MessageOptions message={message} />
            <div
              className={`w-fit bg-base-300 p-1 px-2 rounded-xl max-w-screen overflow-x-auto relative hover:bg-base-200 shadow-md`}
            >
              <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                  pre(props) {
                    return <span {...props} />;
                  },
                  h3(props) {
                    return <h3 className="text-xl" {...props} />;
                  },
                  code(props) {
                    const { children, className, node, ...rest } = props;
                    const match = /language-(\w+)/.exec(className || "");
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
              <div className="flex flex-row justify-end text-xs gap-2">
                {!message?.read && (
                  <div className="badge badge-outline badge-info">unread</div>
                )}
                {isTmpMessage && (
                  <div className="badge badge-outline badge-info">sending</div>
                )}
                {new Date(message.created)
                  .toISOString()
                  .slice(0, 19)
                  .replace("T", " ")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
