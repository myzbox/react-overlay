import React from 'react';
import { Modal } from '../modal/Modal';
import type { ModalProps } from '../../types/Modal';
import styles from '../../styles/ModalVariants.module.css';
import classNames from 'classnames';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface AlertModalProps extends Omit<ModalProps, 'children' | 'footer'> {
    type?: AlertType;
    message: React.ReactNode;
    onOk?: () => void;
    okText?: string;
    showHeader?: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
    type = 'info',
    message,
    onOk,
    okText = 'OK',
    onClose,
    className,
    showHeader = true,
    ...props
}) => {
    const handleOk = () => {
        onOk?.();
        onClose();
    };

    return (
        <Modal
            {...props}
            onClose={onClose}
            className={classNames(styles.alertModal, styles[type], className)}
            size="sm"
            hideHeader={!showHeader}
            footer={
                <button className={styles.okButton} onClick={handleOk}>
                    {okText}
                </button>
            }
        >
            <div className={styles.alertContent}>
                <div className={styles.icon}>
                    {type === 'success' && '✓'}
                    {type === 'error' && '✕'}
                    {type === 'warning' && '!'}
                    {type === 'info' && 'i'}
                </div>
                <div className={styles.message}>{message}</div>
            </div>
        </Modal>
    );
};
