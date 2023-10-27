import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // Pega o elemento com ID map do HTML
  @ViewChild('map') mapRef!: ElementRef;

  // Cria a variavel do Maps
  map!: google.maps.Map;

  constructor() {}

  async exibirMapa(){

    // The location of Uluru
    const position = { lat: -22.489201, lng: -48.546444 };

    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

    // The map, centered at Uluru
    this.map = new Map(
      this.mapRef.nativeElement,
      {
        zoom: 20,
        center: position,
        mapId: 'DEMO_MAP_ID',
      }
    );
    
    this.buscarPosicao();

  }

  ionViewWillEnter(){
    this.exibirMapa();
  }

  async buscarPosicao(){
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);

    const position = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    }
    this.map.setCenter(position);
    this.map.setZoom(18);

    this.adicionarMarcador(coordinates);
  }

  async adicionarMarcador(localizacao: Position){
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

     //The marker, positioned at Uluru
    const marker = new AdvancedMarkerElement({
    map: this.map,
    position: {
      lat: localizacao.coords.latitude,
      lng: localizacao.coords.longitude
    },
    title: 'Uluru',
    });
  }

}
