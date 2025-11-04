export function loadGoogleMaps(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Ya cargado
    if (window.google?.maps) return resolve();

    // Evitar duplicado
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src*="maps.googleapis.com/maps/api/js"]'
    );
    
    if (existingScript) {
      if (window.google?.maps) {
        return resolve();
      }
      existingScript.addEventListener("load", () => resolve());
      existingScript.addEventListener("error", () => reject(new Error("Error cargando Google Maps")));
      return;
    }

    // Crear script con librería marker
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Error cargando Google Maps"));
    document.head.appendChild(script);
  });
}