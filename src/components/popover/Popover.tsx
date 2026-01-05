import React, { useState, useRef } from 'react';
import type { PopoverProps } from '../../types/Popover';
import styles from '../../styles/Popover.module.css';
import classNames from 'classnames';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useDraggable } from '../../hooks/useDraggable';

export const Popover: React.FC<PopoverProps> = ({
    children,
    content,
    position = 'bottom',
    className,
    style,
    width,
    draggable = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useClickOutside(containerRef as React.RefObject<HTMLElement>, () => {
        if (isOpen) setIsOpen(false);
    });

    const { onMouseDown } = useDraggable(draggable, contentRef as React.RefObject<HTMLElement>);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className={styles.wrapper} ref={containerRef}>
            <div onClick={toggleOpen} className={styles.trigger}>
                {children}
            </div>

            {isOpen && (
                <div
                    ref={contentRef}
                    className={classNames(
                        styles.popover,
                        styles[position],
                        className,
                        { [styles.draggable]: draggable }
                    )}
                    style={{ width, ...style }}
                    role="dialog"
                    aria-modal="false"
                    onMouseDown={onMouseDown}
                >
                    {typeof content === 'function' ? content(() => setIsOpen(false)) : content}
                </div>
            )}
        </div>
    );
};
