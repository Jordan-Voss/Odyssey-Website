export interface NavItem {
  label: string;
  href?: string;
  subItems?: {
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
    href: '/coaches' as const,
    subItems: [
      { label: 'Personal Training', href: '/coaches/personal' as const },
      { label: 'Programming', href: '/coaches/programming' as const },
      { label: 'Technique Analysis', href: '/coaches/technique' as const },
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
  | '/coaches'
  | '/about'
  | '/contact'
  | '/coaches/personal'
  | '/coaches/programming'
  | '/coaches/technique'
  | '/about/team'
  | '/about/philosophy'
  | '/(pages)/sign-up/page'; 
  