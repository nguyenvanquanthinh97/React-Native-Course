const GOOGLE_API_KEY = process.env["GOOGLE_API_KEY"] || "";

// google map api
export const getMapPreview = (lat: number, lng: number) => {
  const iamgePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C&key=${GOOGLE_API_KEY}`;
  return iamgePreviewUrl;
};

// google map geocode
export const getAddress = async (lat: number, lng: number) => {
  const googleUri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(googleUri);

  if (!response.ok) {
    throw new Error("Failed to fetch address!");
  }

  const data = await response.json();

  // in case don't have google api key
  let address = "Apple Address[Default]";
  if (data.results[0]) {
    address = data.results[0].formatted_address;
  }
  return address as string;
};
