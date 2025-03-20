'use client';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {

  return (
    <label className="swap swap-rotate">
      {/* this hidden checkbox controls the state */}
      <input type="checkbox" className="theme-controller" value="dark" />

      {/* sun icon */}
      <SunIcon className="swap-off h-10 w-10 fill-current" />

      {/* moon icon */}
      <MoonIcon className="swap-on h-10 w-10 fill-current" />
    </label>
  );
}
