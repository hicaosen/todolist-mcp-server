'use client';

import { useLanguage } from '../i18n/LanguageContext';
import { CalendarDaysIcon, ChartBarIcon, BriefcaseIcon, UserIcon } from '@heroicons/react/24/outline';

export type FilterType = 'today' | 'week' | 'work' | 'personal';

interface SidebarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function Sidebar({ onFilterChange }: SidebarProps) {
  const { t } = useLanguage();

  const filters: { id: FilterType; name: string; icon: React.ReactNode }[] = [
    { 
      id: 'today',
      name: t('today'),
      icon: <CalendarDaysIcon className="w-6 h-6" />
    },
    {
      id: 'week',
      name: t('week'),
      icon: <ChartBarIcon className="w-6 h-6" />
    },
    {
      id: 'work',
      name: t('work'),
      icon: <BriefcaseIcon className="w-6 h-6" />
    },
    {
      id: 'personal',
      name: t('personal'),
      icon: <UserIcon className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-w-64 min-h-screen justify-center items-center">
      <div className="flex-none">
        <span className="text-xl font-bold">{t('title')}</span>
      </div>
      <div className="flex-none divider"></div>
      <ul className="flex-1 menu w-full [&_li>*]:rounded-none">
        {filters.map(filter => (
          <li key={filter.id} onClick={() => onFilterChange(filter.id)}>
             <a>
              {filter.icon}{filter.name}
              </a>
          </li>
        ))}
      </ul>
    </div>
  );
}