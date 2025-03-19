'use client';

import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export default function NavBar() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="navbar bg-base-100 shadow-lg px-4">
      <div className="flex-1">
        <span className="text-xl font-bold">{t('title')}</span>
      </div>
      <div className="flex-none relative">
        <button
          className="btn btn-ghost"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img src="/globe.svg" alt="language" className="w-6 h-6" />
        </button>
        {isOpen && (
          <ul className="menu menu-compact dropdown-content absolute right-0 mt-2 p-2 shadow bg-base-100 rounded-box w-52">
            <li className="menu-title">
              <span>{t('language')}</span>
            </li>
            <li>
              <button
                className={`${language === 'en' ? 'active' : ''}`}
                onClick={() => {
                  setLanguage('en');
                  setIsOpen(false);
                }}
              >
                {t('english')}
              </button>
            </li>
            <li>
              <button
                className={`${language === 'zh' ? 'active' : ''}`}
                onClick={() => {
                  setLanguage('zh');
                  setIsOpen(false);
                }}
              >
                {t('chinese')}
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}