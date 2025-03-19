'use client';

import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export default function NavBar() {
  const { setLanguage, t } = useLanguage();

  return (
    <nav className="navbar flex flex-row justify-end">
      <div className="flex-none dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="btn">
          Theme
        </div>
        <ul tabIndex={0} className="dropdown-content rounded-box z-1 w-36 p-2 shadow-2xl">
          <li>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-block"
              aria-label="Default"
              value="default" />
          </li>
          <li>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-block"
              aria-label="Retro"
              value="retro" />
          </li>
          <li>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-block"
              aria-label="Cyberpunk"
              value="cyberpunk" />
          </li>
          <li>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-block"
              aria-label="Valentine"
              value="valentine" />
          </li>
          <li>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-block"
              aria-label="Aqua"
              value="aqua" />
          </li>
        </ul>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role='button' className="btn">
            <GlobeAltIcon className="w-6 h-6" />
          </div >
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-32 p-2 shadow-sm">
            <li>
              <a className='btn btn-block' onClick={() => setLanguage('en')}>
                {t('english')}
              </a>
            </li>
            <li>
              <a className='btn btn-block' onClick={() => setLanguage('zh')} >
                {t('chinese')}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}