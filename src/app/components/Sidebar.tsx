'use client';

import { useLanguage } from '../i18n/LanguageContext';

export type FilterType = 'today' | 'week' | 'work' | 'personal';

interface SidebarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function Sidebar({ currentFilter, onFilterChange }: SidebarProps) {
  const { t } = useLanguage();

  const filters: { id: FilterType; name: string; icon: string }[] = [
    { 
      id: 'today',
      name: t('today'),
      icon: '📅'
    },
    {
      id: 'week',
      name: t('week'),
      icon: '📊'
    },
    {
      id: 'work',
      name: t('work'),
      icon: '💼'
    },
    {
      id: 'personal',
      name: t('personal'),
      icon: '👤'
    }
  ];

  return (
    <div className="w-64 bg-base-100 min-h-screen p-4 shadow-lg">
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