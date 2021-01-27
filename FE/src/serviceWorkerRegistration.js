/* eslint-disable */

/****** CHECKING IF SCRIPT IS LOADED ON LOCALHOST ******/
const isLocalhost = Boolean(
  // The Window.location read-only property returns a Location object with information about the current location of the document.
  window.location.hostname === 'localhost' ||
    // any Device connected to the Internet needs a numerical IP address to communicate between other devices. It is provided by IPv4 or IP6
    // The name localhost normally resolves to the IPv4 loopback address 127.0.0.1, and to the IPv6 loopback address ::1
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

/****** CHECKS BEFORE ACTUALLY REGISTERING SERVICE WORKER ******/

export function register(config) {
  // code inside runs only in PRODUCTION & when browser supports service workers
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    // in new URL, if first argument is relative path, the second needs to be the base
    // here PUBLIC_URL will take us to the public/index.html file & window.location.href will give us the path from which this code runs
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href) // new URL(url [, base]) = new URL("/", "http://localhost:3000/")
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => { // The load event is fired when the whole page has loaded, including all dependent resources such as stylesheets and images
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`; // referencing public folder by using PUBLIC_URL environment variable

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker, on localhost. Check the register function if ' +
              'this is intended behaviour'
          );
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

/****** REGISTERING & INSTALLING SERVICE WORKER ******/

function registerValidSW(swUrl, config) {
  navigator.serviceWorker // returns the ServiceWorkerContainer object
    .register(swUrl)
    .then((registration) => { // registration = ServiceWorkerRegistration interface
      registration.onupdatefound = () => { // onupdatefound = EventListener property called whenever an event of type updatefound is fired. Fired every time ServiceWorkerRegistration.installing propery aquires a new service worker
        const installingWorker = registration.installing; // returns a service worker whose state is installing. This is initially set to null
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => { // onstatechange = an eventListener property called whenever an event of type statechange is fired. It is basically fired anytime the SericeWorker.state changes
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://cra.link/PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}

/****** UTILITY FUNCTION THAT CANVERIFY IF VALID SERVICE WORKER EXISTS ******/

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
