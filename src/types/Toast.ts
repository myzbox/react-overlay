import type { ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';

export interface ToastOptions {
    id: string;
    type: ToastType;
    content: ReactNode;
    duration?: number; // ms, if 0 then no auto-close
    delay?: number;    // ms, wait before showing
    position?: ToastPosition;
    draggable?: boolean;
    onClose?: () => void;
}

export interface ToastProps extends ToastOptions {
    onDismiss: (id: string) => void;
}
