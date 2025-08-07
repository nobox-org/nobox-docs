import React from 'react';
import { DocSearch } from '@docsearch/react';

import { AppLink as Link } from '../AppLink';
import { NoboxLogo } from './NoboxLogo';

function Search() {
  return (
    <DocSearch
      appId="SPXODZLI2X"
      apiKey="1032ce2a669bad342d04e966b5c7c476"
      indexName="nobox-docs"
      placeholder="Search Nobox documentation..."
      translations={{
        button: {
          buttonText: "Search",
          buttonAriaLabel: "Search documentation"
        },
        modal: {
          searchBox: {
            resetButtonTitle: "Clear the query",
            resetButtonAriaLabel: "Clear the query",
            cancelButtonText: "Cancel",
            cancelButtonAriaLabel: "Cancel"
          },
          startScreen: {
            recentSearchesTitle: "Recent",
            noRecentSearchesText: "No recent searches",
            saveRecentSearchButtonTitle: "Save this search",
            removeRecentSearchButtonTitle: "Remove this search from history",
            favoriteSearchesTitle: "Favorite",
            removeFavoriteSearchButtonTitle: "Remove this search from favorites"
          },
          errorScreen: {
            titleText: "Unable to fetch results",
            helpText: "You might want to check your network connection."
          },
          footer: {
            selectText: "to select",
            selectKeyAriaLabel: "Enter key",
            navigateText: "to navigate",
            navigateUpKeyAriaLabel: "Arrow up",
            navigateDownKeyAriaLabel: "Arrow down",
            closeText: "to close",
            closeKeyAriaLabel: "Escape key",
            searchByText: "Search by"
          },
          noResultsScreen: {
            noResultsText: "No results for",
            suggestedQueryText: "Try searching for",
            reportMissingResultsText: "Believe this query should return results?",
            reportMissingResultsLinkText: "Let us know."
          }
        }
      }}
    />
  );
}

export function TopNav({ children }) {
  const [showMobileNav, setShowMobileNav] = React.useState(false);

  return (
    <div className="nav-bar">
      <nav>
        <div className="flex top-row">
          <Link href="/" className="flex">
            <NoboxLogo />
          </Link>
          <button
            className="hamburger"
            onClick={() => setShowMobileNav((o) => !o)}
          >
            <svg
              width="16"
              height="10"
              viewBox="0 0 16 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="16" height="2" fill="var(--black)" />
              <rect y="4" width="16" height="2" fill="var(--black)" />
              <rect y="8" width="16" height="2" fill="var(--black)" />
            </svg>
          </button>
        </div>
        <section className={showMobileNav ? 'active' : ''}>
          {children}
          <Search />
        </section>
      </nav>
      <style jsx>
        {`
          .nav-bar {
            top: 0;
            position: fixed;
            z-index: 100;
            display: flex;
            width: 100%;
            background: var(--light);
          }
          nav {
            display: flex;
            gap: 1rem;
            width: 100%;
            margin: 0 auto;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid var(--dark);
            padding: 1rem 2rem 1.1rem;
            font-size: 15px;
            font-family: var(--sans);
          }
          nav :global(a) {
            text-decoration: none;
          }
          nav :global(.DocSearch-Button) {
            background: var(--code-background);
            height: 32px;
            border-radius: 32px;
          }
          nav :global(.DocSearch-Button:hover) {
            box-shadow: none;
            background: #e8eef3;
          }
          :global(.dark) nav :global(.DocSearch-Button:hover) {
            background: #424248;
          }
          nav :global(.DocSearch-Search-Icon) {
            color: var(--dark);
            width: 16px;
          }
          nav :global(.DocSearch-Button-Placeholder),
          nav :global(.DocSearch-Button-Keys) {
            display: none;
          }
          section {
            display: flex;
            align-items: center;
            gap: 1.3rem;
            padding: 0;
          }
          button {
            display: none;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 32px;
            background: var(--gray-light);
            border-radius: 30px;
          }
          .top-row {
            align-items: center;
            justify-content: space-between;
            width: 100%;
          }
          @media screen and (max-width: 600px) {
            .nav-bar {
              border-bottom: 1px solid var(--dark);
            }
            nav {
              flex-direction: column;
              align-items: flex-start;
              border-bottom: none;
            }
            section {
              display: none;
              font-size: 15px;
            }
            section.active {
              display: flex;
            }
            button {
              display: flex;
            }
          }
        `}
      </style>
    </div>
  );
}
