console.log("SW startup");

self.addEventListener('install', function(event) {
  console.log("SW installed");
});

self.addEventListener('activate', function(event) {
  console.log("SW activated");
});

self.addEventListener('fetch', function(event) {
  console.log('Handling fetch event for', event.request.url);
  event.respondWith(
		fetch(event.request).then(function(response) {
			if (response.status != 200) {
				console.info('Returning fallback response to page...');
				return(new Response("Il server ha risposto con codice di errore. Forse la risorsa non esiste?"));
			} else {
        console.log('Returning response directly to page:', response);
        return response;
      }
		})
	);
});

