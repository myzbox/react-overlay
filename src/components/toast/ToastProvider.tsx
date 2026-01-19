import React, { createContext, useState, type ReactNode, useCallback } from 'react';
import { Toast } from './Toast';
import type { ToastOptions, ToastPosition } from '../../types/Toast';
import styles from '../../styles/Toast.module.css';
import classNames from 'classnames';

interface ToastContextProps {
    addToast: (options: Omit<ToastOptions, 'id'> & { closeOthers?: boolean }) => void;
    removeToast: (id: string) => void;
    clearAll: () => void;
}

export const ToastContext = createContext<ToastContextProps | undefined>(undefined);

let idCounter = 0;

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastOptions[]>([]);

    const addToast = useCallback(({ closeOthers, delay = 0, ...options }: Omit<ToastOptions, 'id'> & { closeOthers?: boolean }) => {
        const id = `toast-${idCounter++}`;
        const newToast = { ...options, duration: options.duration, delay, id };

        const dispatch = () => {
            setToasts((prev) => {
                if (closeOthers) {
                    return [newToast];
                }
                return [...prev, newToast];
            });
        };

        if (delay > 0) {
            setTimeout(dispatch, delay);
        } else {
            dispatch();
        }
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const clearAll = useCallback(() => {
        setToasts([]);
    }, []);

    // Group toasts by position to render different containers
    const toastsByPosition = toasts.reduce((acc, toast) => {
        const pos = toast.position || 'top-right';
        if (!acc[pos]) acc[pos] = [];
        acc[pos].push(toast);
        return acc;
    }, {} as Record<ToastPosition, ToastOptions[]>);

    return (
        <ToastContext.Provider value={{ addToast, removeToast, clearAll }}>
            {children}
            {(Object.keys(toastsByPosition) as ToastPosition[]).map((pos) => (
                <div key={pos} className={classNames(styles.container, styles[pos])}>
                    {toastsByPosition[pos].map((toast) => (
                        <Toast key={toast.id} {...toast} onDismiss={removeToast} />
                    ))}
                </div>
            ))}
        </ToastContext.Provider>
    );
};

export default ToastProvider;

