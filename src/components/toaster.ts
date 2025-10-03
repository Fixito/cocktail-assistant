import { component, html, useEffect, useState } from '@pionjs/pion';

export interface ToastMessage {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error';
  duration?: number;
}

let toastIdCounter = 0;
let globalToaster: any = null;

export function showToast(message: string, type: 'info' | 'success' | 'error' = 'info', duration: number = 3000) {
  const toast: ToastMessage = {
    id: ++toastIdCounter,
    message,
    type,
    duration
  };

  globalToaster.addToast(toast);
};

function Toaster() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: ToastMessage) => {
    setToasts(prev => [...prev, toast]);

    setTimeout(() => {
      removeToast(toast.id);
    }, toast.duration || 3000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  useEffect(() => {
    // Store reference to this component instance
    globalToaster = { addToast };

    return () => {
      globalToaster = null;
    };
  }, []);

  if (!toasts.length) return html``;

  return html`
    <div class="toaster">
      ${toasts.map(toast => html`
        <div 
          key=${toast.id}
          class="toast toast-${toast.type}"
          @click=${() => removeToast(toast.id)}
        >
          <span class="toast-message">${toast.message}</span>
          <span class="toast-close">
            &times;
          </span>
        </div>
      `)}
    </div>
  `;
}

customElements.define('app-toaster', component(Toaster, { useShadowDOM: false }));