'use client';

import React from 'react';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

export default function NavBar() {
  return (
    <nav className="navbar flex flex-row justify-end items-center bg-base-200">
      <div className="flex-none flex gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </nav>
  );
}