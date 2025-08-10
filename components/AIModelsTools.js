import React from 'react';

export function AIModelsTools({ popularProviders = [], popularModelLabels = [], popularModelQueries = [] }) {
    const inputRef = React.useRef(null);
    const barRef = React.useRef(null);
    const [barHeight, setBarHeight] = React.useState(0);
    const debounceRef = React.useRef(null);

    const providerSlug = React.useCallback((p) => (p || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'), []);

    const applyFilter = React.useCallback((query) => {
        if (typeof window === 'undefined') return;
        const q = (query || '').trim().toLowerCase();
        const article = document.querySelector('article');
        if (!article) return;

        // Find all provider sections: assume h3 heading followed by a table
        const headings = Array.from(article.querySelectorAll('h3'));
        let firstVisibleRow = null;
        headings.forEach((h) => {
            // Find the nearest following table sibling
            let node = h.nextElementSibling;
            while (node && node.tagName !== 'TABLE') node = node.nextElementSibling;
            const table = node;
            if (!table) return;

            const rows = Array.from(table.querySelectorAll('tbody tr'));
            let anyVisible = false;
            rows.forEach((row) => {
                const t = (row.innerText || row.textContent || '').toLowerCase();
                const show = !q || t.indexOf(q) !== -1;
                row.style.display = show ? '' : 'none';
                if (show && !firstVisibleRow) firstVisibleRow = row;
                anyVisible = anyVisible || show;
            });
            // Toggle both heading and table
            h.style.display = anyVisible ? '' : 'none';
            table.style.display = anyVisible ? '' : 'none';
        });

        if (firstVisibleRow) firstVisibleRow.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    const onSearch = React.useCallback(() => applyFilter(inputRef.current?.value || ''), [applyFilter]);
    const onClear = React.useCallback(() => {
        if (inputRef.current) inputRef.current.value = '';
        applyFilter('');
        if (typeof window !== 'undefined') window.location.hash = '';
    }, [applyFilter]);

    const onInputChange = React.useCallback((e) => {
        const value = e.target.value;
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => applyFilter(value), 250);
    }, [applyFilter]);

    const onProviderClick = React.useCallback((slug) => (e) => {
        // Ensure sections are visible (clear any search) before jumping
        e.preventDefault();
        if (inputRef.current) inputRef.current.value = '';
        applyFilter('');
        if (typeof window !== 'undefined') {
            const el = document.getElementById(slug);
            if (el) {
                const navVar = getComputedStyle(document.documentElement).getPropertyValue('--nav-height');
                const navHeight = parseFloat(navVar) || 72;
                const extra = 12; // matches globals.css scroll-margin extra
                const fixedBar = (barRef.current?.offsetHeight || 0);
                const y = el.getBoundingClientRect().top + window.scrollY;
                const target = Math.max(0, y - navHeight - fixedBar - extra);
                window.scrollTo({ top: target, behavior: 'smooth' });
                // update hash without default jump
                try { history.replaceState(null, '', `#${slug}`); } catch { window.location.hash = `#${slug}`; }
            } else {
                // Fallback to hash navigation
                window.location.hash = `#${slug}`;
            }
        }
    }, [applyFilter]);

    React.useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Enter') onSearch();
            if (e.key === 'Escape') onClear();
            // Add Cmd/Ctrl+K to focus search
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                if (inputRef.current) {
                    inputRef.current.focus();
                    inputRef.current.select();
                }
            }
        };
        const el = inputRef.current;
        el?.addEventListener('keydown', onKey);

        // Global keyboard shortcut listener
        const globalKeyHandler = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                if (inputRef.current) {
                    inputRef.current.focus();
                    inputRef.current.select();
                }
            }
        };

        window.addEventListener('keydown', globalKeyHandler);

        return () => {
            el?.removeEventListener('keydown', onKey);
            window.removeEventListener('keydown', globalKeyHandler);
        };
    }, [onSearch, onClear]);

    React.useEffect(() => {
        const measure = () => setBarHeight(barRef.current ? barRef.current.offsetHeight : 0);
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    return (
        <>
            <div id="model-tools" ref={barRef} aria-label="AI model tools">
                <div className="search-container">
                    <div className="search-input-wrapper">
                        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        <input
                            ref={inputRef}
                            type="search"
                            placeholder="Search 300+ AI models..."
                            aria-label="Search models"
                            aria-describedby="model-search-hint"
                            onInput={onInputChange}
                            className="search-input"
                            autoComplete="off"
                            spellCheck="false"
                        />
                        <button type="button" onClick={onClear} className="clear-btn" title="Clear search">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                    <div className="search-actions">
                        <button type="button" onClick={onSearch} className="search-btn" title="Search (or press Enter)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                                <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            Search
                        </button>
                    </div>
                </div>
                <div id="model-search-hint" className="search-hint">
                    <div className="hint-content">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        Real-time filtering as you type • Press Enter to jump to first match
                    </div>
                    <div className="keyboard-shortcuts">
                        <span className="shortcut">
                            <kbd>⌘</kbd>+<kbd>K</kbd> to focus
                        </span>
                        <span className="shortcut">
                            <kbd>Esc</kbd> to clear
                        </span>
                    </div>
                </div>
                <div className="pills-row">
                    {popularProviders?.length ? (
                        <div className="pills-group" aria-label="Popular providers">
                            <span className="group-label">Quick jumps (bookmarks):</span>
                            <div className="pills">
                                {popularProviders.map((p) => {
                                    const slug = providerSlug(p);
                                    return <a key={p} className="pill" href={`#${slug}`} onClick={onProviderClick(slug)}>{p}</a>;
                                })}
                            </div>
                        </div>
                    ) : null}
                    {popularModelLabels?.length ? (
                        <div className="pills-group" aria-label="Popular models">
                            <span className="group-label">Quick search presets:</span>
                            <div className="pills">
                                {popularModelLabels.map((label, i) => (
                                    <button key={label} className="pill pill-btn" type="button" onClick={() => { if (inputRef.current) { inputRef.current.value = popularModelQueries[i] || ''; } onSearch(); }}>{label}</button>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
                <style jsx>{`
        #model-tools {
          position: fixed;
          left: 260px;
          right: 280px; /* Account for right sidebar (240px) + padding */
          top: calc(var(--nav-height));
          z-index: 10;
          background: linear-gradient(135deg, var(--surface) 0%, var(--background) 100%);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
          padding: var(--spacing-xs) var(--spacing-md);
          margin: 0;
        }
        
        .search-container {
          display: flex;
          gap: var(--spacing-xs);
          align-items: center;
          margin-bottom: var(--spacing-xs);
          max-width: 600px;
        }
        
        .search-input-wrapper {
          position: relative;
          flex: 1;
          max-width: 350px;
          display: flex;
          align-items: center;
        }
        
        .search-icon {
          position: absolute;
          left: var(--spacing-md);
          color: var(--text-tertiary);
          pointer-events: none;
          z-index: 1;
        }
        
        .search-input {
          width: 100%;
          padding: var(--spacing-xs) var(--spacing-md) var(--spacing-xs) 36px;
          border: 1px solid var(--border);
          border-radius: var(--border-radius-sm);
          background: var(--background);
          color: var(--text-primary);
          font-size: var(--font-size-sm);
          font-family: var(--sans);
          caret-color: var(--accent);
          transition: all 200ms ease;
          box-shadow: var(--shadow-sm);
          height: 36px;
        }
        
        .search-input::placeholder {
          color: var(--text-tertiary);
          font-weight: var(--font-weight-normal);
        }
        
        .search-input:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-light), var(--shadow);
          background: var(--background);
        }
        
        .search-input:focus + .clear-btn {
          opacity: 1;
        }
        
        .clear-btn {
          position: absolute;
          right: var(--spacing-sm);
          background: none;
          border: none;
          color: var(--text-tertiary);
          cursor: pointer;
          padding: var(--spacing-xs);
          border-radius: var(--border-radius-sm);
          opacity: 0;
          transition: all 200ms ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .clear-btn:hover {
          background: var(--surface-hover);
          color: var(--text-secondary);
        }
        
        .search-input:not(:placeholder-shown) + .clear-btn {
          opacity: 1;
        }
        
        .search-actions {
          display: flex;
          gap: var(--spacing-sm);
        }
        
        .search-btn {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-xs) var(--spacing-sm);
          background: var(--accent);
          color: var(--text-inverse);
          border: none;
          border-radius: var(--border-radius-sm);
          font-weight: var(--font-weight-medium);
          font-size: var(--font-size-sm);
          cursor: pointer;
          transition: all 200ms ease;
          box-shadow: var(--shadow-sm);
          white-space: nowrap;
          min-width: fit-content;
          height: 36px;
        }
        
        .search-btn:hover {
          background: var(--blue-700);
          transform: translateY(-1px);
          box-shadow: var(--shadow);
        }
        
        .search-btn:active {
          transform: translateY(0);
        }
        
        .search-hint {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: var(--font-size-xs);
          color: var(--text-tertiary);
          margin-bottom: var(--spacing-sm);
          padding: var(--spacing-xs) var(--spacing-sm);
          background: var(--surface);
          border-radius: var(--border-radius-sm);
          border-left: 2px solid var(--accent-light);
        }
        
        .hint-content {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }
        
        .keyboard-shortcuts {
          display: flex;
          gap: var(--spacing-md);
          align-items: center;
        }
        
        .shortcut {
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: var(--font-size-xs);
          color: var(--text-tertiary);
        }
        
        kbd {
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--border-radius-sm);
          padding: 2px 6px;
          font-family: var(--mono);
          font-size: 10px;
          font-weight: var(--font-weight-medium);
          color: var(--text-secondary);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          min-width: 20px;
          text-align: center;
        }
        
        .pills-row {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }
        
        .pills-group {
          display: flex;
          gap: var(--spacing-sm);
          align-items: center;
          flex-wrap: wrap;
        }
        
        .group-label {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--text-secondary);
          white-space: nowrap;
          min-width: fit-content;
        }
        
        .pills {
          display: flex;
          gap: var(--spacing-sm);
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          flex-wrap: wrap;
        }
        
        .pill {
          display: inline-flex;
          align-items: center;
          padding: var(--spacing-xs) var(--spacing-sm);
          border: 1px solid var(--border);
          background: var(--background);
          border-radius: var(--border-radius-sm);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-medium);
          white-space: nowrap;
          text-decoration: none;
          color: var(--text-secondary);
          transition: all 200ms ease;
          cursor: pointer;
        }
        
        .pill:hover {
          border-color: var(--accent);
          background: var(--accent-light);
          color: var(--accent);
          transform: translateY(-1px);
          box-shadow: var(--shadow-sm);
        }
        
        .pill-btn {
          background: var(--accent-light);
          border-color: var(--accent);
          color: var(--accent);
          font-weight: var(--font-weight-semibold);
        }
        
        .pill-btn:hover {
          background: var(--accent);
          color: var(--text-inverse);
        }
        
        /* Responsive design */
        @media (max-width: 1200px) {
          #model-tools {
            right: 260px; /* Reduce right margin on smaller screens */
            padding: var(--spacing-xs) var(--spacing-sm);
          }
          
          .search-container {
            max-width: 500px;
          }
          
          .search-input-wrapper {
            max-width: 300px;
          }
        }
        
        @media (max-width: 1000px) {
          #model-tools {
            right: 0; /* Remove right margin when TOC is hidden */
          }
          
          .search-container {
            max-width: 700px;
          }
          
          .search-input-wrapper {
            max-width: 400px;
          }
        }
        
        @media (max-width: 768px) {
          #model-tools {
            left: 0;
            right: 0;
            padding: var(--spacing-xs) var(--spacing-sm);
          }
          
          .search-container {
            flex-direction: column;
            align-items: stretch;
            gap: var(--spacing-sm);
          }
          
          .search-input-wrapper {
            max-width: none;
          }
          
          .search-actions {
            justify-content: center;
          }
          
          .pills-group {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-sm);
          }
          
          .group-label {
            font-size: var(--font-size-xs);
          }
          
          .search-hint {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-sm);
          }
          
          .keyboard-shortcuts {
            align-self: flex-end;
          }
        }
        
        @media (max-width: 480px) {
          .search-btn {
            width: 100%;
            justify-content: center;
          }
          
          .pills {
            justify-content: center;
          }
          
          .keyboard-shortcuts {
            display: none;
          }
        }
      `}</style>
            </div>
            <div style={{ height: Math.max(0, (barHeight || 0) + 12) }} />
        </>
    );
}


