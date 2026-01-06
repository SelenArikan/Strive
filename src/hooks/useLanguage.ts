"use client";

import { useState, useEffect } from 'react';
import { tr } from '@/locales/tr';
import { en } from '@/locales/en';

const translations = { tr, en };
type Locale = 'tr' | 'en';

export function useLanguage() {
    const [locale, setLocaleState] = useState<Locale>('tr');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Initial load
        const saved = localStorage.getItem('locale') as Locale;
        if (saved && (saved === 'tr' || saved === 'en')) {
            setLocaleState(saved);
        }

        // Listen for custom event to sync across components
        const handleLocaleChange = (e: CustomEvent<Locale>) => {
            setLocaleState(e.detail);
        };

        window.addEventListener('locale-change' as any, handleLocaleChange);
        return () => window.removeEventListener('locale-change' as any, handleLocaleChange);
    }, []);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem('locale', newLocale);
        document.documentElement.lang = newLocale;

        // Dispatch event to update other components
        const event = new CustomEvent('locale-change', { detail: newLocale });
        window.dispatchEvent(event);
    };

    const t = (key: string): string => {
        const keys = key.split('.');
        let value: any = translations[locale];

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return key;
            }
        }

        return typeof value === 'string' ? value : key;
    };

    return { t, locale, setLocale, mounted };
}
