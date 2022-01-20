window.addEventListener("load", function () {
    if ('service-worker' in navigator) {
        // clear cache when installing
        caches.keys().then(function (names) {
            for (let name of names)
                caches.delete(name);
        });
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    }
});