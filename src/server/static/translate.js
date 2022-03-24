'use strict';

console.log('JavaScript has loaded');

const registerServiceWorker = () => {
  if (!Reflect.has(navigator, 'serviceWorker')) {
    console.log('Service workers are not supported');
    return;
  }
  const { serviceWorker } = navigator;
  serviceWorker.register('/worker.js').then((registration) => {
    if (registration.installing) {
      console.log('Service worker installing');
      console.log(registration.installing);
      return;
    }
    if (registration.waiting) {
      console.log('Service worker installed');
      console.log(registration.waiting);
      return;
    }
    if (registration.active) {
      console.log('Service worker active');
      console.log(registration.active);
      return;
    }
  }).catch((error) => {
    console.log('Registration failed');
    console.log(error);
  });
};

window.addEventListener('load', () => {
  console.log('The page has loaded');
  registerServiceWorker();
  registerApp();
});

window.addEventListener('beforeinstallprompt', (event) => {
  console.log('Installing PWA');
  console.dir({ beforeinstallprompt: event });
});

window.addEventListener('appinstalled', (event) => {
  console.log('PWA installed');
  console.dir({ appinstalled: event });
});

function registerApp() {
  const api = {
    async translate(text) {
      const url = '/translate'
  
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
  
      const json = await response.json()

      return json ? json.ru : ''
    }
  }

  
  const button = document.getElementById("button")
  const text = document.getElementById("text")
  const translate = document.getElementById("translate")
  
  button.addEventListener("click", async() => {
    const value = text.value

    if (!value) {
      return
    }

    const result = await api.translate(value)
    translate.innerHTML = `Перевод: ${result}`
  }); 
}
