'use client';

import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export default function NavBar() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="navbar bg-base-100 shadow-lg px-4">
      <div className="flex-1">
        <span className="text-xl font-bold">{t('title')}</span>
      </div>
      <div className="flex-none">
        <details className="dropdown dropdown-bottom dropdown-end">
          <summary className="btn btn-circle btn-outline btn-primary">
            <GlobeAltIcon className="w-6 h-6" />
          </summary>
          <ul className="menu dropdown-content bg-base-100 z-[1] w-52 p-2 shadow">
            <li className="menu-title">
              <span>{t('language')}</span>
            </li>
            <li>
              <button
                className={`${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
              >
                {t('english')}
              </button>
            </li>
            <li>
              <button
                className={`${language === 'zh' ? 'active' : ''}`}
                onClick={() => setLanguage('zh')}
              >
                {t('chinese')}
              </button>
            </li>
          </ul>
        </details>
      </div>
    </nav>
  );
}