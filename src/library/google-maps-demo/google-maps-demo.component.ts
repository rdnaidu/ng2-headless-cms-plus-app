import {Component} from '@angular/core';
import { MapsAPILoader, 
		 NoOpMapsAPILoader,
		 MouseEvent,
		 ANGULAR2_GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';
		 
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}

@Component({
	selector: 'google-maps-demo',
	directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES], // this loads all angular2-google-maps directives in this component
	// the following line sets the height of the map - Important: if you don't set a height, you won't see a map!!
	styles: [require('assets/css/angular2-google-maps.css')],
	template: require('./google-maps-demo.component.html')
})
export class GoogleMapsDemoComponent {
	lat: number = 51.678418;
	lng: number = 7.809007;
	zoom: number = 8;
	
	clickedMarker(label: string, index: number) {
		window.alert(`clicked the marker: ${label || index}`)
		this.markers.splice(index, 1);
	}


	markerDragEnd(m: marker, $event: MouseEvent) {
		console.log('dragEnd', m, $event);
	}
	
	markers: marker[] = [
		{
			lat: 51.673858,
			lng: 7.815982,
			label: 'A',
			draggable: true
		},
		{
			lat: 51.373858,
			lng: 7.215982,
			label: 'B',
			draggable: false
		},
		{
			lat: 51.723858,
			lng: 7.895982,
			label: 'C',
			draggable: true
		}
	]
	
	mapClicked($event: MouseEvent) {
		this.markers.push({
			lat: $event.coords.lat,
			lng: $event.coords.lng,
			draggable: false
		});
	}

}