'use strict';


window.addEventListener('load', async () => {
  await registerServiceWorker();

  registerApp();
});

async function registerServiceWorker() {
  if (!Reflect.has(navigator, 'serviceWorker')) {
    return;
  }

  const { serviceWorker } = navigator;
  
  await serviceWorker.register('/worker.js');
};


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
