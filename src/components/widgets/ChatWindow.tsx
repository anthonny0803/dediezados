'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { chatbotTree } from '@/config/chatbot.config';
import type { ChatbotEntry } from '@/types/chatbot';

interface FaqAnswer {
  answer: string;
}

interface ChatWindowProps {
  history: ChatbotEntry[];
  isTyping: boolean;
}

export const ChatWindow = ({ history, isTyping }: ChatWindowProps) => {
  const t = useTranslations('chatbot');
  const tFaq = useTranslations('faq');
  const faqItems = tFaq.raw('items') as FaqAnswer[];

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    list.scrollTop = list.scrollHeight;
  }, [history, isTyping]);

  const resolveBotMessage = (nodeId: string) => {
    const { source } = chatbotTree[nodeId];
    if (source.kind === 'message') return t(`nodes.${nodeId}.message`);
    return faqItems[source.index].answer;
  };

  return (
    <div
      ref={listRef}
      aria-live="polite"
      className="flex flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-4 py-4"
    >
      {history.map((entry) =>
        entry.role === 'bot' ? (
          <p
            key={entry.id}
            className="max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-secondary px-4 py-3 text-sm leading-relaxed text-foreground"
          >
            {resolveBotMessage(entry.nodeId)}
          </p>
        ) : (
          <p
            key={entry.id}
            className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-gradient-primary px-4 py-3 text-sm font-medium text-primary-foreground"
          >
            {t(`options.${entry.optionId}`)}
          </p>
        ),
      )}

      {isTyping ? (
        <p className="flex max-w-[85%] items-center gap-1.5 self-start rounded-2xl rounded-bl-sm bg-secondary px-4 py-4">
          <span className="sr-only">{t('typing')}</span>
          <span aria-hidden="true" className="chat-typing-dot h-2 w-2 rounded-full bg-muted-foreground" />
          <span aria-hidden="true" className="chat-typing-dot h-2 w-2 rounded-full bg-muted-foreground" />
          <span aria-hidden="true" className="chat-typing-dot h-2 w-2 rounded-full bg-muted-foreground" />
        </p>
      ) : null}
    </div>
  );
};
