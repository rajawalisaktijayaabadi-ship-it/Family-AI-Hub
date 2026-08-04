import React from 'react';

export interface PageLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  scrollable?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  header,
  footer,
  className = '',
  scrollable = true,
}) => {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-md mx-auto bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans relative overflow-x-hidden shadow-2xl">
      {header && <header className="shrink-0 z-30">{header}</header>}

      <main
        className={`flex-1 w-full px-4 py-4 space-y-4 pb-28 ${
          scrollable ? 'overflow-y-auto no-scrollbar' : 'overflow-hidden'
        } ${className}`}
      >
        {children}
      </main>

      {footer && <footer className="shrink-0 z-30">{footer}</footer>}
    </div>
  );
};

export const ContentLayout: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`space-y-4 w-full ${className}`}>{children}</div>;

export const ScrollableLayout: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`overflow-y-auto no-scrollbar space-y-4 pb-28 ${className}`}>{children}</div>
);
