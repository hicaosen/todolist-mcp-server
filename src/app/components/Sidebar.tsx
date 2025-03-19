'use client';

import { useLanguage } from '../i18n/LanguageContext';
import { CalendarDaysIcon, ChartBarIcon, BriefcaseIcon, UserIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export type FilterType = 'today' | 'week' | 'work' | 'personal';

interface SidebarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function Sidebar({ onFilterChange }: SidebarProps) {
  const { t } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    <div className={`${isCollapsed ? 'min-w-20' : 'min-w-64'} min-h-screen p-6 border-r border-base-300 bg-base-200 transition-all duration-300 relative`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 p-1.5 rounded-full bg-base-300 hover:bg-base-100 transition-colors duration-200 border border-base-300"
      >
        <ChevronDoubleLeftIcon className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
      </button>
      <div className="mb-10">
        <h1 className={`text-3xl font-bold text-primary tracking-tight ${isCollapsed ? 'hidden' : ''}`}>{t('title')}</h1>
      </div>
      <nav>
        <ul className="space-y-1.5">
          {filters.map(filter => (
            <li key={filter.id}>
              <button
                onClick={() => onFilterChange(filter.id)}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-base-300 active:bg-base-300/70 transition-all duration-200 group"
              >
                <span className="text-base-content/70 group-hover:text-primary transition-colors">{filter.icon}</span>
                <span className={`text-base font-medium group-hover:text-primary transition-colors ${isCollapsed ? 'hidden' : ''}`}>{filter.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}