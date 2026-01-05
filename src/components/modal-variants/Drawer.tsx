import React from 'react';
import { Modal } from '../modal/Modal';
import type { ModalProps, ModalPosition } from '../../types/Modal';
import classNames from 'classnames';
import styles from '../../styles/ModalVariants.module.css'; // We might want shared drawer styles here or in Modal.module.css

export interface DrawerProps extends ModalProps {
    placement?: 'left' | 'right' | 'top' | 'bottom';
}

export const Drawer: React.FC<DrawerProps> = ({
    placement = 'right',
    className,
    ...props
}) => {

    // Map placement to Modal position and animation
    let position: ModalPosition = 'right';
    let animation: ModalProps['animation'] = 'slide-right';

    switch (placement) {
        case 'left':
            position = 'left';
            animation = 'drawer-slide-left' as ModalProps['animation'];
            break;
        case 'top':
            position = 'top';
            animation = 'drawer-slide-down' as ModalProps['animation'];
            break;
        case 'bottom':
            position = 'bottom';
            animation = 'drawer-slide-up' as ModalProps['animation'];
            break;
        case 'right':
        default:
            position = 'right';
            animation = 'drawer-slide-right' as ModalProps['animation'];
            break;
    }

    return (
        <Modal
            {...props}
            position={position}
            animation={animation}
            className={classNames(styles.drawer, styles[placement], className)}
        // Drawers usually are full height (for left/right) or full width (for top/bottom)
        // But we can let styles handle that based on position
        />
    );
};
