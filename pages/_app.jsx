import "../styles/globals.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/service-worker.js', { scope: '/' })
                .then((registration) => {
                    console.log(
                        'Service worker registered successfully. Scope:',
                        registration.scope
                    );
                })
                .catch((error) => {
                    console.error('Service worker registration failed:', error);
                });
        }
    }, []);
    return <Component {...pageProps} />;
}
