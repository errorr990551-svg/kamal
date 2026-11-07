import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { normalizePath } from './data/seo';

const RouterContext = createContext({ path: '/', navigate: () => {} });

export function RouterProvider({ initialPath, children }) {
  const [path, setPath] = useState(() =>
    normalizePath(initialPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/')),
  );

  useEffect(() => {
    const onPop = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to) => {
    const [pathname, hash] = to.split('#');
    const target = normalizePath(pathname || window.location.pathname);
    if (window.location.pathname !== target || hash) {
      window.history.pushState(null, '', target + (hash ? `#${hash}` : ''));
    }
    setPath(target);
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}

export const useRouter = () => useContext(RouterContext);

// Real <a href> so search engines and users (middle-click, long-press, share) can follow links,
// with client-side navigation for normal clicks.
export function Link({ to, onClick, children, ...rest }) {
  const { navigate, path } = useRouter();
  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  const isCurrent = normalizePath(to.split('#')[0]) === path && !to.includes('#');
  return (
    <a href={to} onClick={handleClick} aria-current={isCurrent ? 'page' : undefined} {...rest}>
      {children}
    </a>
  );
}
