export type NavLink = { label: string; href: string; description: string };
export type NavGroup = { label: string; links: NavLink[] };

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Learn',
    links: [
      { label: 'Lessons', href: '/lessons/', description: 'Short, guided lessons from bits to algorithms' },
      { label: 'Gate guide', href: '/gates/', description: 'What every quantum gate does, with pictures' },
      { label: 'Roadmap', href: '/roadmap/', description: 'The full learning path and what comes next' },
    ],
  },
  {
    label: 'Practice',
    links: [
      { label: 'Playground', href: '/playground/', description: 'Build circuits and watch them run live' },
      { label: 'Logic lab', href: '/logic/', description: 'Classical logic gates, the starting point' },
      { label: 'Run on IBM Quantum', href: '/run-on-ibm/', description: 'Send a circuit to real quantum hardware' },
    ],
  },
  {
    label: 'Explore',
    links: [
      { label: 'History', href: '/history/', description: 'How quantum computing came to be' },
      { label: 'People', href: '/history/people/', description: 'The scientists behind the ideas' },
      { label: 'Sources', href: '/sources/', description: 'References and how the content is checked' },
      { label: 'Updates', href: '/updates/', description: "What's new on the site" },
      { label: 'About', href: '/about/', description: 'Scope, goals and how to give feedback' },
    ],
  },
];

function normalize(path: string) {
  return path.endsWith('/') ? path : `${path}/`;
}

/** True when `pathname` is this link's page or a page beneath it (but not a more specific sibling link). */
export function isActiveLink(pathname: string | null, href: string) {
  if (!pathname) return false;
  const current = normalize(pathname);
  if (!current.startsWith(href)) return false;
  // Prefer the most specific link, so /history/people/ doesn't also light up History.
  return !NAV_GROUPS.some((group) =>
    group.links.some((link) => link.href !== href && link.href.startsWith(href) && current.startsWith(link.href))
  );
}

export function isActiveGroup(pathname: string | null, group: NavGroup) {
  return group.links.some((link) => isActiveLink(pathname, link.href));
}
