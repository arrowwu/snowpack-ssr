const onNewServiceWorker = (registration, callback) => {
  if (registration.waiting) {
    // SW is waiting to activate. Can occur if multiple clients open and
    // one of the clients is refreshed.
    return callback();
  }

  const listenInstalledStateChange = () => {
    registration.installing.addEventListener('statechange', event => {
      if (event.target.state === 'installed') {
        // A new service worker is available, inform the user
        callback();
      }
    });
  };

  if (registration.installing) {
    return listenInstalledStateChange();
  }
  // We are currently controlled so a new SW may be found...
  // Add a listener in case a new SW is found,
  registration.addEventListener('updatefound', listenInstalledStateChange);
};
export function registerServiceWorker() {
  return new Promise((resolve, reject) => {
    if ('serviceWorker' in navigator) {
      const run = () => {
          navigator.serviceWorker.register('../sw.js').then(
            registration => {
              resolve(registration.scope);
            },
            err => {
              reject(err);
            }
          );
        
      };

      window.addEventListener('load', function () {
        run();
      });
    } else {
      reject(new Error('SW API NOT SUPPORTED'));
    }
  });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}