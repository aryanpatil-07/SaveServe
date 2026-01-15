export interface StorySectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export interface BurnoutData {
  week: number;
  stress: number;
  performance: number;
}

export enum SectionType {
  INTRO = 'INTRO',
  REALIZATION = 'REALIZATION',
  DATA = 'DATA',
  REFLECTION = 'REFLECTION',
  ACTION = 'ACTION'
}