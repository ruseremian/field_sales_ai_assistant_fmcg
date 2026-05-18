"use client";

import { Send } from "lucide-react";
import { useState, useTransition } from "react";
import type { AssistantMessage, UserRole } from "@/lib/types/domain";
import { suggestedQuestions } from "@/lib/services/assistantService";

export function AssistantChat({
  role,
  answerQuestion
}: {
  role: UserRole;
  answerQuestion: (question: string, role: "sales_rep" | "manager") => Promise<string>;
}) {
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        role === "manager"
          ? "Ask about execution, opportunities, route completion, ROI, or regional performance."
          : "Ask about recommended visits, route priorities, store explanations, or opportunities."
    }
  ]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();

  function submit(question: string) {
    if (!question.trim()) return;
    setInput("");
    const userMessage: AssistantMessage = { id: crypto.randomUUID(), role: "user", content: question };
    setMessages((current) => [...current, userMessage]);
    startTransition(async () => {
      const answer = await answerQuestion(question, role === "manager" ? "manager" : "sales_rep");
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", content: answer }]);
    });
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
      <section className="overflow-hidden rounded-3xl border border-border bg-white shadow-soft">
        <div className="border-b border-border bg-muted-surface px-5 py-4">
          <p className="text-sm font-semibold text-ink">Field Sales Copilot</p>
          <p className="mt-1 text-xs text-muted-foreground">Mock grounded answers from curated sales, route, and visit data.</p>
        </div>
        <div className="max-h-[590px] min-h-[460px] overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(0,75,147,0.08),transparent_28rem)] p-4">
          <div className="grid gap-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[86%] rounded-lg px-4 py-3 text-sm ${
                  message.role === "user"
                    ? "ml-auto bg-brand-blue text-white shadow-sm"
                    : "mr-auto border border-border bg-blue-soft text-slate-800 shadow-sm"
                }`}
              >
                {message.content}
              </div>
            ))}
            {isPending ? <div className="mr-auto rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-500">Thinking...</div> : null}
          </div>
        </div>
        <form
          className="flex gap-2 border-t border-slate-200 bg-white p-3"
          onSubmit={(event) => {
            event.preventDefault();
            submit(input);
          }}
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="touch-target min-w-0 flex-1 rounded-xl border border-slate-200 px-3 text-sm outline-none ring-field/20 focus:ring-4"
            placeholder="Ask a field sales question"
          />
          <button className="touch-target inline-flex items-center justify-center rounded-xl bg-field px-4 text-white shadow-sm" type="submit" aria-label="Send">
            <Send size={18} />
          </button>
        </form>
      </section>

      <aside className="rounded-3xl border border-border bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Suggested questions</h2>
        <div className="mt-3 grid gap-2">
          {suggestedQuestions.map((question) => (
            <button
              key={question}
              onClick={() => submit(question)}
              className="touch-target rounded-xl border border-border bg-white px-3 py-2 text-left text-sm font-medium leading-5 text-slate-700 shadow-sm transition hover:border-brand-blue hover:bg-blue-soft"
            >
              {question}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
