$.noConflict();

jQuery(document).ready(function ($) {
  "use strict";

  [].slice
    .call(document.querySelectorAll("select.cs-select"))
    .forEach(function (el) {
      new SelectFx(el);
    });

  jQuery(".selectpicker").selectpicker;

  $(".search-trigger").on("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    $(".search-trigger").parent(".header-left").addClass("open");
  });

  $(".search-close").on("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    $(".search-trigger").parent(".header-left").removeClass("open");
  });

  $(".equal-height").matchHeight({
    property: "max-height",
  });

  // var chartsheight = $('.flotRealtime2').height();
  // $('.traffic-chart').css('height', chartsheight-122);

  // Counter Number
  $(".count").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text(),
        },
        {
          duration: 3000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now));
          },
        }
      );
  });

  // Menu Trigger
  $("#menuToggle").on("click", function (event) {
    var windowWidth = $(window).width();
    if (windowWidth < 1010) {
      $("body").removeClass("open");
      if (windowWidth < 760) {
        $("#left-panel").slideToggle();
      } else {
        $("#left-panel").toggleClass("open-menu");
      }
    } else {
      $("body").toggleClass("open");
      $("#left-panel").removeClass("open-menu");
    }
  });

  $(".menu-item-has-children.dropdown").each(function () {
    $(this).on("click", function () {
      var $temp_text = $(this).children(".dropdown-toggle").html();
      $(this)
        .children(".sub-menu")
        .prepend('<li class="subtitle">' + $temp_text + "</li>");
    });
  });

  // Load Resize
  $(window).on("load resize", function (event) {
    var windowWidth = $(window).width();
    if (windowWidth < 1010) {
      $("body").addClass("small-device");
    } else {
      $("body").removeClass("small-device");
    }
  });
});

function obtenerUnidadesMedida(idQuimico) {
  const unidadesMedida = {
    1: "μg/m3",
    2: "ppm",
    3: "ppm",
    4: "ppm",
    5: "ppm",
    6: "ppm",
    7: "°C",
    8: "%",
  };

  if (idQuimico in unidadesMedida) {
    return unidadesMedida[idQuimico];
  } else {
    return "Unidad de medida no encontrada para el idQuimico proporcionado.";
  }
}
function obtenerUnidadesMedidas(nombreQuimico) {
	const unidadesMedida = {
	  "Polvo": "μg/m3",
	  "Compuestos orgánicos volátiles (VOC)": "ppm",
	  "Dióxido de carbono (CO2)": "ppm",
	  "Dióxido de nitrógeno (NO2)": "ppm",
	  "Etanol (C2H5CH)": "ppm",
	  "Monóxido de carbono (CO)": "ppm",
	  "Temperatura": "°C",
	  "Humedad": "%"
	};
  
	if (nombreQuimico in unidadesMedida) {
	  return unidadesMedida[nombreQuimico];
	} else {
	  return "Unidad de medida no encontrada para el nombreQuimico proporcionado.";
	}
  }