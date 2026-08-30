'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import type { ChatbotNode, ChatbotOption } from '@/types/chatbot';

interface ChatOptionsProps {
  node: ChatbotNode;
  disabled: boolean;
  onSelect: (option: ChatbotOption) => void;
  onContact: () => void;
}

export const ChatOptions = ({
  node,
  disabled,
  onSelect,
  onContact,
}: ChatOptionsProps) => {
  const t = useTranslations('chatbot');

  return (
    <div
      role="group"
      aria-label={t('optionsLabel')}
      className="flex flex-wrap justify-end gap-2 px-4 pb-4"
    >
      {node.action === 'contact' ? (
        <button
          type="button"
          disabled={disabled}
          onClick={onContact}
          className="flex cursor-pointer appearance-none items-center gap-2 rounded-full border-0 bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-smooth hover:opacity-90 disabled:pointer-events-none disabled:opacity-40"
        >
          {t('contactCta')}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>
      ) : null}

      {node.options.map((option) => (
        <button
          key={option.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(option)}
          className="cursor-pointer appearance-none rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-smooth hover:border-primary hover:bg-secondary disabled:pointer-events-none disabled:opacity-40"
        >
          {t(`options.${option.id}`)}
        </button>
      ))}
    </div>
  );
};
