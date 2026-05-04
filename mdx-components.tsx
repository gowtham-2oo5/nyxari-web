import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-display font-bold text-[clamp(1.75rem,5vw,2.5rem)] text-inverse-surface uppercase mb-8">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display font-bold text-xl text-inverse-surface uppercase mt-12 mb-4 pt-8 border-t border-outline-variant/20">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display font-bold text-lg text-inverse-surface uppercase mt-10 mb-3">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="font-body text-sm text-on-surface-variant/70 leading-relaxed mb-4">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-none mb-4 flex flex-col gap-1">{children}</ul>
    ),
    li: ({ children }) => (
      <li className="font-body text-sm text-on-surface-variant/70 leading-relaxed pl-4 border-l border-outline-variant/20">
        {children}
      </li>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-container hover:underline"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="text-on-surface font-bold">{children}</strong>
    ),
    code: ({ children }) => (
      <code className="font-mono text-xs bg-surface-container-high px-1.5 py-0.5 text-primary-container">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-surface-container-high border border-outline-variant/20 p-4 overflow-x-auto mb-6 font-mono text-xs text-on-surface-variant/60">
        {children}
      </pre>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-left border-collapse">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="py-2 px-3 border-b-2 border-outline-variant/30 font-mono text-[10px] font-bold tracking-[0.1em] uppercase text-on-surface-variant/40">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="py-2 px-3 border-b border-outline-variant/15 font-mono text-xs text-on-surface-variant/60">
        {children}
      </td>
    ),
    hr: () => (
      <hr className="border-outline-variant/20 my-8" />
    ),
    ...components,
  };
}
