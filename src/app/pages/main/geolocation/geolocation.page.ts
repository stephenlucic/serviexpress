import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements OnInit {
  @ViewChild('map')mapRef: ElementRef;
  map: GoogleMap;

  constructor(private toastController: ToastController) { }

  
  ionViewDidEnter(){
    
  }

  async createMap(){
    let ubicacion = await Geolocation.getCurrentPosition();

    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      config: {
        center:{
          lat: ubicacion.coords.latitude,
          lng: ubicacion.coords.longitude,
        },
        zoom:8,
      },
      
    });
    

  }

  

  async addMarkers(){
    let ubicacion = await Geolocation.getCurrentPosition();
    const markers: Marker[] = [
      {
        coordinate:{
          lat: ubicacion.coords.latitude,
          lng: ubicacion.coords.longitude,
        },
        title: 'mi ubicación',
        snippet: 'estas aqui',
      }
    ];
    await this.map.addMarkers(markers);

  }

  ngOnInit() {
    this.createMap();
  }

  async obtenerMiUbicacion()
  {

    let ubicacion = await Geolocation.getCurrentPosition();
    let ubicaciontexto = "Latitud"+ ubicacion.coords.latitude+"   "+"Longitud"+ubicacion.coords.longitude

    console.log(ubicacion)

    this.mostrarToast(ubicaciontexto)
    
    
    this.addMarkers();
  
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1000,
      position: 'bottom',
    });

    await toast.present();
  }
}
