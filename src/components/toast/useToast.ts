import { useContext } from 'react';
import { ToastContext } from './ToastProvider';
import type { ToastOptions } from '../../types/Toast';

type ToastInput = React.ReactNode | (Omit<ToastOptions, 'id' | 'type'> & { content: React.ReactNode });

export const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }

    const { addToast, removeToast, clearAll } = context;

    const show = (type: ToastOptions['type'], input: ToastInput, options: Partial<ToastOptions> & { closeOthers?: boolean } = {}) => {
        let content: React.ReactNode;
        let finalOptions = { ...options };

        if (typeof input === 'object' && input !== null && 'content' in input && !React.isValidElement(input)) {
            // Handle case where input object contains content and options
            const inputObj = input as Record<string, unknown>;
            content = inputObj.content as React.ReactNode;
            finalOptions = { ...finalOptions, ...inputObj } as Partial<ToastOptions> & { closeOthers?: boolean };
        } else {
            content = input as React.ReactNode;
        }

        addToast({
            type,
            content,
            duration: 3000,
            position: 'top-right',
            ...finalOptions,
        });
    };

    return {
        success: (content: React.ReactNode, options?: Partial<ToastOptions> & { closeOthers?: boolean }) => show('success', content, options),
        error: (content: React.ReactNode, options?: Partial<ToastOptions> & { closeOthers?: boolean }) => show('error', content, options),
        warning: (content: React.ReactNode, options?: Partial<ToastOptions> & { closeOthers?: boolean }) => show('warning', content, options),
        info: (content: React.ReactNode, options?: Partial<ToastOptions> & { closeOthers?: boolean }) => show('info', content, options),
        dismiss: (id: string) => removeToast(id),
        dismissAll: () => clearAll(),
    };
};

import React from 'react'; // fix for React usage in type check above
