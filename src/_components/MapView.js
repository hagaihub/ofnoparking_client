import React, { useEffect, useState, useRef } from "react";

import Feature from "ol/Feature.js";
import OlMap from "ol/Map";
import OlView from "ol/View";
import Point from "ol/geom/Point.js";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import { Fill, RegularShape, Style } from "ol/style.js";
import OlSourceOSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile.js";
//import { toLonLat } from "ol/proj";
//import { toStringHDMS } from "ol/coordinate";
import Overlay from "ol/Overlay";

import "ol/ol.css";

import GeosAvg from "../_helpers/GeosAvg";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DirectionsIcon from "@material-ui/icons/Directions";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

function MapView(props) {
  const mapContainer = useRef(null);
  const overlay_el = useRef(null);
  const [popuptext, setPopuptext] = useState("");
  const [popupinfo, setPopupinfo] = useState("");

  const oRad = props.rad;
  const oData = props.data;
  const oUserCurrentLat = props.UserCurrentLat;
  const oUserCurrentLon = props.UserCurrentLon;
  const map = useRef(null);

  useEffect(() => {
    function InitMap() {
      // let oRad = latestProps.current.rad;
      // let oData = latestProps.current.data;
      // let UserCurrentLat = latestProps.current.UserCurrentLat;
      // let UserCurrentLon = latestProps.current.UserCurrentLon;

      // let ZoomCalc = 16;
      // if (oRad <= 200) {
      //   ZoomCalc = 18;
      // } else if (oRad > 200 && oRad <= 500) {
      //   ZoomCalc = 16;
      // } else if (oRad > 500) {
      //   ZoomCalc = 14;
      // }

      var fill = new Fill({ color: "blue" });

      var pointStyle = new Style({
        image: new RegularShape({
          fill: fill,
          //stroke: new Stroke({color: 'black', width: 1}),
          points: 20,
          radius: 10,
          //radius2: 4,
          //angle: 6
        }),
      });

      var UserRedfill = new Fill({ color: "red" });

      var UserpointStyle = new Style({
        image: new RegularShape({
          fill: UserRedfill,
          points: 10,
          radius: 10,
        }),
      });

      var arr_Parkings = [];
      var arr_Parkings_points = [];

      for (var i = 0; i < oData.length; i++) {
        var p1 = new Feature({
          geometry: new Point([oData[i].lon, oData[i].lat]),
          name: oData[i],
        });

        p1.setStyle(pointStyle);

        arr_Parkings.push(p1);

        let temp_Point = {
          latitude: oData[i].lat,
          longitude: oData[i].lon,
        };
        arr_Parkings_points.push(temp_Point);
      }

      if (oUserCurrentLon != null && oUserCurrentLat != null) {
        //adder Point
        var Userp1 = new Feature({
          geometry: new Point([oUserCurrentLon, oUserCurrentLat]),
        });
        Userp1.setStyle(UserpointStyle);
        arr_Parkings.push(Userp1);
      }

      //calc points avg
      let oGeosAvg = GeosAvg(arr_Parkings_points);

      var vectorSource = new VectorSource({
        features: arr_Parkings,
      });

      var vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      const overlay = new Overlay({
        element: overlay_el.current,
        positioning: "center-center",
        stopEvent: false,
      });

      map.current = new OlMap({
        target: mapContainer.current,
        layers: [
          new TileLayer({
            source: new OlSourceOSM(),
          }),
          vectorLayer,
        ],
        //overlays: [overlay],
        view: new OlView({
          projection: "EPSG:4326",
          center: [oGeosAvg.longitude, oGeosAvg.latitude], //[34.77392, 32.05202],
          //zoom: ZoomCalc,
        }),
      });

      map.current.on("click", function (event) {
        map.current.forEachFeatureAtPixel(
          event.pixel,
          function (feature, layer) {
            //console.log(feature.values_.geometry.flatCoordinates[1]); //console.log(layer);
            if (feature.values_.name) {
              overlay.setPosition(event.coordinate);

              setPopuptext(
                `https://www.waze.com/livemap/directions?navigate=yes&latlng=${feature.values_.geometry.flatCoordinates[1]},${feature.values_.geometry.flatCoordinates[0]}`
              );
              setPopupinfo(feature.values_.name.ktovet);

              map.current.addOverlay(overlay);
            }
          }
        );
      });

      map.current.getView().fit(vectorSource.getExtent(),{ padding: [40, 40, 40, 40], constrainResolution: false });

      //console.log(olmapo.getView().getCenter());
      //olmapo.getView().getZoom();
      //olmapo.getView().setCenter([32.05202, 34.77392]);
      //olmapo.getView().setZoom(10);
      //olmapo.setTarget("map");
    }

    InitMap();

    return function cleanup() {
      map.current.dispose();
    };
  }, [oData, oRad, oUserCurrentLat, oUserCurrentLon]);

  const closepopup = () => {
    map.current
      .getOverlays()
      .getArray()
      .slice(0)
      .forEach(function (overlay) {
        map.current.removeOverlay(overlay);
      });
  };

  return (
    <Box>
      <div ref={mapContainer} style={{ width: "100%", height: "360px" }}></div>

      <Box ref={overlay_el} mt={2}>
        <Paper>
          <Box p={1}>
            <IconButton
              aria-label="close"
              onClick={closepopup}
              variant="contained"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box p={2}>
            <Typography variant="h6" gutterBottom align="center">
              {popupinfo}
            </Typography>
          </Box>
          <Box p={2} display="flex" justifyContent="center">
            <Button
              variant="contained"
              startIcon={<DirectionsIcon />}
              href={popuptext}
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
            >
              Directions
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
export default MapView;
