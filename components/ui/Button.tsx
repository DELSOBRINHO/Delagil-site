import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  isLoading = false,
  loadingText,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyle = "font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 ease-in-out inline-flex items-center justify-center";
  
  const variantStyles = {
    primary: 'bg-brand-accent hover:bg-brand-accent-hover text-brand-text-on-primary focus:ring-brand-accent',
    secondary: 'bg-brand-primary hover:bg-brand-primary-dark text-brand-text-on-primary focus:ring-brand-primary',
    outline: 'border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-brand-text-on-primary focus:ring-brand-accent',
    ghost: 'text-brand-accent hover:bg-brand-accent/10 focus:ring-brand-accent',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const loadingStyle = isLoading ? 'opacity-75 cursor-not-allowed' : '';
  const isDisabled = isLoading || disabled;

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${loadingStyle} ${className}`}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && (
        <>
          <svg 
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {loadingText && <span className="sr-only">{loadingText}</span>}
        </>
      )}
      {leftIcon && !isLoading && <span className="mr-2" aria-hidden="true">{leftIcon}</span>}
      {children}
      {rightIcon && !isLoading && <span className="ml-2" aria-hidden="true">{rightIcon}</span>}
    </button>
  );
};

export default Button;
