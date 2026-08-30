'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CHATBOT_ROOT_ID,
  CHATBOT_TYPING_DELAY_MS,
  chatbotTree,
} from '@/config/chatbot.config';
import type { ChatbotEntry, ChatbotOption } from '@/types/chatbot';

/**
 * Decision tree navigation with a simulated typing rhythm.
 *
 * Every bot answer is queued behind a pause so the panel reads like a real
 * conversation instead of dumping the whole node at once. The history holds
 * ids, never text: translating is the UI's job.
 */
export const useChatbot = () => {
  const [history, setHistory] = useState<ChatbotEntry[]>([]);
  const [currentNodeId, setCurrentNodeId] = useState(CHATBOT_ROOT_ID);
  const [isTyping, setIsTyping] = useState(true);

  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastEntryIdRef = useRef(0);

  const createEntryId = () => {
    lastEntryIdRef.current += 1;
    return lastEntryIdRef.current;
  };

  const queueBotEntry = useCallback((nodeId: string) => {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    setIsTyping(true);
    typingTimeoutRef.current = setTimeout(() => {
      setHistory((entries) => [
        ...entries,
        { id: createEntryId(), role: 'bot', nodeId },
      ]);
      setCurrentNodeId(nodeId);
      setIsTyping(false);
    }, CHATBOT_TYPING_DELAY_MS);
  }, []);

  useEffect(() => {
    queueBotEntry(CHATBOT_ROOT_ID);
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [queueBotEntry]);

  const selectOption = useCallback(
    (option: ChatbotOption) => {
      if (isTyping) return;
      if (!chatbotTree[option.next]) return;

      setHistory((entries) => [
        ...entries,
        { id: createEntryId(), role: 'user', optionId: option.id },
      ]);
      queueBotEntry(option.next);
    },
    [isTyping, queueBotEntry],
  );

  const restart = useCallback(() => {
    setHistory([]);
    setCurrentNodeId(CHATBOT_ROOT_ID);
    queueBotEntry(CHATBOT_ROOT_ID);
  }, [queueBotEntry]);

  return {
    history,
    currentNode: chatbotTree[currentNodeId],
    isTyping,
    selectOption,
    restart,
  };
};
