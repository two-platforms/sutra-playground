import * as React from "react";
import axios from "axios";

export default function Ping()  {
    const [ping, setPing] = React.useState(null)  
  
    React.useEffect(() => {
      axios.get("https://orbyt-server-kovceexzdq-du.a.run.app/ping").then((response) => {
        setPing(response.data);
        console.log({ping});
      });
    }, []);
  
    if (!ping) return null;
  
    return (
      <>
        {ping['awsRegion']}
      </>
    );
  }