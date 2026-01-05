import type { ReactNode } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
    children: ReactNode;
    content: ReactNode;
    position?: TooltipPosition;
    delay?: number;
    width?: string | number;
    height?: string | number;
    className?: string;
    style?: React.CSSProperties;
    /**
     * By default, tooltips may clip if parent has overflow:hidden.
     * Using a portal avoids this but adds complexity.
     * For this implementation, we'll keep it simple first.
     */
}
