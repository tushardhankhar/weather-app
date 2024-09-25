import { createContext, useState, useEffect, useContext } from "react";

const LocationContext = createContext();

export const useLocation = () => {
  return useContext(LocationContext);
};

export const LocationProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [location, setLocation] = useState({
    latitude: 28.7041, // Default latitude (Delhi)
    longitude: 77.1025, // Default longitude (Delhi)
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              setError("Permission denied. Please enable location access.");
              break;
            case err.POSITION_UNAVAILABLE:
              setError("Location information is unavailable.");
              break;
            case err.TIMEOUT:
              setError("The request to get user location timed out.");
              break;
            default:
              setError("An unknown error occurred.");
              break;
          }
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <LocationContext.Provider value={{ location, error, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
