import React from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({ children, className = '', id }) => {
  return (
    <section 
        id={id} 
        className={`relative ${className}`}
    >
      {children}
    </section>
  );
};