import React, { useState, useRef } from 'react';
import type { TooltipProps } from '../../types/Tooltip';
import styles from '../../styles/Tooltip.module.css';
import classNames from 'classnames';

export const Tooltip: React.FC<TooltipProps> = ({
    children,
    content,
    position = 'top',
    delay = 200,
    width,
    height,
    className,
    style,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showTooltip = () => {
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
        }, delay);
    };

    const hideTooltip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(false);
    };

    return (
        <div
            className={styles.wrapper}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
        >
            {children}
            {isVisible && (
                <div
                    className={classNames(styles.tooltip, styles[position], className)}
                    style={{ width, height, ...style }}
                    role="tooltip"
                >
                    {content}
                </div>
            )}
        </div>
    );
};
