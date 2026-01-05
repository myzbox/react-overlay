import type { ReactNode } from 'react';

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverProps {
    children: ReactNode; // The trigger element
    content: ReactNode | ((close: () => void) => ReactNode);  // The popover content
    position?: PopoverPosition;
    className?: string;
    style?: React.CSSProperties;
    width?: string | number;
    draggable?: boolean;
}
