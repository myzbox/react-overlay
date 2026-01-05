import type { ReactNode, RefObject, CSSProperties } from 'react';

export type ModalPosition =
    | 'center'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'auto';

export type ModalAnimation = 'zoom' | 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'drawer-slide-left' | 'drawer-slide-right' | 'drawer-slide-up' | 'drawer-slide-down' | 'none';

export interface ModalProps {
    /**
     * Controls the visibility of the modal.
     */
    isOpen: boolean;
    /**
     * Callback fired when the modal requests to be closed.
     */
    onClose: () => void;
    /**
     * Content to return inside the modal.
     */
    children: ReactNode;
    /**
     * Modal title (optional).
     */
    title?: ReactNode;
    /**
     * Modal footer content (optional).
     */
    footer?: ReactNode;
    /**
     * Whether to close the modal when clicking on the overlay.
     * @default true
     */
    closeOnOverlayClick?: boolean;
    /**
     * Whether to close the modal when pressing the Escape key.
     * @default true
     */
    closeOnEsc?: boolean;
    /**
     * Additional class name for the overlay.
     */
    overlayClassName?: string;
    /**
     * Additional class name for the modal content container.
     */
    className?: string;
    /**
     * Inline styles for the overlay.
     */
    overlayStyle?: CSSProperties;
    /**
     * Inline styles for the content.
     */
    style?: CSSProperties;
    /**
     * Position of the modal on the screen.
     * @default 'center'
     */
    position?: ModalPosition;
    /**
     * Size of the modal.
     * @default 'md'
     */
    size?: ModalSize;
    /**
     * Animation type.
     * @default 'zoom'
     */
    animation?: ModalAnimation;
    /**
     * Element to focus when the modal opens.
     */
    initialFocusRef?: RefObject<HTMLElement | null>;
    /**
     * Element that should remain accessible (not hidden to screen readers) usually root.
     */
    appElement?: HTMLElement | string;
    /**
     * Z-index override
     */
    zIndex?: number;
    /**
     * Enable drag functionality
     */
    draggable?: boolean;
    /**
     * Whether to hide the header section (title and close button)
     */
    hideHeader?: boolean;
}
