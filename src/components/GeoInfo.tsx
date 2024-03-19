import * as React from 'react';
import axios from 'axios';

export function IPv4() {
  const [ip, setIp] = React.useState(null);
  React.useEffect(() => {
    axios.get('https://geolocation-db.com/json/').then((response) => {
      setIp(response.data['IPv4']);
      console.log(ip);
    });
  }, []);
  return <>{ip}</>;
}

export function Location() {
  const [location, setLocation] = React.useState(null);
  React.useEffect(() => {
    axios.get('https://geolocation-db.com/json/').then((response) => {
      setLocation(response.data['country_name']);
      console.log(location);
    });
  }, []);
  return <>{location}</>;
}