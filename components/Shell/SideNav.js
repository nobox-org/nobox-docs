import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const items = [
  {
    title: 'Get started',
    links: [
      { href: '/what-is-nobox', children: 'What is Nobox?' },
      { href: '/install-nobox', children: 'Installation' },
      { href: '/integrate-nobox', children: 'Integration' },
      { href: '/nobox-examples', children: 'Example Usage' }
    ]
  },
  {
    title: 'Schema',
    links: [
      { href: '/schema/overview', children: 'Overview' },
      { href: '/schema/api-reference', children: 'API Reference' },
      { href: '/schema/example-usage', children: 'Example Usage' },
      { href: '/schema/concepts', children: 'Concepts' },
    ]
  },
  {
    title: 'Methods',
    links: [
      { href: '/methods/types', children: 'Types' },
      { href: '/methods/find', children: 'Find' },
      { href: '/methods/find-one', children: 'FindOne' },
      { href: '/methods/insert', children: 'Insert' },
      { href: '/methods/insert-one', children: 'InsertOne' },
      { href: '/methods/update-one', children: 'UpdateOne' },
      { href: '/methods/update-one-by-id', children: 'UpdateOneById' },
      { href: '/methods/get-token-owner', children: 'Get Token Owner' },
      { href: '/methods/set-keys', children: 'SetKeys' },
      { href: '/methods/get-keys', children: 'Getkeys' },
    ]
  },
  {
    title: 'Functions',
    links: [
      { href: '/functions/login', children: 'Login' },
    ]
  },
];


function NavItem({ item }) {

  const router = useRouter();

  return (
    <div key={item.title}>
      <h3>{item.title}</h3>
      <ul className="flex column">
        {item.links.map((link) => {
          const active = router.pathname === link.href;

          return (
            <li key={link.href} className={active ? 'active' : ''}>
              <Link {...link}>
                <a href={link.href}>{link.children}</a>
              </Link>
            </li>
          );

        })}
      </ul>
      <style jsx>
        {`
         
          h3 {
            font-weight: 500;
            margin: 0.5rem 0 0;
            padding-bottom: 0.5rem;
          }
          ul {
            margin: 0;
            padding: 0;
          }
          li {
            list-style-type: none;
            margin: 0 0 0.7rem 0.7rem;
            font-size: 14px;
            font-weight: 400;
          }
          li a {
            text-decoration: none;
          }
          li a:hover,
          li.active > a {
            text-decoration: underline;
          }
          @media screen and (max-width: 600px) {
            nav {
              display: none;
            }
          }
        `}
      </style>
    </div>
  )
}

export function SideNav() {

  return (
    <nav className="sidenav">
      {items.map((item, index) => {
        return <NavItem key={index} item={item} />
      }
      )}
      <style jsx>
        {`
  nav {
    /* https://stackoverflow.com/questions/66898327/how-to-keep-footer-from-pushing-up-sticky-sidebar */
    position: sticky;
    top: var(--nav-height);
    height: calc(100vh - var(--nav-height));
    flex: 0 0 240px;
    overflow-y: auto;
    padding: 2rem 0 2rem 2rem;
  }
 
  @media screen and (max-width: 600px) {
    nav {
      display: none;
    }
  }
`}
      </style>
    </nav >
  );
}
