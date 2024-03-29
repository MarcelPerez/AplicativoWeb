//VARIABLES IMPORTANTES:
var Estaciones = [];
var EstacionesMediciones = [];
var power = 2; // Puede ajustarse para variar la ponderación de la distancia

// Coordenadas delimitadoras del área
lonmin = -70.6828;
latmin = 19.445;
lonmax = -70.6841;
latmax = 19.4437;
var centerLon = (lonmin + lonmax) / 2;
var centerLat = (latmin + latmax) / 2;

//Limites del mapa:
var extent = ol.proj.transformExtent(
  [lonmin, latmin, lonmax, latmax],
  "EPSG:4326",
  "EPSG:3857"
);

//Lugares para interpolacion:
var informacionInterpolacion = [
  { nombre: "Estadio Futbol", longitud: -70.6794, latitud: 19.4414 },
  { nombre: "Cancha Tennis", longitud: -70.6789, latitud: 19.443 },
  { nombre: "Salon Multiusos", longitud: -70.6799, latitud: 19.4451 },
  { nombre: "Puerta 1", longitud: -70.684, latitud: 19.4486 },
  { nombre: "Postgrado", longitud: -70.6854, latitud: 19.4473 },
  { nombre: "Profesores 2", longitud: -70.686, latitud: 19.446 },
  { nombre: "Arquitectura", longitud: -70.6867, latitud: 19.4445 },
  { nombre: "Puerta 2", longitud: -70.6867, latitud: 19.4425 },
  { nombre: "Puerta 2 - 1", longitud: -70.6863, latitud: 19.4411 },
  { nombre: "Puerta 2 - 2", longitud: -70.6864, latitud: 19.4404 },
];

// Creacion del mapa:
var map = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([centerLon, centerLat]),
    zoom: 16,
    maxZoom: 17,
    minZoom: 16,
  }),
});

//FUNCIONES:
//Funcion que obtiene la informacion de la BD por medio de la API:
const ObtenerInfo = async (opcion) => {
  const urlAPI = "http://154.38.167.248:5024/api/";
  const consulta = `${urlAPI}${opcion}`;
  try {
    const response = await fetch(consulta, { cache: "no-cache" });
    if (response.ok) {
      jsonResponse = await response.json();
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
};

// Función para calcular el peso del punto basado en temperatura y humedad
function calculateWeight(option, quimico) {
  var weight = 0;
  if (option === "temperatura") {
    if (quimico < 16) {
      weight = 0.30; // Azul
    } else if (quimico >= 20 && quimico <= 32) {
      weight = 0.15; // Verde
    } else {
      weight = 0.30; // Naranja
    }
  }

  if (option === "humedad") {
    if (quimico < 30) {
      weight = 0.30; // Naranja
    } else if (quimico >= 30 && quimico <= 80) {
      weight = 0.15; // Verde
    } else {
      weight = 0.30; // Rojo
    }
  }

  if (option === "polvo") {
    if (quimico < 1050) {
      weight = 0.15;
    } else {
      weight = 0.35;
    }
  }

  if (option === "CO") {
    if (quimico < 1000) {
      weight = 0.25;
    } else {
      weight = 0.30;
    }
  }

  if (option === "VOC") {
    if (quimico < 1000) {
      weight = 0.10;
    } else {
      weight = 0.35;
    }
  }

  if (option === "CO2") {
    if (quimico < 1000) {
      weight = 0.2;
    } else {
      weight = 0.4;
    }
  }

  if (option === "NO2") {
    if (quimico < 1000) {
      weight = 0.22;
    } else {
      weight = 0.40;
    }
  }

  if (option === "C2H5CH") {
    if (quimico < 1000) {
      weight = 0.15;
    } else {
    weight = 0.33;
    }
  }

  return weight;
}

function idwInterpolation(points, lon, lat, power, option) {
  var numerator = 0;
  var denominator = 0;
  // console.log(points.length);
  for (var i = 0; i < points.length; i++) {
    var point = points[i];
    var distance = calculateDistance(lon, lat, point.lon, point.lat);

    if (option === "temperature") {
      // Evitar divisiones por cero
      if (distance === 0) {
        return point.temperature;
      }
      var weight = 1 / Math.pow(distance, power);
      numerator += weight * point.temperature;
      denominator += weight;
    }
    if (option === "humidity") {
      // Evitar divisiones por cero
      if (distance === 0) {
        return point.humidity;
      }
      var weight = 1 / Math.pow(distance, power);
      numerator += weight * point.humidity;
      denominator += weight;
    }

    if (option === "CO") {
      // Evitar divisiones por cero
      if (distance === 0) {
        return point.CO;
      }
      var weight = 1 / Math.pow(distance, power);
      numerator += weight * point.CO;
      denominator += weight;
    }

    if (option === "CO2") {
      // Evitar divisiones por cero
      if (distance === 0) {
        return point.CO2;
      }
      var weight = 1 / Math.pow(distance, power);
      numerator += weight * point.CO2;
      denominator += weight;
    }

    if (option === "NO2") {
      // Evitar divisiones por cero
      if (distance === 0) {
        return point.NO2;
      }
      var weight = 1 / Math.pow(distance, power);
      numerator += weight * point.NO2;
      denominator += weight;
    }

    if (option === "VOC") {
      // Evitar divisiones por cero
      if (distance === 0) {
        return point.VOC;
      }
      var weight = 1 / Math.pow(distance, power);
      numerator += weight * point.VOC;
      denominator += weight;
    }

    if (option === "C2H5CH") {
      // Evitar divisiones por cero
      if (distance === 0) {
        return point.C2H5CH;
      }
      var weight = 1 / Math.pow(distance, power);
      numerator += weight * point.C2H5CH;
      denominator += weight;
    }
    if (option === "polvo") {
      // Evitar divisiones por cero
      if (distance === 0) {
        return point.polvo;
      }
      var weight = 1 / Math.pow(distance, power);
      numerator += weight * point.polvo;
      denominator += weight;
    }
  }

  return numerator / denominator;
}

function calculateDistance(lon1, lat1, lon2, lat2) {
  var deg2rad = Math.PI / 180;
  var lonDelta = (lon2 - lon1) * deg2rad;
  var latDelta = (lat2 - lat1) * deg2rad;
  var a =
    Math.sin(latDelta / 2) * Math.sin(latDelta / 2) +
    Math.cos(lat1 * deg2rad) *
      Math.cos(lat2 * deg2rad) *
      Math.sin(lonDelta / 2) *
      Math.sin(lonDelta / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var earthRadius = 6371; // Radio de la Tierra en kilómetros
  return earthRadius * c;
}

//DESARROLLO DEL PROGRAMA:

//Obteniendo todas las estaciones desde la BD:
ObtenerInfo("Estacion").then((response) => setDataEstaciones(response));

//Para establecer los puntos de las estaciones:
function setDataEstaciones(estaciones) {
  Estaciones = estaciones;
  obtenerDetallesEstaciones();
}

function obtenerDetallesEstaciones() {
  Estaciones.forEach((estacion) => {
    // console.log(estacion);
    ObtenerInfo(
      "Detalle_Medicion/LastMedicionEstacion/" + estacion.idEstacion
    ).then((response) => {
      setDataEstacionesMedicion(response);
    });
  });
}

//Para establecer los quimicos de las estaciones:
function setDataEstacionesMedicion(mediciones) {
  EstacionesMediciones = mediciones;
  establecerDatosMapa(EstacionesMediciones);
}

var infoMedicionesEstaciones = [];
function establecerDatosMapa(EstacionesMediciones) {
  infoMedicionesEstaciones.push({
    nombre: EstacionesMediciones[0].nombreEstacion,
    lon: EstacionesMediciones[0].longitud,
    lat: EstacionesMediciones[0].latitud,
    polvo: EstacionesMediciones[0].valor,
    CO: EstacionesMediciones[1].valor,
    NO2: EstacionesMediciones[2].valor,
    VOC: EstacionesMediciones[3].valor,
    C2H5CH: EstacionesMediciones[4].valor,
    CO2: EstacionesMediciones[5].valor,
    temperature: EstacionesMediciones[6].valor,
    humidity: EstacionesMediciones[7].valor,
  });
  if (infoMedicionesEstaciones.length >= 9) {
    // console.log(infoMedicionesEstaciones);
    agregarEstacionesInterpolacion(infoMedicionesEstaciones);
  }
}

function agregarEstacionesInterpolacion(infoMedicionesEstaciones) {
  var dataInterpolada = [];

  informacionInterpolacion.forEach(({ nombre, longitud, latitud }) => {
    dataInterpolada.push({
      nombre: nombre,
      lon: longitud,
      lat: latitud,
      polvo: idwInterpolation(
        infoMedicionesEstaciones,
        longitud,
        latitud,
        power,
        "polvo"
      ),
      CO: idwInterpolation(
        infoMedicionesEstaciones,
        longitud,
        latitud,
        power,
        "CO"
      ),
      NO2: idwInterpolation(
        infoMedicionesEstaciones,
        longitud,
        latitud,
        power,
        "NO2"
      ),
      VOC: idwInterpolation(
        infoMedicionesEstaciones,
        longitud,
        latitud,
        power,
        "VOC"
      ),
      C2H5CH: idwInterpolation(
        infoMedicionesEstaciones,
        longitud,
        latitud,
        power,
        "C2H5CH"
      ),
      CO2: idwInterpolation(
        infoMedicionesEstaciones,
        longitud,
        latitud,
        power,
        "CO2"
      ),
      temperature: idwInterpolation(
        infoMedicionesEstaciones,
        longitud,
        latitud,
        power,
        "temperature"
      ),
      humidity: idwInterpolation(
        infoMedicionesEstaciones,
        longitud,
        latitud,
        power,
        "humidity"
      ),
    });
  });

  dataInterpolada.forEach(
    ({
      nombre,
      lon,
      lat,
      temperature,
      humidity,
      polvo,
      NO2,
      CO,
      CO2,
      C2H5CH,
      VOC,
    }) => {
      infoMedicionesEstaciones.push({
        nombre: nombre,
        lon: lon,
        lat: lat,
        polvo: polvo,
        CO: CO,
        CO2: CO2,
        C2H5CH: C2H5CH,
        NO2: NO2,
        VOC: VOC,
        temperature: temperature,
        humidity: humidity,
      });
    }
  );
  pintarHeatMap(infoMedicionesEstaciones);
  miCalidad(infoMedicionesEstaciones);
}

// Crear el heatmap layer
var heatmapLayerHumidity = new ol.layer.Heatmap({
  source: new ol.source.Vector(),
  blur: 50,
  radius: 90,
  gradient: ["green", "lime", "red"],
  opacity: 0.7,
});

// Crear el heatmap layer
var heatmapLayerTemperature = new ol.layer.Heatmap({
  source: new ol.source.Vector(),
  blur: 80,
  radius: 90,
  gradient: ["green", "lime", "#F7FF00"],
  opacity: 0,
});

//polvo:
var heatmapLayerPolvo = new ol.layer.Heatmap({
  source: new ol.source.Vector(),
  blur: 50,
  radius: 90,
  gradient: ["green", "lime", "red"],
  opacity: 0,
});

//CO:
var heatmapLayerCO = new ol.layer.Heatmap({
  source: new ol.source.Vector(),
  blur: 50,
  radius: 90,
  gradient: ["green", "lime", "red"],
  opacity: 0,
});

//CO2:
var heatmapLayerCO2 = new ol.layer.Heatmap({
  source: new ol.source.Vector(),
  blur: 50,
  radius: 90,
  gradient: ["green", "lime", "red"],
  opacity: 0,
});

//NO2:
var heatmapLayerNO2 = new ol.layer.Heatmap({
  source: new ol.source.Vector(),
  blur: 50,
  radius: 90,
  gradient: ["green", "lime", "red"],
  opacity: 0,
});

//VOC:
var heatmapLayerVOC = new ol.layer.Heatmap({
  source: new ol.source.Vector(),
  blur: 50,
  radius: 90,
  gradient: ["green", "lime", "red"],
  opacity: 0,
});

//C2H5CH:
var heatmapLayerC2H5CH = new ol.layer.Heatmap({
  source: new ol.source.Vector(),
  blur: 50,
  radius: 90,
  gradient: ["green", "lime", "red"],
  opacity: 0,
});

function pintarHeatMap(mediciones) {
  // Añadir el heatmap layer al mapa
  map.addLayer(heatmapLayerHumidity);
  map.addLayer(heatmapLayerTemperature);
  map.addLayer(heatmapLayerCO);
  map.addLayer(heatmapLayerCO2);
  map.addLayer(heatmapLayerNO2);
  map.addLayer(heatmapLayerPolvo);
  map.addLayer(heatmapLayerC2H5CH);
  map.addLayer(heatmapLayerVOC);

  // Procesar los datos y añadirlos al heatmap layer
  var vectorSource = heatmapLayerHumidity.getSource();
  mediciones.forEach(function (d) {
    var feature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([d.lon, d.lat])),
      weight: calculateWeight("humedad", d.humidity),
    });
    vectorSource.addFeature(feature);
  });

  var vectorSource = heatmapLayerTemperature.getSource();
  mediciones.forEach(function (d) {
    var feature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([d.lon, d.lat])),
      weight: calculateWeight("temperatura", d.temperature),
    });
    vectorSource.addFeature(feature);
  });

  var vectorSource = heatmapLayerCO.getSource();
  mediciones.forEach(function (d) {
    var feature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([d.lon, d.lat])),
      weight: calculateWeight("CO", d.CO),
    });
    vectorSource.addFeature(feature);
  });

  var vectorSource = heatmapLayerCO2.getSource();
  mediciones.forEach(function (d) {
    var feature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([d.lon, d.lat])),
      weight: calculateWeight("CO2", d.CO2),
    });
    vectorSource.addFeature(feature);
  });

  var vectorSource = heatmapLayerNO2.getSource();
  mediciones.forEach(function (d) {
    var feature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([d.lon, d.lat])),
      weight: calculateWeight("NO2", d.NO2),
    });
    vectorSource.addFeature(feature);
  });

  var vectorSource = heatmapLayerPolvo.getSource();
  mediciones.forEach(function (d) {
    var feature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([d.lon, d.lat])),
      weight: calculateWeight("polvo", d.polvo),
    });
    vectorSource.addFeature(feature);
  });

  var vectorSource = heatmapLayerC2H5CH.getSource();
  mediciones.forEach(function (d) {
    var feature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([d.lon, d.lat])),
      weight: calculateWeight("C2H5CH", d.C2H5CH),
    });
    vectorSource.addFeature(feature);
  });

  var vectorSource = heatmapLayerVOC.getSource();
  mediciones.forEach(function (d) {
    var feature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([d.lon, d.lat])),
      weight: calculateWeight("VOC", d.VOC),
    });
    vectorSource.addFeature(feature);
  });
}

function seleccionarOpcion() {
  var seleccion = document.getElementById("medicion").value;
  // console.log("Opción seleccionada: " + seleccion);
  if (seleccion === "humedad") {
    heatmapLayerHumidity.setOpacity(0.7);
    heatmapLayerTemperature.setOpacity(0);
    heatmapLayerCO.setOpacity(0);
    heatmapLayerCO2.setOpacity(0);
    heatmapLayerNO2.setOpacity(0);
    heatmapLayerPolvo.setOpacity(0);
    heatmapLayerC2H5CH.setOpacity(0);
    heatmapLayerVOC.setOpacity(0);
  } else if (seleccion === "temperatura") {
    heatmapLayerHumidity.setOpacity(0);
    heatmapLayerTemperature.setOpacity(0.7);
    heatmapLayerCO.setOpacity(0);
    heatmapLayerCO2.setOpacity(0);
    heatmapLayerNO2.setOpacity(0);
    heatmapLayerPolvo.setOpacity(0);
    heatmapLayerC2H5CH.setOpacity(0);
    heatmapLayerVOC.setOpacity(0);
  } else if (seleccion === "co") {
    heatmapLayerHumidity.setOpacity(0);
    heatmapLayerTemperature.setOpacity(0);
    heatmapLayerCO.setOpacity(0.7);
    heatmapLayerCO2.setOpacity(0);
    heatmapLayerNO2.setOpacity(0);
    heatmapLayerPolvo.setOpacity(0);
    heatmapLayerC2H5CH.setOpacity(0);
    heatmapLayerVOC.setOpacity(0);
  } else if (seleccion === "co2") {
    heatmapLayerHumidity.setOpacity(0);
    heatmapLayerTemperature.setOpacity(0);
    heatmapLayerCO.setOpacity(0);
    heatmapLayerCO2.setOpacity(0.7);
    heatmapLayerNO2.setOpacity(0);
    heatmapLayerPolvo.setOpacity(0);
    heatmapLayerC2H5CH.setOpacity(0);
    heatmapLayerVOC.setOpacity(0);
  } else if (seleccion === "no2") {
    heatmapLayerHumidity.setOpacity(0);
    heatmapLayerTemperature.setOpacity(0);
    heatmapLayerCO.setOpacity(0);
    heatmapLayerCO2.setOpacity(0);
    heatmapLayerNO2.setOpacity(0.7);
    heatmapLayerPolvo.setOpacity(0);
    heatmapLayerC2H5CH.setOpacity(0);
    heatmapLayerVOC.setOpacity(0);
  } else if (seleccion === "polvo") {
    heatmapLayerHumidity.setOpacity(0);
    heatmapLayerTemperature.setOpacity(0);
    heatmapLayerCO.setOpacity(0);
    heatmapLayerCO2.setOpacity(0);
    heatmapLayerNO2.setOpacity(0);
    heatmapLayerPolvo.setOpacity(0.7);
    heatmapLayerC2H5CH.setOpacity(0);
    heatmapLayerVOC.setOpacity(0);
  } else if (seleccion === "etanol") {
    heatmapLayerHumidity.setOpacity(0);
    heatmapLayerTemperature.setOpacity(0);
    heatmapLayerCO.setOpacity(0);
    heatmapLayerCO2.setOpacity(0);
    heatmapLayerNO2.setOpacity(0);
    heatmapLayerPolvo.setOpacity(0);
    heatmapLayerC2H5CH.setOpacity(0.7);
    heatmapLayerVOC.setOpacity(0);
  } else if (seleccion === "voc") {
    heatmapLayerHumidity.setOpacity(0);
    heatmapLayerTemperature.setOpacity(0);
    heatmapLayerCO.setOpacity(0);
    heatmapLayerCO2.setOpacity(0);
    heatmapLayerNO2.setOpacity(0);
    heatmapLayerPolvo.setOpacity(0);
    heatmapLayerC2H5CH.setOpacity(0);
    heatmapLayerVOC.setOpacity(0.7);
  }
}

function miCalidad(points) {
  document.getElementById("miEstadoAire").addEventListener("click", () => {
    // console.log("Sistema Aire");
    navigator.geolocation.getCurrentPosition(success, error);
    function success(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      // console.log("(" + latitude + "," + longitude + ")");
      // console.log("(19.443342, -70.6841900)");
      //BOCEL: 19.445835690281413, -70.63945911689339

      distancia = calculateDistance(
        longitude,
        latitude,
        -70.68419000787753,
        19.44334255050675
      );

      // console.log(distancia);

      if (distancia > 2) {
        alert("Se encuentra fuera del rango de medición del aire.");
      } else {
        polvo = idwInterpolation(points, longitude, latitude, power, "polvo");
        CO = idwInterpolation(points, longitude, latitude, power, "CO");
        CO2 = idwInterpolation(points, longitude, latitude, power, "CO2");
        NO2 = idwInterpolation(points, longitude, latitude, power, "NO2");
        VOC = idwInterpolation(points, longitude, latitude, power, "VOC");
        C2H5CH = idwInterpolation(points, longitude, latitude, power, "C2H5CH");
        TEMP = idwInterpolation(
          points,
          longitude,
          latitude,
          power,
          "temperature"
        );
        HUM = idwInterpolation(points, longitude, latitude, power, "humidity");
        // console.log(polvo, CO, CO2, NO2, VOC, C2H5CH, TEMP, HUM);
        document.getElementById("miEstadoDetalle").innerHTML =
          "<b>Polvo: </b>" +
          polvo.toFixed(2) +
          " μg/m3" +
          "<br/>" +
          "<b>Monóxido de carbono (CO): </b>" +
          CO.toFixed(2) +
          " ppm" +
          "<br/>" +
          "<b>Dióxido de nitrógeno (NO2): </b>" +
          NO2.toFixed(2) +
          " ppm" +
          "<br/>" +
          "<b>Dióxido de carbono (CO2): </b>" +
          CO2.toFixed(2) +
          " ppm" +
          "<br/>" +
          "<b>Compuestos orgánicos volátiles (VOC): </b>" +
          VOC.toFixed(2) +
          " ppm" +
          "<br/>" +
          "<b>C2H5CH: </b>" +
          C2H5CH.toFixed(2) +
          " ppm" +
          "<br/>" +
          "<b>Temperatura: </b>" +
          TEMP.toFixed(2) +
          " °C" +
          "<br/>" +
          "<b>Humedad: </b>" +
          HUM.toFixed(2) +
          "%" +
          "<br/>";
        // document.getElementById("miEstadoButton").style.display = "block";
        document.getElementById("miEstadoMap").style.display = "block";
        document.getElementById("miEstadoAire").style.display = "none";
        mapa(longitude, latitude);

        document
          .getElementById("miEstadoButton")
          .addEventListener("click", () => {
            document.getElementById("miEstadoDetalle").innerHTML = "";
            document.getElementById("miEstadoButton").style.display = "none";
            document.getElementById("miEstadoMap").style.display = "none";
          });
      }

      // console.log("Distance: " + distancia + " km");
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
  });
}

function convertToLonLat(x, y) {
  const lonLat = ol.proj.transform([x, y], "EPSG:3857", "EPSG:4326");
  return { lon: lonLat[0], lat: lonLat[1] };
}
function convertToXYZ(lon, lat) {
  const xyz = ol.proj.transform([lon, lat], "EPSG:4326", "EPSG:3857");
  return { x: xyz[0], y: xyz[1] };
}

function mapa(lon, lat) {
  x = convertToXYZ(lon, lat).x;
  y = convertToXYZ(lon, lat).y;

  const map = new ol.Map({
    view: new ol.View({
      center: [x, y],
      zoom: 16,
      // maxZoom: 17,
      // minZoom: 16,
    }),
    target: "miEstadoMap",
  });

  const satelital = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    }),
    visible: true,
    title: "Satelital",
  });

  const baseLayerGroup = new ol.layer.Group({
    layers: [satelital],
  });
  map.addLayer(baseLayerGroup);

  const fillStyle = new ol.style.Fill({
    color: [127, 119, 89, 0.35],
  });

  const strokeStyle = new ol.style.Stroke({
    color: [46, 45, 45, 1],
    width: 2,
  });

  const circleStyle = new ol.style.Circle({
    fill: new ol.style.Fill({
      color: [0, 245, 0, 1],
    }),
    radius: 7,
    stroke: strokeStyle,
  });

  const Estaciones = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [lon, lat], // Coordenadas del punto que quieres agregar
        },
        properties: {
          name: "Mi Punto",
        },
      },
    ],
  };
  const AreaGeoJson2 = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: "data:," + encodeURIComponent(JSON.stringify(Estaciones)),
      format: new ol.format.GeoJSON(),
    }),
    visible: true,
    title: "PUCMM2",
    style: new ol.style.Style({
      fill: fillStyle,
      stroke: strokeStyle,
      image: circleStyle,
    }),
  });
  map.addLayer(AreaGeoJson2);
}
