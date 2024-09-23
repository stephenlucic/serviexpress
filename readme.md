<div style="display: flex; justify-content: space-between;">
    <img src="https://cdn.worldvectorlogo.com/logos/angular-3.svg" alt="Descripción imagen 2" width="300" />
    <img src="https://trbl-services.eu/wp-content/uploads/2018/06/ionic-1.png" alt="Descripción imagen 1" width="120" />
</div>

![](https://img.shields.io/github/stars/pandao/editor.md.svg) ![](https://img.shields.io/github/forks/pandao/editor.md.svg) ![](https://img.shields.io/github/tag/pandao/editor.md.svg) ![](https://img.shields.io/github/release/pandao/editor.md.svg) ![](https://img.shields.io/github/issues/pandao/editor.md.svg) ![](https://img.shields.io/bower/v/editor.md.svg)

# ServiExpress
Es una mecanica que necesita de una aplicación movil para gestionar sus productos, hacer reservas y que tenga autentificación de usuario, ademas se incluye API nativas para el uso de camara y geolocalización. Se utiliza también la API de google maps para poder utilizar su mapa.

Este es un proyecto desarrollado con **Ionic Framework** y **Angular**. La aplicación utiliza diversas funcionalidades nativas a través de Capacitor y se conecta a Firebase para gestionar datos.


## Requisitos previos

Asegúrate de tener instalados los siguientes componentes antes de comenzar:

- Node.js 20.5.1
- npm 9.8.1
- Ionic CLI: `npm install -g @ionic/cli`
- Angular CLI: `npm install -g @angular/cli`
- Capacitor

## Instalación

Para poder ejecutar el proyecto es necesario configurar la base de datos de firebase y agregar la apikey del maps de google en environment.prod.ts y environment.ts , acá un ejemplo donde se reemplazaron algunos carácteres por seguridad:
```  
export const environment = {
  production: true, #este valor cambia a false para el enviroments.ts

  mapsKey:'AIzaSyB0ldfGxxxxxxxx',

  firebaseConfig : {
    apiKey: "AIzaSyDwwxxxxxxx",
    authDomain: "serviexpressapp-xxxxxx",
    projectId: "serviexpressapp-xxxxx",
    storageBucket: "serviexpressapp-xxxxxx",
    messagingSenderId: "10000xxxxxx",
    appId: "1:100009xxxxxx:web:f51f56xxxxxx"
  }
};
```

Sigue estos pasos para clonar e instalar las dependencias del proyecto:

```bash
git clone https://github.com/stephenlucic/serviexpress.git
npm install #esto instalará las dependencias del proyecto
ionic serve #para iniciar proyecto
```

## Dependencias principales

- Ionic Framework: v7.0.0
- Angular: v16.0.0
- Capacitor: v5.0.0
- Firebase: v9.23.0
- Google Maps: Capacitor plugin v5.3.3



## Plugins utilizados

@capacitor/camera: Para capturar imágenes desde la cámara.
@capacitor/geolocation: Para obtener la ubicación del dispositivo.
@capacitor/google-maps: Para integrar mapas de Google.
@capacitor/haptics: Para proporcionar retroalimentación háptica (vibraciones).
@capacitor/mlkit/barcode-scanning: Para escanear códigos de barras.
