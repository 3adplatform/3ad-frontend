import { FC, useEffect, useState } from 'react';
import { Toast, ToastManager } from './Toast';

export const ToastContainer: FC = () => {
  const [toasts, setToasts] = useState<{ id: number; props: any }[]>([]);

  useEffect(() => {
    const unsubscribe = ToastManager.subscribe(setToasts);
    return unsubscribe;
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map(({ id, props }) => (
        <Toast key={id} {...props} />
      ))}
    </div>
  );
};

export default ToastContainer; 