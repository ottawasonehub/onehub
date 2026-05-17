export const nav = {
  links: [
    { href: '/about', label: 'About' },
    { href: '/#businesses', label: 'Directory', path: '/' },
  ],
  cta: { href: '/add', label: 'Add Business' },
  search: {
    placeholder: 'Search businesses...',
    ariaLabel: 'Search businesses',
    submitAriaLabel: 'Submit search',
  },
  mobileToggleAriaLabel: 'Toggle menu',
} as const;
