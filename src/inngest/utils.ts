import Sandbox from "@e2b/code-interpreter";
import { AgentResult, TextMessage } from "@inngest/agent-kit";

export async function getSandBox(sandBoxId:string){
    const sandBox = await Sandbox.connect(sandBoxId)
    return sandBox
}

export function lastAssistantTextMessageContent(result: AgentResult) {
  const lastAssistantTextMessageContentIndex = result.output.findLastIndex(
    (message) => message.role === "assistant"
  );

  if (lastAssistantTextMessageContentIndex === -1) return undefined;

  const message = result.output[lastAssistantTextMessageContentIndex] as
    | TextMessage
    | undefined;

  if (!message?.content) return undefined;

  // Handle string content
  if (typeof message.content === "string") {
    return message.content;
  }

  // Handle array content
  return message.content.map((c) => c.text).join("");
}
