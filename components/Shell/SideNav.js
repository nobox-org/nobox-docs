import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AppLink } from '../AppLink';
import { NoboxLogo } from './NoboxLogo';

export const navItems = [
  {
    title: 'AI Integration',
    links: [
      { href: '/ai/access-model', children: 'AI Models API' },
      { href: '/allowed-models', children: 'All 300+ Models' },
    ]
  },
  {
    title: 'Get Started',
    links: [
      { href: '/what-is-nobox', children: 'What is Nobox?' },
      { href: '/install-nobox', children: 'Install SDK' },
      { href: '/integrate-nobox', children: 'Integration Guide' },
      { href: '/nobox-examples', children: 'Example Usage' }
    ]
  },
  {
    title: 'Database',
    links: [
      { href: '/schema/overview', children: 'Schema Overview' },
      { href: '/schema/api-reference', children: 'API Reference' },
      { href: '/schema/population-guide', children: 'Population Guide' },
      { href: '/schema/concepts', children: 'Concepts' },
    ]
  },
  {
    title: 'Database Methods',
    links: [
      { href: '/methods/types', children: 'Types' },
      { href: '/methods/find', children: 'Find' },
      { href: '/methods/find-one', children: 'FindOne' },
      { href: '/methods/populate', children: 'Population' },
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
    title: 'File Operations',
    links: [
      { href: '/methods/upload', children: 'File Upload' },
    ]
  },
  {
    title: 'Authentication',
    links: [
      { href: '/functions/login', children: 'Login Function' },
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
            font-size: var(--font-size-xs);
            font-weight: var(--font-weight-bold);
            color: var(--text-tertiary);
            margin: var(--spacing-lg) 0 var(--spacing-sm) 0;
            padding-bottom: var(--spacing-xs);
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }
          
          h3:first-child {
            margin-top: 0;
          }
          
          ul {
            margin: 0;
            padding: 0;
            margin-bottom: var(--spacing-md);
          }
          
          li {
            list-style-type: none;
            margin: 0;
            font-size: var(--font-size-sm);
            font-weight: var(--font-weight-normal);
          }
          
          li a {
            display: block;
            padding: var(--spacing-xs) var(--spacing-sm);
            margin: 1px 0;
            color: var(--text-secondary);
            text-decoration: none;
            border-radius: var(--border-radius-sm);
            transition: all 150ms ease;
            position: relative;
            overflow: hidden;
          }
          
          li a::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 3px;
            background: var(--accent);
            transform: scaleY(0);
            transition: transform 150ms ease;
            transform-origin: bottom;
          }
          
          li a:hover {
            color: var(--text-primary);
            background: var(--surface-hover);
            transform: translateX(4px);
          }
          
          li a:hover::before {
            transform: scaleY(1);
          }
          
          li.active > a {
            color: var(--accent);
            background: var(--accent-light);
            font-weight: var(--font-weight-medium);
            transform: translateX(4px);
          }
          
          li.active > a::before {
            transform: scaleY(1);
          }
          
          @media screen and (max-width: 768px) {
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
      <div className="sidebar-header">
        <AppLink href="/" className="sidebar-logo">
          <NoboxLogo />
        </AppLink>
      </div>
      {navItems.map((item, index) => {
        return <NavItem key={index} item={item} />
      }
      )}
      <style jsx>
        {`
          nav {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 260px;
            overflow-y: auto;
            padding: 0 var(--spacing-md) var(--spacing-lg) var(--spacing-xl);
            background: var(--background);
            border-right: 1px solid var(--border);
            z-index: 50;
            
            /* Custom scrollbar */
            scrollbar-width: thin;
            scrollbar-color: var(--border) transparent;
          }
          
          .sidebar-header {
            height: 60px; /* Match top navigation height */
            display: flex;
            align-items: center;
            padding: 0;
            border-bottom: 1px solid var(--border);
            margin-bottom: var(--spacing-lg);
            position: sticky;
            top: 0;
            background: var(--background);
            z-index: 10;
          }
          
          :global(.sidebar-logo) {
            display: block;
            text-decoration: none;
          }
          
          :global(.sidebar-logo:hover) {
            opacity: 0.8;
          }
          
          nav::-webkit-scrollbar {
            width: 4px;
          }
          
          nav::-webkit-scrollbar-track {
            background: transparent;
          }
          
          nav::-webkit-scrollbar-thumb {
            background: var(--border);
            border-radius: 2px;
          }
          
          nav::-webkit-scrollbar-thumb:hover {
            background: var(--border-strong);
          }
         
          @media screen and (max-width: 768px) {
            nav {
              display: none;
            }
          }
        `}
      </style>
    </nav >
  );
}
