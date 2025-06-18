
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, hoverEffect = false }) => {
  const baseStyle = "bg-brand-surface rounded-lg shadow-lg overflow-hidden";
  const hoverStyle = hoverEffect ? "transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1" : "";
  const clickableStyle = onClick ? "cursor-pointer" : "";

  return (
    <div
      className={`${baseStyle} ${hoverStyle} ${clickableStyle} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
