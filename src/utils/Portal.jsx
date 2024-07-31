import { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
  useEffect(() => {
    let el = document.getElementById('portal');

    if (!el) {
      el = document.createElement('div');
      el.id = 'portal';
      document.body.appendChild(el);
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const removedNodes = Array.from(mutation.removedNodes);
        removedNodes.forEach((node) => {
          if (node.id === 'portal') {
            const newRoot = document.createElement('div');
            newRoot.id = 'portal';
            document.body.appendChild(newRoot);
            el = newRoot;
            ReactDOM.createPortal(children, newRoot);
          }
        });
      });
    });

    observer.observe(document.body, { childList: true });

    return () => observer.disconnect();
  }, [children]);

  const el = document.getElementById('portal');

  return el ? ReactDOM.createPortal(children, el) : null;
};

export default Portal;
