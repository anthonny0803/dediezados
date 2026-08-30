/**
 * Chatbot contract shared by the config tree, the navigation hook and the UI.
 *
 * Nodes carry structure only: every node declares where its text comes from,
 * either an approved answer of the `faq` namespace or its own message in the
 * `chatbot` namespace. The conversation history stores ids instead of resolved
 * text so the hook stays free of i18n and the components do the translating.
 */

export type ChatbotAction = 'contact';

export type ChatbotMessageSource =
  | { kind: 'faq'; index: number }
  | { kind: 'message' };

export interface ChatbotOption {
  id: string;
  next: string;
}

export interface ChatbotNode {
  id: string;
  source: ChatbotMessageSource;
  action?: ChatbotAction;
  options: ChatbotOption[];
}

export type ChatbotTree = Record<string, ChatbotNode>;

export interface ChatbotBotEntry {
  id: number;
  role: 'bot';
  nodeId: string;
}

export interface ChatbotUserEntry {
  id: number;
  role: 'user';
  optionId: string;
}

export type ChatbotEntry = ChatbotBotEntry | ChatbotUserEntry;
