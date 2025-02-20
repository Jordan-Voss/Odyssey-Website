export interface NavItem {
  label: string;
  href?: string;
  subItems?: readonly {
    readonly label: string;
    readonly href: string;
  }[];
}

export const navItems = [
  {
    label: 'Home',
    href: '/' as const,
  },
  {
    label: 'Coaching',
    href: '/coaching' as const,
    subItems: [
      { label: 'Personal Training', href: '/coaching/personal' as const },
      { label: 'Programming', href: '/coaching/programming' as const },
      { label: 'Technique Analysis', href: '/coaching/technique' as const },
    ]
  },
  {
    label: 'About',
    href: '/about' as const,
    subItems: [
      { label: 'Our Team', href: '/about/team' as const },
      { label: 'Philosophy', href: '/about/philosophy' as const },
    ]
  },
  {
    label: 'Contact',
    href: '/contact' as const,
  },
] as const;

export type Route = 
  | '/'
  | '/coaching'
  | '/about'
  | '/contact'
  | '/coaching/personal'
  | '/coaching/programming'
  | '/coaching/technique'
  | '/about/team'
  | '/about/philosophy'
  | '/(pages)/coaching/page'
  | '/(pages)/sign-up/page'; 