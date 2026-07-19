'use client';

import { useEffect, useRef, useState } from 'react';
import { Calendar } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { es, enUS, fr, de, it, pt, nl, pl, ru } from 'react-day-picker/locale';
import 'react-day-picker/style.css';

const CALENDAR_LOCALES: Record<string, typeof enUS> = {
  es,
  en: enUS,
  fr,
  de,
  it,
  pt,
  nl,
  pl,
  ru,
};

interface DatePickerProps {
  id: string;
  value: string;
  onChange: (isoDate: string) => void;
  locale: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const parseIsoDate = (iso: string): Date | undefined => {
  if (!iso) return undefined;
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const toIsoDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatDisplay = (iso: string): string => {
  const [year, month, day] = iso.split('-');
  return `${day}/${month}/${year}`;
};

export const DatePicker = ({
  id,
  value,
  onChange,
  locale,
  className = '',
  placeholder,
  disabled = false,
}: DatePickerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    onChange(toIsoDate(date));
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="dd-datepicker relative">
      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className={`flex items-center justify-between gap-2 text-left ${className}`}
      >
        <span className={value ? '' : 'text-muted-foreground'}>
          {value ? formatDisplay(value) : placeholder}
        </span>
        <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
      </button>

      {isOpen && (
        <div
          role="dialog"
          className="absolute left-0 top-full z-50 mt-2 rounded-2xl border border-border bg-card p-3 shadow-elegant"
        >
          <DayPicker
            mode="single"
            autoFocus
            selected={parseIsoDate(value)}
            onSelect={handleSelect}
            disabled={{ before: tomorrow }}
            startMonth={new Date(today.getFullYear(), today.getMonth(), 1)}
            locale={CALENDAR_LOCALES[locale] ?? enUS}
          />
        </div>
      )}
    </div>
  );
};
