'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then((mod) => mod.Polyline), { ssr: false });

let L;

const MapComponent = ({ location, places = [] }) => {
  const [mounted, setMounted] = useState(false);
  const [route, setRoute] = useState([]);
  const mapRef = useRef(null);
  const popupRefs = useRef({});

  useEffect(() => {
    setMounted(true);
    import("leaflet").then((leaflet) => {
      L = leaflet.default;
    });
  }, []);

  if (!mounted || !location || !L) return null;

  const userIcon = new L.Icon({
    iconUrl: "/leaflet/marker-user.png",
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -30],
  });

  const hospitalIcon = new L.Icon({
    iconUrl: "/leaflet/marker-hospital.png",
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -30],
  });

  const getDirections = async (hospital, index) => {
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${location.lng},${location.lat};${hospital.lng},${hospital.lat}?overview=full&geometries=geojson`
      );
      const data = await response.json();

      if (data.routes.length > 0) {
        const coordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
        setRoute(coordinates);
      } else {
        console.error("No route found");
      }

      if (popupRefs.current[index]) {
        popupRefs.current[index].closePopup();
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  return (
    <div className="relative w-full h-[500px]">
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(map) => {
          mapRef.current = map;
          map.on("click", () => {
            Object.values(popupRefs.current).forEach(popup => popup.closePopup());
          });
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={[location.lat, location.lng]} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>

        {places.map((place, index) => (
          <Marker
            key={index}
            position={[place.lat, place.lng]}
            icon={hospitalIcon}
            eventHandlers={{
              add: (e) => { popupRefs.current[index] = e.target; },
            }}
          >
            <Popup>
              <div>
                <strong>{place.name}</strong>
                <p>{place.address}</p>
                <p>{place.phone}</p>
                <button 
                  onClick={() => getDirections(place, index)} 
                  className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
                >
                  Get Directions
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {route.length > 0 && <Polyline positions={route} color="blue" />}
      </MapContainer>
      <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">&copy; 2025 HospitalFinder. All rights reserved.</p>
            <div className="mt-4">
              <Link href="#" className="text-sm hover:underline mr-4">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm hover:underline mr-4">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm hover:underline">
                Contact Us
              </Link>
            </div>
          </div>
        </footer>
    </div>
  );
};

export default MapComponent;