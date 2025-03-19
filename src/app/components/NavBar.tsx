'use client';

import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export default function NavBar() {
  const { setLanguage, t } = useLanguage();

  return (
    <nav className="navbar flex flex-row justify-end items-center gap-4 p-4 bg-base-200">
      <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-base-300 active:bg-base-300/70 transition-all duration-200">
          Theme
        </div>
        <ul tabIndex={0} className="dropdown-content rounded-box z-[1] w-36 p-2 shadow-2xl bg-base-100 mt-2">
          <li className="mb-1">
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-ghost btn-block hover:bg-base-300"
              aria-label="Default"
              value="default" />
          </li>
          <li className="mb-1">
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-ghost btn-block hover:bg-base-300"
              aria-label="Retro"
              value="retro" />
          </li>
          <li className="mb-1">
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-ghost btn-block hover:bg-base-300"
              aria-label="Cyberpunk"
              value="cyberpunk" />
          </li>
          <li className="mb-1">
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-ghost btn-block hover:bg-base-300"
              aria-label="Valentine"
              value="valentine" />
          </li>
          <li>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-ghost btn-block hover:bg-base-300"
              aria-label="Aqua"
              value="aqua" />
          </li>
        </ul>
      </div>
      <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role='button' className="btn btn-ghost hover:bg-base-300 active:bg-base-300/70 transition-all duration-200">
          <GlobeAltIcon className="w-5 h-5" />
        </div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow-2xl mt-2">
          <li className="mb-1">
            <a className='btn btn-ghost btn-block hover:bg-base-300' onClick={() => setLanguage('en')}>
              {t('english')}
            </a>
          </li>
          <li>
            <a className='btn btn-ghost btn-block hover:bg-base-300' onClick={() => setLanguage('zh')} >
              {t('chinese')}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}