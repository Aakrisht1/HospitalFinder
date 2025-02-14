import axios from "axios";

export const fetchNearbyPlaces = async (lat, lng, amenity = "hospital") => {
  const radius = 2000;

  const overpassQuery = `
    [out:json];
    node(around:${radius},${lat},${lng})["amenity"="${amenity}"];
    out;
  `;

  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;

  try {
    const response = await axios.get(url);
    return response.data.elements.map((place) => ({
      id: place.id,
      name: place.tags.name || "Unnamed",
      lat: place.lat,
      lng: place.lon,
      address: place.tags["addr:full"] || place.tags["addr:street"] || "No address available",
      phone: place.tags["contact:phone"] || place.tags.phone || place.tags["contact:mobile"] || place.tags["contact:fax"] || "No contact info",
    }));
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
};
