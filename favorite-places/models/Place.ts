export interface LocationInterface {
  lat: number;
  lng: number;
  address: string;
}

export class Place {
  title: string;
  imageUri: string;
  location: LocationInterface;
  id: string;

  constructor(title: string, imageUri: string, location: LocationInterface) {
    this.title = title;
    this.imageUri = imageUri;
    this.location = location;
    this.id = new Date().toString() + (Math.random() * 9999).toString();
  }
}
