/* global Prism */
import 'prismjs';

import * as React from 'react';
import copy from 'copy-to-clipboard';

import { Icon } from './Icon';

Prism.languages.markdoc = {
  tag: {
    pattern: /{%(.|\n)*?%}/i,
    inside: {
      tagType: {
        pattern: /^({%\s*\/?)(\w|-)*\b/i,
        lookbehind: true
      },
      id: /#(\w|-)*\b/,
      string: /".*?"/,
      equals: /=/,
      number: /\b\d+\b/i,
      variable: {
        pattern: /\$[\w.]+/i,
        inside: {
          punctuation: /\./i
        }
      },
      function: /\b\w+(?=\()/,
      punctuation: /({%|\/?%})/i,
      boolean: /false|true/
    }
  },
  variable: {
    pattern: /\$\w+/i
  },
  function: {
    pattern: /\b\w+(?=\()/i
  }
};

export function Code({ children, 'data-language': language }) {
  const [copied, setCopied] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref.current) Prism.highlightElement(ref.current, false);
  }, [children]);

  React.useEffect(() => {
    if (copied) {
      copy(ref.current.innerText);
      const to = setTimeout(setCopied, 1000, false);
      return () => clearTimeout(to);
    }
  }, [copied]);

  const lang = language === 'md' ? 'markdoc' : language || 'markdoc';

  return (
    <div className="code" aria-live="polite">
      <div className="code__header">
        <span className="code__lang">{lang}</span>
        <button onClick={() => setCopied(true)}>
          <Icon icon={copied ? 'copied' : 'copy'} />
        </button>
      </div>
      <pre
        // Prevents "Failed to execute 'removeChild' on 'Node'" error
        // https://stackoverflow.com/questions/54880669/react-domexception-failed-to-execute-removechild-on-node-the-node-to-be-re
        key={children}
        ref={ref}
        className={`language-${lang}`}
      >
        {children}
      </pre>
      <style jsx>
        {`
          .code {
            position: relative;
          }
          .code__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 6px 10px;
            border: 1px solid var(--code-border);
            border-bottom: none;
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
            background: var(--code-background);
          }
          .code__lang {
            font-family: var(--mono);
            font-size: 12px;
            text-transform: uppercase;
            opacity: 0.7;
          }
          .code__header button {
            appearance: none;
            color: inherit;
            background: var(--code-background);
            border-radius: 4px;
            border: none;
            font-size: 15px;
          }
          pre[class*='language-'] {
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
          }
        `}
      </style>
    </div>
  );
}
