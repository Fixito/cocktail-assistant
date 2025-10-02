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
    <style>
      .toaster {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        max-width: 400px;
      }

      .toast {
        border-radius: 6px;
        padding: 12px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        animation: slideIn 0.3s ease-out;
      }

      .toast-success {
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
      }

      .toast-error {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
      }

      .toast-info {
        background: #d1ecf1;
        color: #0c5460;
        border: 1px solid #bee5eb;
      }

      .toast-message {
        flex: 1;
        margin-right: 8px;
      }

      .toast-close {
        background: none;
        border: none;
        font-size: 18px;
        line-height: 1;
        cursor: pointer;
        padding: 0;
        color: inherit;
        opacity: 0.7;
      }

      .toast-close:hover {
        opacity: 1;
      }
        
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    </style>
    
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

customElements.define('app-toaster', component(Toaster));