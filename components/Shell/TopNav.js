import React from 'react';
import { DocSearch } from '@docsearch/react';

function Search() {
  React.useEffect(() => {
    function onKeyDown(e) {
      // Focus search on Cmd+K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const btn = document.querySelector('.DocSearch-Button');
        if (btn) btn.click();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

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
          <div className="nav-spacer"></div>
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
            width: calc(100% - 260px);
            left: 260px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--border);
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
          }
          
          :global(.dark) .nav-bar {
            background: rgba(17, 24, 39, 0.95);
          }
          
          nav {
            display: flex;
            gap: var(--spacing-md);
            width: 100%;
            align-items: center;
            justify-content: space-between;
            padding: var(--spacing-sm) var(--spacing-lg);
            font-size: var(--font-size-sm);
            font-family: var(--sans);
            font-weight: var(--font-weight-medium);
            min-height: 60px;
          }
          nav :global(a) {
            text-decoration: none;
            color: var(--text-primary);
            font-weight: var(--font-weight-medium);
            padding: var(--spacing-sm) var(--spacing-md);
            border-radius: var(--border-radius-sm);
            transition: all 200ms ease;
          }
          
          nav :global(a:hover) {
            background: var(--surface-hover);
            color: var(--text-primary);
            text-decoration: none;
          }
          
          .nav-spacer {
            flex: 1;
          }
          nav :global(.DocSearch-Button) {
            background: var(--surface);
            border: 1px solid var(--border);
            height: 40px;
            width: 240px;
            border-radius: var(--border-radius);
            padding: 0 var(--spacing-md);
            transition: all 200ms ease;
            box-shadow: var(--shadow-sm);
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-shrink: 0;
          }
          nav :global(.DocSearch-Button:hover) {
            background: var(--surface-hover);
            border-color: var(--theme);
            box-shadow: var(--shadow);
          }
          nav :global(.DocSearch-Search-Icon) {
            color: var(--text-secondary);
            width: 18px;
            height: 18px;
          }
          nav :global(.DocSearch-Button-Placeholder) {
            color: var(--text-tertiary);
            font-size: var(--font-size-sm);
          }
          nav :global(.DocSearch-Button-Keys) {
            display: flex;
            gap: var(--spacing-xs);
          }
          nav :global(.DocSearch-Button-Key) {
            background: var(--surface-hover);
            border: 1px solid var(--border);
            border-radius: var(--border-radius-sm);
            padding: 2px 6px;
            font-size: 10px;
            color: var(--text-tertiary);
          }
          section {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            padding: 0;
            flex-shrink: 0;
            min-width: 0;
          }
          button {
            display: none;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 40px;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--border-radius);
            transition: all 200ms ease;
          }
          button:hover {
            background: var(--surface-hover);
            border-color: var(--theme);
          }
          .top-row {
            align-items: center;
            justify-content: space-between;
            width: 100%;
            min-width: 0;
          }
          @media screen and (max-width: 768px) {
            .nav-bar {
              width: 100%;
              left: 0;
            }
            nav {
              flex-direction: column;
              align-items: flex-start;
              padding: var(--spacing-md) var(--spacing-lg);
              gap: 0;
            }
            .top-row {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: flex-end;
            }
            .nav-spacer {
              display: none;
            }
            section {
              display: none;
              width: 100%;
              flex-direction: column;
              gap: var(--spacing-lg);
              margin-top: var(--spacing-lg);
              padding: var(--spacing-lg) 0;
              border-top: 1px solid var(--border);
            }
            section.active {
              display: flex;
            }
            button {
              display: flex;
            }
            nav :global(.DocSearch-Button) {
              width: 100%;
              max-width: none;
              min-width: auto;
              justify-content: flex-start;
            }
          }
          
          @media screen and (max-width: 1024px) {
            nav :global(.DocSearch-Button) {
              width: 200px;
            }
          }
          
          @media screen and (max-width: 480px) {
            nav {
              padding: var(--spacing-sm) var(--spacing-md);
            }
            nav :global(.DocSearch-Button) {
              width: 150px;
              padding: 0 var(--spacing-sm);
            }
            nav :global(.DocSearch-Button-Placeholder) {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
}
