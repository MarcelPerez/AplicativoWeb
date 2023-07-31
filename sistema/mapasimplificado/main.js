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
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
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

  //PUNTOS DEL MAPA
  function puntosMap(Estaciones) {
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
  map.addLayer(AreaGeoJson);

  //PARA EFECTO HOVER:
  const overLayContainerElement = document.querySelector(".overlay-container");
  const overlayLayer = new ol.Overlay({
    element: overLayContainerElement,
  });
  map.addOverlay(overlayLayer);

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
                resp.valor.toFixed(2) +
                " " +
                obtenerUnidadesMedidas(resp.nombreQuimico) +
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
          "<br><br><b>última medición:</b><br>" +
          ultimaMedicion;
      },
      {
        layerFilter: function (layerCandidate) {
          return layerCandidate.get("title") === "PUCMM2";
        },
      }
    );
  });

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

  // ObtenerInfo("Quimico").then((response) => (Quimico = response));
  // // .then(() => console.log(Quimico));

  // ObtenerInfo("Medicion").then((response) => (Estacion = response));
  // // .then(() => console.log(Estacion));

  function setDataEstaciones(Estaciones) {
    // console.log(Estaciones);
    estacions = getEstaciones(Estaciones);
    const Estacioness = {
      type: "FeatureCollection",
      features: estacions,
    };
    // console.log(Estacioness);
    puntosMap(Estacioness);
  }

  function getEstaciones(Estaciones) {
    let data = [];
    let i = 0;
    Estaciones.map(function () {
      data[i] = dataa(Estaciones[i]);
      i++;
    });
    // console.log(data);
    return data;
  }

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

  function EstadoQuimicos(IdQuimico, Valor) {
    let Estado = "";
    color = "";
    // console.log(Valor);
    switch (IdQuimico) {
      //POLVO:
      case 1:
        if (Valor > 0 && Valor <= 1050) {
          Estado = "Excelente";
          color = "09C089";
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
      case 6:
        if (Valor <= 1000) {
          Estado = "Bien";
          color = "09C089";
        } else {
          Estado = "Mal";
          color = "CDD400";
        }
        break;

      //TEMP:
      case 7:
        if (Valor <= 16) {
          Estado = "Frio";
          color = "09C089";
        } else if (Valor > 16 && Valor <= 32) {
          Estado = "Bien";
          color = "09C089";
        } else {
          Estado = "Caliente";
          color = "CDD400";
        }
        break;

      //HUMEDAD:
      case 8:
        if (Valor <= 30) {
          Estado = "Mal";
          color = "CDD400";
        } else if (Valor > 30 && Valor <= 80) {
          Estado = "Bien";
          color = "09C089";
        } else {
          Estado = "Mal";
          color = "FF4646";
        }
        break;
    }
    return [Estado, color];
  }
}
