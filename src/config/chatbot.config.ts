import type { ChatbotOption, ChatbotTree } from '@/types/chatbot';

/**
 * Chatbot decision tree.
 *
 * Structure only, no visible text: option labels live in `chatbot.options.*`
 * and every node declares its message source, either an approved `faq` answer
 * or its own `chatbot.nodes.<id>.message`.
 */

export const CHATBOT_ROOT_ID = 'root';

export const CHATBOT_TYPING_DELAY_MS = 900;

/** Positions of `faq.items` in the i18n messages, named so a reorder is visible. */
const FAQ_ANSWER = {
  cateringIncluded: 0,
  venueLocation: 1,
  eventTypes: 2,
  extraServices: 3,
  howToBook: 4,
  liveMatches: 5,
} as const;

const TOPIC_OPTIONS: ChatbotOption[] = [
  { id: 'catering', next: 'catering' },
  { id: 'events', next: 'events' },
  { id: 'location', next: 'location' },
  { id: 'extras', next: 'extras' },
  { id: 'pricing', next: 'pricing' },
  { id: 'booking', next: 'booking' },
];

const otherTopics = (topicId: string): ChatbotOption[] =>
  TOPIC_OPTIONS.filter((option) => option.id !== topicId);

export const chatbotTree: ChatbotTree = {
  [CHATBOT_ROOT_ID]: {
    id: CHATBOT_ROOT_ID,
    source: { kind: 'message' },
    options: TOPIC_OPTIONS,
  },
  catering: {
    id: 'catering',
    source: { kind: 'faq', index: FAQ_ANSWER.cateringIncluded },
    options: otherTopics('catering'),
  },
  events: {
    id: 'events',
    source: { kind: 'faq', index: FAQ_ANSWER.eventTypes },
    options: otherTopics('events'),
  },
  location: {
    id: 'location',
    source: { kind: 'faq', index: FAQ_ANSWER.venueLocation },
    options: otherTopics('location'),
  },
  extras: {
    id: 'extras',
    source: { kind: 'faq', index: FAQ_ANSWER.extraServices },
    options: [{ id: 'matches', next: 'matches' }, ...otherTopics('extras')],
  },
  matches: {
    id: 'matches',
    source: { kind: 'faq', index: FAQ_ANSWER.liveMatches },
    options: otherTopics('extras'),
  },
  pricing: {
    id: 'pricing',
    source: { kind: 'message' },
    action: 'contact',
    options: otherTopics('pricing'),
  },
  booking: {
    id: 'booking',
    source: { kind: 'faq', index: FAQ_ANSWER.howToBook },
    action: 'contact',
    options: otherTopics('booking'),
  },
};
