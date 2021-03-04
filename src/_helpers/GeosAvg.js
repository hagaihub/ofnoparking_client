 
 export default function averageGeolocation(coords) {
    if (coords.length === 1) {
      return coords[0];
    }
  
    let x = 0.0;
    let y = 0.0;
    let z = 0.0;
  
    for (let coord of coords) {
      let latitude = coord.latitude * Math.PI / 180;
      let longitude = coord.longitude * Math.PI / 180;
  
      x += Math.cos(latitude) * Math.cos(longitude);
      y += Math.cos(latitude) * Math.sin(longitude);
      z += Math.sin(latitude);
    }
  
    let total = coords.length;
  
    x = x / total;
    y = y / total;
    z = z / total;
  
    let centralLongitude = Math.atan2(y, x);
    let centralSquareRoot = Math.sqrt(x * x + y * y);
    let centralLatitude = Math.atan2(z, centralSquareRoot);
  
    return {
      latitude: centralLatitude * 180 / Math.PI,
      longitude: centralLongitude * 180 / Math.PI
    };
  }
  
//   // expect ~ 37.790831, -122.407169
//   const sf = [{
//     latitude: 37.797749,
//     longitude: -122.412147
//   }, {
//     latitude: 37.789068,
//     longitude: -122.390604
//   }, {
//     latitude: 37.785269,
//     longitude: -122.421975
//   }];
//   console.log(averageGeolocation(sf));