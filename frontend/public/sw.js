self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  
    const title = 'Push Notification';
    const options = {
      body: event.data.text(),
      icon: 'icon.png',
      badge: 'badge.png'
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  });


  self.addEventListener('activate', async () => {
    // This will be called only once when the service worker is activated.
    try {
      const applicationServerKey = urlB64ToUint8Array(
        'BAQdkDtAUoT2_gXE_eYoCv6crtqpldz4JJKT7gFV8Q-fx-z_m5lAPgXSiPtKfHfEph8PDOTUQiw-lrbW76dS4jk'
      )
      const options = { applicationServerKey, userVisibleOnly: true }
      const subscription = await self.registration.pushManager.subscribe(options)
      console.log(JSON.stringify(subscription))
    } catch (err) {
      console.log('Error', err)
    }
  })



  const urlB64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
    const rawData = atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }
  