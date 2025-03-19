'use client';

import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { GlobeAltIcon, SwatchIcon } from '@heroicons/react/24/outline';

export default function NavBar() {
  const { setLanguage, t } = useLanguage();

  return (
    <nav className="navbar flex flex-row justify-end items-center p-4 bg-base-200">
      <div className="flex-none flex gap-2">
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-base-300 active:bg-base-300/70 transition-all duration-200 lg:gap-2">
            <SwatchIcon className="w-5 h-5" />
            <span className="hidden lg:inline">{t('theme')}</span>
          </div>
          <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow-2xl bg-base-100 mt-2">
            <li className="mb-1">
              <label className="flex items-center gap-4 px-4 py-2">
                <input type="radio" name="theme-dropdown" className="theme-controller hidden" value="default" />
                <span className="w-4 h-4 rounded bg-primary"></span>
                <span>Default</span>
              </label>
            </li>
            <li className="mb-1">
              <label className="flex items-center gap-4 px-4 py-2">
                <input type="radio" name="theme-dropdown" className="theme-controller hidden" value="light" />
                <span className="w-4 h-4 rounded bg-primary"></span>
                <span>Light</span>
              </label>
            </li>
            <li className="mb-1">
              <label className="flex items-center gap-4 px-4 py-2">
                <input type="radio" name="theme-dropdown" className="theme-controller hidden" value="synthwave" />
                <span className="w-4 h-4 rounded bg-primary"></span>
                <span>Synthwave</span>
              </label>
            </li>
            <li className="mb-1">
              <label className="flex items-center gap-4 px-4 py-2">
                <input type="radio" name="theme-dropdown" className="theme-controller hidden" value="dracula" />
                <span className="w-4 h-4 rounded bg-primary"></span>
                <span>Dracula</span>
              </label>
            </li>
            <li>
              <label className="flex items-center gap-4 px-4 py-2">
                <input type="radio" name="theme-dropdown" className="theme-controller hidden" value="aqua" />
                <span className="w-4 h-4 rounded bg-primary"></span>
                <span>Aqua</span>
              </label>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role='button' className="btn btn-ghost hover:bg-base-300 active:bg-base-300/70 transition-all duration-200 lg:gap-2">
            <GlobeAltIcon className="w-5 h-5" />
            <span className="hidden lg:inline">{t('language')}</span>
          </div>
          <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] w-32 p-2 shadow-2xl bg-base-100 mt-2">
            <li className="mb-1">
              <button onClick={() => setLanguage('en')}>
                {t('english')}
              </button>
            </li>
            <li>
              <button onClick={() => setLanguage('zh')}>
                {t('chinese')}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}