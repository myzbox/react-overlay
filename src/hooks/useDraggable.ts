import React, { useRef, useEffect, type RefObject, useCallback } from 'react';

export const useDraggable = (
    enabled: boolean,
    elementRef: RefObject<HTMLElement>
) => {
    const isDragging = useRef(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const translate = useRef({ x: 0, y: 0 });

    const onMouseMove = useCallback((e: globalThis.MouseEvent) => {
        if (!isDragging.current || !elementRef.current) return;

        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;

        const currentX = translate.current.x + dx;
        const currentY = translate.current.y + dy;

        elementRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }, [elementRef]);

    const onMouseUp = useCallback((e: globalThis.MouseEvent) => {
        if (!isDragging.current) return;
        isDragging.current = false;

        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;

        translate.current = {
            x: translate.current.x + dx,
            y: translate.current.y + dy
        };

        // Re-enable transition
        if (elementRef.current) {
            elementRef.current.style.transition = '';
        }

        document.body.style.userSelect = '';
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }, [elementRef, onMouseMove]);

    const onMouseDown = (e: React.MouseEvent) => {
        if (!enabled || !elementRef.current) return;

        isDragging.current = true;
        dragStart.current = { x: e.clientX, y: e.clientY };

        // Disable transition for instant follow
        elementRef.current.style.transition = 'none';

        document.body.style.userSelect = 'none';
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    useEffect(() => {
        const cleanup = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
        return cleanup;
    }, [onMouseMove, onMouseUp]);

    // Reset position if disabled
    useEffect(() => {
        if (!enabled) {
            translate.current = { x: 0, y: 0 };
        }
    }, [enabled]);

    return { onMouseDown };
};
