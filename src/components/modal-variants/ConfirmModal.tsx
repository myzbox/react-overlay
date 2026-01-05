import React, { useState } from 'react';
import { Modal } from '../modal/Modal';
import type { ModalProps } from '../../types/Modal';
import styles from '../../styles/ModalVariants.module.css';
import classNames from 'classnames';

export interface ConfirmModalProps extends Omit<ModalProps, 'children' | 'footer'> {
    message: React.ReactNode;
    onConfirm: () => void | Promise<void>;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    isDestructive?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    message,
    onConfirm,
    onCancel,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isDestructive = false,
    onClose,
    className,
    ...props
}) => {
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        try {
            setLoading(true);
            await onConfirm();
            onClose();
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        onCancel?.();
        onClose();
    };

    return (
        <Modal
            {...props}
            onClose={onClose}
            className={classNames(styles.confirmModal, className)}
            size="sm"
            closeOnOverlayClick={!loading}
            closeOnEsc={!loading}
            footer={
                <>
                    <button
                        className={styles.cancelButton}
                        onClick={handleCancel}
                        disabled={loading}
                    >
                        {cancelText}
                    </button>
                    <button
                        className={classNames(styles.confirmButton, { [styles.destructive]: isDestructive })}
                        onClick={handleConfirm}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : confirmText}
                    </button>
                </>
            }
        >
            <div className={styles.confirmContent}>
                {message}
            </div>
        </Modal>
    );
};
