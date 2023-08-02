window.onload = init;

function init() {
  //RELATIVO AL MAPA:
  const map = new ol.Map({
    view: new ol.View({
      center: [-7868362.768732138, 2207184.802504758],
      zoom: 16,
      maxZoom: 17,
      minZoom: 16,
    }),
    target: "js-map",
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

  // VECTOR LAYER:
  const AreaGeoJson = new ol.layer.VectorImage({
    source: new ol.source.Vector({
      url: "./map.json",
      format: new ol.format.GeoJSON(),
    }),
    visible: true,
    title: "PUCMM",
    style: new ol.style.Style({
      fill: fillStyle,
      stroke: strokeStyle,
      image: circleStyle,
    }),
  });
  function compararFechas(fecha1, fecha2) {
    // Convertir las cadenas de fecha a objetos Date
    const fecha1Obj = new Date(fecha1);
    const fecha2Obj = new Date(fecha2);
    // console.log(fecha1Obj);
    // console.log(fecha2Obj);

    // Calcular la diferencia en milisegundos
    const diferenciaMilisegundos = Math.abs(fecha2Obj - fecha1Obj);

    // Convertir la diferencia a minutos
    const diferenciaMinutos = diferenciaMilisegundos / (1000 * 60);
    // console.log(diferenciaMinutos);

    // Comparar si la diferencia es mayor a 10 minutos
    if (diferenciaMinutos > 10) {
      return "Inactivo";
    } else {
      return "Activo";
    }
  }

  function convertToISO8601(dateString) {
    const months = {
      enero: "01",
      febrero: "02",
      marzo: "03",
      abril: "04",
      mayo: "05",
      junio: "06",
      julio: "07",
      agosto: "08",
      septiembre: "09",
      octubre: "10",
      noviembre: "11",
      diciembre: "12",
    };

    const dateParts = dateString.split(" ")[0].split("/");
    const timeParts = dateString.split(" - ")[1].split(":");
    const month = months[dateParts[1].toLowerCase()];

    const iso8601Date = `${dateParts[2]}-${month}-${dateParts[0]}T${timeParts[0]}:${timeParts[1]}:${timeParts[2]}`;
    return iso8601Date;
  }

  //PUNTOS DEL MAPA : Estaciones
  function puntosMap(Estaciones) {
    const AreaGeoJson2 = new ol.layer.Vector({
      source: new ol.source.Vector({
        url: "data:," + encodeURIComponent(JSON.stringify(Estaciones)),
        format: new ol.format.GeoJSON(),
      }),
      visible: true,
      title: "PUCMM2",
      // style: new ol.style.Style({
      //   fill: fillStyle,
      //   stroke: strokeStyle,
      //   image: circleStyle,
      // }),
      style: function (feature) {
        // console.log(feature.values_.ultimaMedicion);
        const lastMeasurementDate = convertToISO8601(
          feature.values_.ultimaMedicion
        );
        const currentDate = new Date();
        fillStyleColor = [];

        if (feature.values_.idEstacion == 11) {
          if (compararFechas(lastMeasurementDate, currentDate) == "Inactivo") {
            fillStyleColor = [212,229,56, 1];
          } else {
            fillStyleColor = [0, 255, 0, 1];
          }
        } else {
          fillStyleColor = [0, 255, 0, 1];
        }

        const circleStyle2 = new ol.style.Circle({
          fill: new ol.style.Fill({
            color: fillStyleColor,
          }),
          radius: 7,
          stroke: strokeStyle,
        });

        return new ol.style.Style({
          fill: fillStyleColor,
          stroke: strokeStyle,
          image: circleStyle2,
        });
      },
    });
    map.addLayer(AreaGeoJson2);
  }

  map.addLayer(AreaGeoJson);

  //Para cuando damos click:
  const overlayFeatureName = document.getElementById("feature-name");
  map.on("click", function (e) {
    map.forEachFeatureAtPixel(
      e.pixel,
      function (feature, layer) {
        const InfoProyecto = document.querySelector(".sidebar_info");
        InfoProyecto.style.display = "none";
        const DetalleModulo = document.querySelector(".sidebar");
        DetalleModulo.style.display = "block";
        let IdEstacion = feature.get("idEstacion");
        ObtenerInfo("Detalle_Medicion/LastMedicionEstacion/" + IdEstacion).then(
          (response) => {
            const card = document.querySelector(".DetalleMedicion");
            card.style.display = "block";
            card.innerHTML = "";
            // console.log(response);
            aux = response.map((resp) => {
              card.innerHTML +=
                "<b>" +
                resp.nombreQuimico +
                "</b>: " +
                resp.valor +
                "<br>" +
                "<b style='color:#" +
                EstadoQuimicos(resp.idQuimico, resp.valor)[1] +
                ";'>" +
                EstadoQuimicos(resp.idQuimico, resp.valor)[0] +
                "</b>" +
                "<br>";
            });
          }
        );
      },
      {
        layerFilter: function (layerCandidate) {
          return layerCandidate.get("title") === "PUCMM2";
        },
      }
    );
  });

  //Para cuando damos el Hover:
  const overLayContainerElement = document.querySelector(".overlay-container");
  const overlayLayer = new ol.Overlay({
    element: overLayContainerElement,
  });
  map.addOverlay(overlayLayer);

  map.on("pointermove", function (e) {
    overlayLayer.setPosition(undefined);
    map.forEachFeatureAtPixel(
      e.pixel,
      function (feature, layer) {
        // console.log(feature);
        let clickedCoordinate = e.coordinate;
        let IdEstacion = feature.get("idEstacion");
        let nombreEstacion = feature.get("nombreEstacion");
        let tipoEstacion = feature.get("tipoEstacion");
        let ultimaMedicion = feature.get("ultimaMedicion");
        // console.log(feature);
        overlayLayer.setPosition(clickedCoordinate);
        overlayFeatureName.innerHTML =
          "<b>Estación:</b><br>" +
          nombreEstacion +
          "<br><br>" +
          "<b>Tipo Estación:</b> " +
          tipoEstacion +
          "<br><br><b>Última medición:</b><br>" +
          ultimaMedicion;
      },
      {
        layerFilter: function (layerCandidate) {
          return layerCandidate.get("title") === "PUCMM2";
        },
      }
    );
  });

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

  ObtenerInfo("Estacion")
    .then((response) => (Estacion = response))
    .then((response) => setDataEstaciones(response));

  //Para establecer los puntos de las estaciones:
  function setDataEstaciones(Estaciones) {
    estacions = getEstaciones(Estaciones);
    const Estacioness = {
      type: "FeatureCollection",
      features: estacions,
    };
    // console.log(Estacioness);
    puntosMap(Estacioness);
  }

  //Obtener las informaciones de las estaciones:
  function getEstaciones(Estaciones) {
    let data = [];
    let i = 0;
    Estaciones.map(function () {
      data[i] = dataa(Estaciones[i]);
      i++;
    });
    return data;
  }

  //Toda la informacion:
  function dataa(Estacion) {
    const info = {
      type: "Feature",
      properties: {
        idEstacion: Estacion.idEstacion,
        nombreEstacion: Estacion.nombreEstacion,
        tipoEstacion: Estacion.tipoEstacion,
        descripcionEstacion: Estacion.descripcionEstacion,
        estado: Estacion.estado,
        ultimaMedicion: Estacion.ultimaMedicion,
      },
      geometry: {
        coordinates: [Estacion.longitud, Estacion.latitud],
        type: "Point",
      },
    };
    // console.log(info);
    return info;
  }

  //Funcion para saber el estado de un quimico:
  function EstadoQuimicos(IdQuimico, Valor) {
    let Estado = "";
    color = "";
    // console.log(Valor);
    switch (IdQuimico) {
      //POLVO:
      case 1:
        if (Valor > 0 && Valor <= 300) {
          Estado = "Excelente";
          color = "09C089";
        } else if (Valor > 300 && Valor <= 1050) {
          Estado = "Bueno";
          color = "09C089";
        } else if (Valor > 1050 && Valor <= 3000) {
          Estado = "Malo";
          color = "CDD400";
        } else {
          Estado = "Peligroso";
          color = "FF4646";
        }
        break;

      //CO, NO2, VOC, C2H5CH:
      case 2:
      case 3:
      case 4:
      case 5:
        if (Valor <= 900) {
          Estado = "Bien";
          color = "09C089";
        } else {
          Estado = "Mal";
          color = "CDD400";
        }
        break;

      //CO2:
      case 6:
        if (Valor > 0 && Valor <= 1000) {
          Estado = "Excelente";
          color = "09C089";
        } else if (Valor > 1000 && Valor <= 2000) {
          Estado = "Regular";
          color = "CDD400";
        } else {
          Estado = "Malo";
          color = "FF4646";
        }
        break;

      //TEMP:
      case 7:
        if (Valor <= 16) {
          Estado = "Frio";
          color = "09C089";
        } else if (Valor > 16 && Valor <= 30) {
          Estado = "Bien";
          color = "09C089";
        } else {
          Estado = "Caliente";
          color = "CDD400";
        }
        break;

      //HUMEDAD:
      case 8:
        if (Valor <= 65) {
          Estado = "Bien";
          color = "09C089";
        } else {
          Estado = "Mal";
          color = "CDD400";
        }
        break;
    }
    return [Estado, color];
  }
}
