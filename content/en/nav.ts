export const nav = {
  links: [
    { href: '/#businesses', label: 'Directory', path: '/' },
    { href: '/about', label: 'About' },
  ],
  cta: { href: '/add', label: 'Add Business' },
  search: {
    placeholder: 'Search businesses...',
    ariaLabel: 'Search businesses',
    submitAriaLabel: 'Submit search',
  },
  mobileToggleAriaLabel: 'Toggle menu',
} as const;
