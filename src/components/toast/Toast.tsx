import React, { useEffect, useState } from 'react';
import type { ToastProps } from '../../types/Toast';
import styles from '../../styles/Toast.module.css';
import classNames from 'classnames';
import { useDraggable } from '../../hooks/useDraggable';
import { useRef } from 'react';

export const Toast: React.FC<ToastProps> = ({
    id,
    type,
    content,
    duration = 3000,
    onDismiss,
    draggable = false,
}) => {
    const [isExiting, setIsExiting] = useState(false);
    const toastRef = useRef<HTMLDivElement>(null);
    const { onMouseDown } = useDraggable(draggable, toastRef as React.RefObject<HTMLElement>);

    const handleDismiss = React.useCallback(() => {
        setIsExiting(true);
        // Wait for animation to finish before removing from DOM
        setTimeout(() => {
            onDismiss(id);
        }, 300); // 300ms matches CSS animation
    }, [id, onDismiss]);

    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                handleDismiss();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, handleDismiss]);

    return (
        <div
            ref={toastRef}
            className={classNames(
                styles.toast,
                styles[type],
                {
                    [styles.exiting]: isExiting,
                    [styles.draggable]: draggable
                }
            )}
            role="alert"
            onMouseDown={onMouseDown}
        >
            <div className={styles.icon}>
                {type === 'success' && '✓'}
                {type === 'error' && '✕'}
                {type === 'warning' && '!'}
                {type === 'info' && 'i'}
            </div>
            <div className={styles.content}>{content}</div>
            <button className={styles.closeBtn} onClick={handleDismiss}>×</button>
        </div>
    );
};
