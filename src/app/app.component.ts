import {Component, ViewChild} from '@angular/core';
import {GoogleMap} from "@angular/google-maps";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // #1 On a besoin d'un centre et d'un niveau de zoom
  center: google.maps.LatLngLiteral = {lat: 42, lng: -4};
  zoom = 5;

  // #2 En plus du centre et du niveau de zoom,
  // Nous aurons besoins d'une liste de positions latitude longitude
  markerPositions: google.maps.LatLngLiteral[] = [
    {lat: 42, lng: -4},
    {lat: 40, lng: -0},
    {lat: 38, lng: -8},
  ];

  polylineOptions = {
    path: this.markerPositions,
    strokeColor: '#32a1d0',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  };

  latitude: number = 0;
  longitude: number = 0;

  // #3 Le ViewChild permet d'avoir accès à l'élément GoogleMaps dans le template HTML
  @ViewChild('googlemaps') map!: GoogleMap;
  @ViewChild('maplines') maplines!: GoogleMap;

  // Après l'initialisation de la vue les ViewChild sont assignées
  ngAfterViewInit(){
    // On fait un objet pour maintenir les limites de nos coordonnées
    let bounds = new google.maps.LatLngBounds()
    for (let marker of this.markerPositions) {
      // On agrandi les limites avec nos coordonnées
      bounds.extend(marker);
    }
    // On ajuste la carte aux limites
    // Le center et le niveau de zoom sont assignés automatiquement
    this.map!.fitBounds(bounds);
  }

  getLatLngFromMap(event: google.maps.MapMouseEvent) {
    console.log(event);

    this.latitude = event.latLng!.lat();
    this.longitude = event.latLng!.lng();
  }
}
