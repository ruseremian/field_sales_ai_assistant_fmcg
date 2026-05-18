import { AppShell } from "@/components/layout/AppShell";
import { AssistantChat } from "@/components/assistant/AssistantChat";
import { getMockAssistantAnswer } from "@/lib/services/assistantService";
import type { UserRole } from "@/lib/types/domain";

export default async function AssistantPage({
  searchParams
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role: requestedRole } = await searchParams;
  const role: UserRole = requestedRole === "manager" ? "manager" : "sales_rep";

  async function answerQuestion(question: string, answerRole: "sales_rep" | "manager") {
    "use server";
    return getMockAssistantAnswer(question, answerRole);
  }

  return (
    <AppShell
      role={role}
      title="AI assistant"
      subtitle="This mock assistant returns grounded sample answers. Future versions should use OpenAI with approved Databricks marts and role-based access."
    >
      <AssistantChat role={role} answerQuestion={answerQuestion} />
    </AppShell>
  );
}
