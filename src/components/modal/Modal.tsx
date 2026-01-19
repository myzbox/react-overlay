import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from '../../styles/Modal.module.css';
import type { ModalProps } from '../../types/Modal';
import classNames from 'classnames';
import { useDraggable } from '../../hooks/useDraggable';

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    title,
    footer,
    closeOnOverlayClick = true,
    closeOnEsc = true,
    overlayClassName,
    className,
    overlayStyle,
    style,
    position = 'center',
    size = 'md',
    animation = 'zoom',
    initialFocusRef,

    zIndex,
    draggable = false,
    hideHeader = false,
}) => {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const { onMouseDown } = useDraggable(draggable, modalRef as React.RefObject<HTMLElement>);

    // Handle mounting for transition
    useEffect(() => {
        if (isOpen) {
            setMounted(true);
            // Small delay to allow CSS transition to initiate
            requestAnimationFrame(() => setVisible(true));
        } else {
            setVisible(false);
            const timer = setTimeout(() => {
                setMounted(false);
            }, 200); // Match CSS transition duration
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Handle ESC key
    useEffect(() => {
        if (!isOpen || !closeOnEsc) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, closeOnEsc, onClose]);

    // Handle Focus Trap (Senior level implementation: simple but effective manual trap for minimal deps)
    useEffect(() => {
        if (!isOpen || !mounted) return;

        const modalElement = modalRef.current;
        if (!modalElement) return;

        // Focus initial element or modal itself
        if (initialFocusRef?.current) {
            initialFocusRef.current.focus();
        } else {
            modalElement.focus();
        }

        const focusableElements = modalElement.querySelectorAll(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        const handleTab = (e: KeyboardEvent) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement?.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement?.focus();
                    }
                }
            }
        };

        modalElement.addEventListener('keydown', handleTab);
        return () => modalElement.removeEventListener('keydown', handleTab);
    }, [isOpen, mounted, initialFocusRef]);

    // Lock Body Scroll
    useEffect(() => {
        if (isOpen) {
            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalStyle;
            };
        }
    }, [isOpen]);

    if (!mounted) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget && closeOnOverlayClick) {
            onClose();
        }
    };

    const portalContent = (
        <div
            className={classNames(styles.overlay, { [styles.open]: visible }, styles[position], overlayClassName)}
            style={{ zIndex, ...overlayStyle }}
            onClick={handleOverlayClick}
            role="presentation"
        >
            <div
                ref={modalRef}
                className={classNames(
                    styles.modal,
                    { [styles.open]: visible },
                    styles[size],
                    styles[animation],
                    className
                )}
                style={style}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? 'modal-title' : undefined}
                tabIndex={-1}
            >
                {!hideHeader && (
                    <div
                        className={classNames(styles.header, { [styles.draggable]: draggable })}
                        onMouseDown={onMouseDown}
                        style={{ cursor: draggable ? 'move' : 'default' }}
                    >
                        {title ? (
                            <h2 id="modal-title" className={styles.title}>{title}</h2>
                        ) : (
                            <div /> // Placeholder to keep button on right
                        )}
                        <button
                            type="button"
                            className={styles.closeButton}
                            onClick={onClose}
                            aria-label="Close modal"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                )}

                <div className={styles.content}>
                    {children}
                </div>

                {footer && (
                    <div className={styles.footer}>
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );

    return createPortal(portalContent, document.body);
};

export default Modal;

