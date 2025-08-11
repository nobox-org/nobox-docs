import React from 'react';
import copy from 'copy-to-clipboard';

export function CopyLLMs() {
    const [state, setState] = React.useState({ copying: false, copied: null });

    const copyFrom = async (path) => {
        try {
            setState({ copying: true, copied: null });
            const res = await fetch(path);
            const text = await res.text();
            copy(text);
            setState({ copying: false, copied: path });
            setTimeout(() => setState({ copying: false, copied: null }), 1500);
        } catch (e) {
            setState({ copying: false, copied: null });
        }
    };

    return (
        <div className="copy-llms">
            <div className="row">
                <button onClick={() => copyFrom('/llms-full.txt')} disabled={state.copying}>
                    {state.copying && state.copied === null ? 'Copying…' : state.copied === '/llms-full.txt' ? 'Copied!' : 'Copy full list'}
                </button>
                <a href="/llms-full.txt" download>Download</a>
            </div>
            <div className="row">
                <button onClick={() => copyFrom('/llms-full-minified.txt')} disabled={state.copying}>
                    {state.copying && state.copied === null ? 'Copying…' : state.copied === '/llms-full-minified.txt' ? 'Copied!' : 'Copy minified list'}
                </button>
                <a href="/llms-full-minified.txt" download>Download</a>
            </div>
            <style jsx>{`
        .copy-llms { display: grid; gap: 0.5rem; margin: 1rem 0; }
        .row { display: flex; align-items: center; gap: 0.75rem; }
        button {
          appearance: none;
          border: 1px solid var(--code-border);
          background: var(--code-background);
          color: var(--dark);
          padding: 6px 10px;
          border-radius: 6px;
          cursor: pointer;
        }
        button:disabled { opacity: 0.6; cursor: default; }
        a { color: var(--link); text-decoration: none; font-weight: 500; }
      `}</style>
        </div>
    );
}

export default CopyLLMs;


