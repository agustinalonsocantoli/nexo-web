'use client';

import { useEffect } from 'react';

export default function CloseDetailsOnOutsideClick() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element;
      const openDetails = document.querySelectorAll<HTMLDetailsElement>(
        'details[name="training-accordion"][open], details[name="team-accordion"][open]'
      );
      openDetails.forEach((details) => {
        if (!details.contains(target)) {
          details.open = false;
        }
      });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
