if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/training/sw.js', { scope: '/training/' })})}