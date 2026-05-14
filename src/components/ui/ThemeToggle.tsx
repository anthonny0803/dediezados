'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';

type ThemeOption = 'light' | 'dark' | 'system';

interface ThemeToggleProps {
  variant?: 'navbar' | 'sidenav';
}

export const ThemeToggle = ({ variant = 'navbar' }: ThemeToggleProps) => {
  const t = useTranslations('theme');
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (variant !== 'navbar') return;
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, variant]);

  const current: ThemeOption = (theme as ThemeOption) ?? 'system';
  const displayed = current === 'system' ? resolvedTheme : current;

  const options: { value: ThemeOption; icon: React.ReactNode; label: string }[] = [
    { value: 'light', icon: <SunIcon />, label: t('light') },
    { value: 'dark', icon: <MoonIcon />, label: t('dark') },
    { value: 'system', icon: <MonitorIcon />, label: t('system') },
  ];

  if (variant === 'sidenav') {
    return (
      <div
        className="theme-toggle theme-toggle--sidenav"
        role="radiogroup"
        aria-label={t('toggleLabel')}
      >
        {options.map((opt) => {
          const isActive = mounted && current === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              className={`theme-toggle-segment ${isActive ? 'is-active' : ''}`}
              onClick={() => setTheme(opt.value)}
              aria-label={opt.label}
              aria-pressed={isActive}
            >
              {opt.icon}
            </button>
          );
        })}
      </div>
    );
  }

  if (!mounted) {
    return (
      <button
        type="button"
        className={`theme-toggle theme-toggle--${variant}`}
        aria-label={t('toggleLabel')}
      >
        <SunIcon />
      </button>
    );
  }

  const handleSelect = (value: ThemeOption) => {
    setTheme(value);
    setOpen(false);
  };

  return (
    <div className={`theme-toggle theme-toggle--${variant}`} ref={ref}>
      <button
        type="button"
        className="theme-toggle-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-label={t('toggleLabel')}
        aria-expanded={open}
      >
        {displayed === 'light' ? <SunIcon /> : <MoonIcon />}
      </button>

      {open && (
        <div className="theme-toggle-menu" role="menu">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`theme-toggle-option ${current === opt.value ? 'is-active' : ''}`}
              onClick={() => handleSelect(opt.value)}
              role="menuitem"
            >
              <span className="theme-toggle-option-icon">{opt.icon}</span>
              <span className="theme-toggle-option-label">{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const SunIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const MonitorIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="4" width="20" height="14" rx="2" />
    <path d="M8 22h8M12 18v4" />
  </svg>
);
