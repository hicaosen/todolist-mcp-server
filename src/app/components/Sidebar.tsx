'use client';

import { useLanguage } from '../i18n/LanguageContext';
import { CalendarDaysIcon, ChartBarIcon, BriefcaseIcon, UserIcon } from '@heroicons/react/24/outline';

export type FilterType = 'today' | 'week' | 'work' | 'personal';

interface SidebarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function Sidebar({ currentFilter, onFilterChange }: SidebarProps) {
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
    <div className="w-64 min-h-screen p-4">
      <ul className="menu menu-lg gap-2">
        {filters.map(filter => (
          <li key={filter.id}>
            <button
              className={`flex items-center gap-2 ${currentFilter === filter.id ? 'active' : ''}`}
              onClick={() => onFilterChange(filter.id)}
            >
              <span>{filter.icon}</span>
              <span>{filter.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}