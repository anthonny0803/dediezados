'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { MessageCircle, RotateCcw, X } from 'lucide-react';
import { useChatbot } from '@/hooks/useChatbot';
import { ChatOptions } from '@/components/widgets/ChatOptions';
import { ChatWindow } from '@/components/widgets/ChatWindow';

const CONTACT_SECTION_ID = 'contact';
const CHATBOT_PANEL_ID = 'chatbot-panel';

const HEADER_BUTTON_CLASS =
  'flex h-9 w-9 appearance-none items-center justify-center rounded-full border-0 bg-transparent text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground';

interface ChatPanelProps {
  onClose: () => void;
  onContact: () => void;
}

const ChatPanel = ({ onClose, onContact }: ChatPanelProps) => {
  const t = useTranslations('chatbot');
  const { history, currentNode, isTyping, selectOption, restart } = useChatbot();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return createPortal(
    <div
      ref={panelRef}
      id={CHATBOT_PANEL_ID}
      role="dialog"
      aria-labelledby="chatbot-title"
      tabIndex={-1}
      className="fixed inset-x-0 bottom-0 z-[2000] flex h-[80vh] flex-col overflow-hidden rounded-t-3xl border border-border bg-card shadow-elegant outline-none sm:inset-x-auto sm:bottom-24 sm:right-6 sm:h-[560px] sm:max-h-[70vh] sm:w-[380px] sm:rounded-3xl"
    >
      <header className="flex items-center gap-3 border-b border-border bg-secondary/40 px-4 py-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
          <MessageCircle aria-hidden="true" className="h-5 w-5" />
        </span>
        <span className="flex-1">
          <span id="chatbot-title" className="block font-display text-base font-semibold">
            {t('title')}
          </span>
          <span className="block text-xs text-muted-foreground">{t('subtitle')}</span>
        </span>
        <button
          type="button"
          aria-label={t('restart')}
          onClick={restart}
          className={HEADER_BUTTON_CLASS}
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label={t('close')}
          onClick={onClose}
          className={HEADER_BUTTON_CLASS}
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <ChatWindow history={history} isTyping={isTyping} />

      {history.length > 0 ? (
        <ChatOptions
          node={currentNode}
          disabled={isTyping}
          onSelect={selectOption}
          onContact={onContact}
        />
      ) : null}
    </div>,
    document.body,
  );
};

export const Chatbot = () => {
  const t = useTranslations('chatbot');
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const closePanel = () => {
    setIsOpen(false);
    launcherRef.current?.focus();
  };

  const goToContact = () => {
    setIsOpen(false);
    document.getElementById(CONTACT_SECTION_ID)?.scrollIntoView({ block: 'start' });
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  if (!isMounted) return null;

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        aria-label={t('launcher')}
        aria-controls={isOpen ? CHATBOT_PANEL_ID : undefined}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="fixed bottom-6 right-6 z-[1500] flex h-14 w-14 appearance-none items-center justify-center rounded-full border-0 bg-gradient-primary text-primary-foreground shadow-elegant transition-smooth hover:scale-105"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {isOpen ? <ChatPanel onClose={closePanel} onContact={goToContact} /> : null}
    </>
  );
};
