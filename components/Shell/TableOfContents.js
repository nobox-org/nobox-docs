import React from 'react';

function useScrollSpy(ids, offset = 120) {
  const [activeId, setActiveId] = React.useState(null);
  React.useEffect(() => {
    if (!ids.length || typeof window === 'undefined') return;
    const elements = ids
      .map((id) => document.getElementById(id.replace(/^#/, '')))
      .filter(Boolean);

    function onScroll() {
      let current = null;
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.top - offset <= 0) {
          current = el.id;
        } else {
          break;
        }
      }
      setActiveId(current);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids.join(','), offset]);
  return activeId ? `#${activeId}` : null;
}
import Link from 'next/link';

export function TableOfContents({ toc }) {
  const items = toc.filter(
    (item) =>
      item.id &&
      (item.level === 2 || item.level === 3) &&
      item.title !== 'Next steps'
  );
  const hrefs = items.map((i) => `#${i.id}`);
  const activeHref = useScrollSpy(hrefs);
  return (
    <nav className="toc">
      {items.length > 1 ? (
        <ul className="flex column">
          {items.map((item) => {
            const href = `#${item.id}`;
            const active = activeHref === href;
            return (
              <li
                key={item.title}
                className={[
                  active ? 'active' : undefined,
                  item.level === 3 ? 'padded' : undefined
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <Link href={href} passHref>
                  <a>{item.title}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
      <style jsx>
        {`
          nav {
            position: sticky;
            top: calc(2.5rem + var(--nav-height));
            max-height: calc(100vh - var(--nav-height) - 2.5rem);
            overflow-y: auto;
            flex: 0 0 240px;
            /* https://stackoverflow.com/questions/44446671/my-position-sticky-element-isnt-sticky-when-using-flexbox */
            align-self: flex-start;
            margin-bottom: 1rem;
            padding: 0.25rem 0 0;
            border-left: 1px solid var(--toc-border);
          }
          ul {
            margin: 0;
            padding: 0;
          }
          li {
            list-style-type: none;
            margin: 0 0 1rem 1.5rem;
            font-size: 14px;
            font-weight: 400;
          }
          li a {
            text-decoration: none;
          }
          li a:hover,
          li.active a {
            text-decoration: underline;
          }
          li.padded {
            padding-left: 1rem;
          }
          /* show a left bar for active heading */
          li.active {
            position: relative;
          }
          li.active::before {
            content: '';
            position: absolute;
            left: -12px;
            top: 4px;
            bottom: 4px;
            width: 2px;
            background: var(--theme);
          }
          @media screen and (max-width: 1000px) {
            nav {
              display: none;
            }
          }
        `}
      </style>
    </nav>
  );
}
