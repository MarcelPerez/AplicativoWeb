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
      weight = 0.2; // Azul
    } else if (quimico >= 20 && quimico <= 30) {
      weight = 0.35; // Verde
    } else {
      weight = 0.8; // Naranja
    }
  }

  if (option === "humedad") {
    if (quimico < 30) {
      weight = 0.8; // Naranja
    } else if (quimico >= 30 && quimico <= 80) {
      weight = 0.25; // Verde
    } else {
      weight = 0.8; // Rojo
    }
  }

  if (option === "polvo") {
    if (quimico < 1050) {
      weight = 0.30;
     } else {
      weight = 0.7;
    }
  }

  if (option === "CO") {
    if (quimico < 1000) {
      weight = 0.2;
    } else {
      weight = 0.9;
    }
  }

  if (option === "VOC") {
    if (quimico <1000) {
      weight = 0.15;
    } else {
      weight = 0.9;
    }
  }

  if (option === "CO2") {
    if (quimico < 1000) {
      weight = 0.2;
    } else {
      weight = 0.9;
    }
  }

  if (option === "NO2") {
    if (quimico < 1000) {
      weight = 0.35;
    } else {
      weight = 0.9;
    }
  }

  if (option === "C2H5CH") {
    if (quimico < 1000) {
      weight = 0.25;
    } else {
      weight = 0.9;
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
    console.log(infoMedicionesEstaciones);
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
  console.log("Opción seleccionada: " + seleccion);
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
