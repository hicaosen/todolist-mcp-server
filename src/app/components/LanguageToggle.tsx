'use client'

import { useLanguage } from '../i18n/LanguageContext';
import { LanguageIcon } from '@heroicons/react/24/outline';

export default function LanguageToggle() {
    const { setLanguage, t } = useLanguage();
    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <div
                tabIndex={0}
                role='button'
                className="btn btn-ghost hover:bg-base-300 active:bg-base-300/70 transition-all duration-200 lg:gap-2"
            >
                <LanguageIcon className="w-5 h-5" />
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box z-[1] w-32 p-2 shadow-2xl bg-base-100 mt-2"
            >
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
    )
}
