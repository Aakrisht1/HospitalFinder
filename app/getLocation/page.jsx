'use client';
import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import MapComponent from '../components/MapComponent';
import { getUserLocation } from '../utils/getLocation';
import { fetchNearbyPlaces } from '../utils/fetchPlaces';
import styles from './GetLocation.module.css';
import Link from 'next/link';

const getLocation = () => {
  const { user } = UserAuth();
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 400));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  const fetchLocation = async () => {
    try {
      console.log("Fetching user location...");
      const userLocation = await getUserLocation();
      console.log("User location:", userLocation);
      setLocation(userLocation);

      console.log("Fetching nearby hospitals...");
      const hospitals = await fetchNearbyPlaces(userLocation.lat, userLocation.lng, "hospital");
      console.log("Fetched hospitals:", hospitals);
      setPlaces(hospitals);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : user ? (
        <div>
          <div className='w-full text-center py-2 bg-gradient-to-r from-black to-white'>
            <h1 className='text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl text-white mb-4'>Click the button for getting hospitals near you.</h1>
            <button
              onClick={fetchLocation}
              className="inline-flex items-center px-6 py-2 my-[14px] bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition-colors"
            >
              Find Nearby Hospitals
            </button>
          </div>
          {location && <MapComponent location={location} places={places} />}
        </div>
      ) : (
        <div className={styles.bodyContainer}>
  <div className={styles.mainMessage}>
  <div className={styles.message}>You are not Logged in.
  </div>
  <div className={styles.message2}>Please Sign in to get started.</div>
  </div>
  <div className={styles.container}>
    <div className={styles.neon}>403</div>
    <div className={styles.doorFrame}>
      <div className={styles.door}>
        <div className={styles.rectangle}>
      </div>
        <div className={styles.handle}>
          </div>
        <div className={styles.window}>
          <div className={styles.eye}>
          </div>
          <div className={styles.eye2}>
          </div>
          <div className={styles.leaf}>
          </div> 
        </div>
      </div>  
    </div>
  </div>
</div>
      )}
    </div>
  );
};

export default getLocation;
