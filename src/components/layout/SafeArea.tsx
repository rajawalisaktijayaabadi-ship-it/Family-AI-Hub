import React from 'react';

export interface SafeAreaProps {
  children: React.ReactNode;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  className?: string;
}

export const SafeArea: React.FC<SafeAreaProps> = ({
  children,
  top = true,
  bottom = true,
  left = true,
  right = true,
  className = '',
}) => {
  const safeClasses = [
    top ? 'pt-safe' : '',
    bottom ? 'pb-safe' : '',
    left ? 'pl-safe' : '',
    right ? 'pr-safe' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={safeClasses}>{children}</div>;
};
