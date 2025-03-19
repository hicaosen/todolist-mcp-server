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
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role='button' className="btn btn-ghost btn-circle">
            <GlobeAltIcon className="w-6 h-6" />
          </div >
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
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
        </div>
      </div>
    </nav>
  );
}