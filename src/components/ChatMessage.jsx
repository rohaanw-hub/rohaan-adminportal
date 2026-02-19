import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";
  const time = message.timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`message ${isUser ? "user" : "assistant"}`}>
      {!isUser && <div className="avatar assistant-avatar">AI</div>}
      <div className="bubble-wrapper">
        <div className={`bubble ${isUser ? "user-bubble" : "assistant-bubble"}`}>
          {isUser ? (
            <p>{message.content}</p>
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          )}
        </div>
        <div className={`timestamp ${isUser ? "right" : "left"}`}>{time}</div>
      </div>
      {isUser && <div className="avatar user-avatar">PM</div>}
    </div>
  );
}
