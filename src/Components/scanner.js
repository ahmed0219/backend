
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import "../index.css"

function Scanner() {

const  [scanResult , setScannerResult] = useState (null)
const [location, setLocation] = useState(null);

useEffect (() => {

  const scanner =new Html5QrcodeScanner("reader",{
    qrbox :{
      width: 250,
      height: 250 ,
    },
    fps: 5 ,
  }) ;
  
  scanner.render(success,error) ;
  
  function success (result){
    scanner.clear() ;
    setScannerResult(result) ;
  }
  
  function error (err){
    console.warn (err)
  }


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => {
        console.warn(error);
      }
    );
  } else {
    console.warn("Geolocation Disabled");
  }

},[]) ;

// navigator.geolocation.getCurrentPosition((position) => {
//   const { latitude, longitude } = position.coords;
//   console.log("Latitude:", latitude , "Longitude:", longitude);
// });

  return (
    <div>
        {scanResult
          ? <div> Ur Destination : <a href={scanResult}>{scanResult}</a></div>
          :
          <div id="reader"></div>
        }
        {location && (
          <p>
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </p>  )}
    </div>
    
  );
}

export default Scanner;
