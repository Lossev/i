/*
Theme Name: Murun - Responsive App Landing Page Template
Desciption: Murun is a responsive App landing template. It’s one page, clean and modern design. Murun is built with latest HTML5, CSS3 and Bootstrap 3+. The clean and unique design will amaze you. Whatever you are browsing from mobile tablet or desktop/laptop, the Murun will be fit all screen sizes. Murun has everything you need to launch your site!
Theme URI: http://www.codingle.com/murtaxa/themeforest/murun_demo
Author Name: Murtaxa
Author URI: http://www.codingle.com
Version: 1.0

Murun Scripts
*/
(function($) {
  "use strict";

  $(window).on("load", function() {
    $("body").addClass("loaded");
  });

  /*******************/
  /** Sticky Header **/
  /*******************/
  $(function() {
    var header = $("#header"),
      yOffset = 0,
      triggerPoint = 10;
    $(window).on("scroll", function() {
      yOffset = $(window).scrollTop();

      if (yOffset >= triggerPoint) {
        header.addClass("fixed-top");
      } else {
        header.removeClass("fixed-top");
      }
    });
  });

  /*****************/
  /** Typing text **/
  /*****************/

  $(".typing").typed({
    strings: [
      "present Your beautiful mobile app.",
      "Present a Responsive Design"
    ],
    typeSpeed: 100,
    backDelay: 2000,
    loop: true
  });
  /*************************/
  /** Screenshot carousel **/
  /*************************/

  function getSlide() {
    var wW = $(window).width();
    if (wW < 601) {
      return 1;
    }
    return 3;
  }

  var mySwiper = $(".screen-carousel").swiper({
    mode: "horizontal",
    loop: true,
    speed: 1000,
    autoplay: 1000,
    effect: "coverflow",
    slidesPerView: getSlide(),
    grabCursor: true,
    pagination: ".screen-pagination",
    paginationClickable: true,
    nextButton: ".arrow-right",
    prevButton: ".arrow-left",
    keyboardControl: true,
    coverflow: {
      rotate: 0,
      stretch: 90,
      depth: 200,
      modifier: 1,
      slideShadows: true
    }
  });

  /*************************************/
  /** Initialize smoothescroll plugin **/
  /*************************************/
  smoothScroll.init({
    offset: 60
  });
  /*******************/
  /** Swipbox Active **/
  /*******************/
  $(".lightbox").swipebox();

  /*******************/
  /** Wow Settings **/
  /*******************/
  var wow = new WOW({
    mobile: false,
    offset: 0
  });
  wow.init();

  /*******************/
  /** Subscribe Form **/
  /*******************/
  $(".subs-btn").on("click", function(event) {
    event.preventDefault();
    var name_attr = [];
    var values = [];
    var fs_process = "";
    if (
      $(this)
        .closest("section")
        .attr("id") !== undefined
    ) {
      var section_id = $(this)
        .closest("section")
        .attr("id");
    } else {
      var section_id = $(this)
        .closest("footer")
        .attr("id");
    }
    $("#" + section_id)
      .find("form")
      .find("button")
      .text("loading...");
    $("#" + section_id)
      .find("form input")
      .each(function(index) {
        if ($(this).is('[data-email="required"]')) {
          var required_val = $(this).val();
          if (required_val != "") {
            name_attr.push($(this).attr("name"));
            values.push($(this).val());
            fs_process = true;
          } else {
            $("#" + section_id)
              .find("form")
              .find("button")
              .text("Send");
            $(this).addClass("fs-input-error");
            fs_process = false;
          }
        }

        if (!$(this).is('[data-email="required"]')) {
          name_attr.push($(this).attr("name"));
          values.push($(this).val());
        }
      });

    if (fs_process) {
      localStorage.setItem("fs-section", section_id);
      $.post(
        "mail/process.php",
        {
          data: {
            input_name: name_attr,
            values: values,
            section_id: section_id
          },
          type: "POST"
        },
        function(data) {
          $("#loading").remove();
          var fs_form_output = "";
          if (data) {
            if (data.type == "fs-message") {
              $("#error-msg").remove();
              $("#success-msg").remove();
              var fs_form_output =
                '<div id="success-msg" class="padding-15 mt-15 bdrs-3" style="border: 1px solid green; color: green;">' +
                data.text +
                "</div>";
              $("#" + section_id)
                .find("form")
                .find("button")
                .text("Success");
            } else if (data.type == "fs_error") {
              $("#" + section_id)
                .find("form")
                .find("button")
                .text("Send");
              $("#success-msg").remove();
              $("#error-msg").remove();
              var fs_form_output =
                '<div id="error-msg" class="padding-15 mt-15 bdrs-3" style="border: 1px solid red; color: red;">' +
                data.text +
                "</div>";
            } else {
              var fs_form_output = "";
            }
          }

          if (fs_form_output != "") {
            var section_id = localStorage.getItem("fs-section");
            $("#" + section_id)
              .find("form")
              .after(fs_form_output);
          }
          $("#" + section_id)
            .find("form input")
            .each(function(index) {
              $(this).val("");
              $(this).removeClass("fs-input-error");
            });

          setTimeout(function() {
            $("#success-msg").fadeOut();
            $("#success-msg").remove();
            $("#error-msg").fadeOut();
            $("#error-msg").remove();
            $(this).submit();
            $("#" + section_id)
              .find("form")
              .find("button")
              .text("Send");
          }, 5000);
          localStorage.removeItem("fs_section");
        },
        "json"
      );
    }

    $("#" + section_id)
      .find("form input")
      .each(function(index) {
        $(this).keypress(function() {
          $(this).removeClass("fs_input_error");
        });
      });

    $("#" + section_id)
      .find("form input")
      .each(function(index) {
        if ($(this).is(":focus")) {
          $(this).removeClass("fs_input_error");
        }
      });
  });

  /*******************/
  /** Scroll To Top **/
  /*******************/

  $(window).on("scroll", function() {
    if ($(this).scrollTop() > 600) {
      $("#scroll-top").fadeIn();
    } else {
      $("#scroll-top").fadeOut();
    }
  });

  $(window).on("shown.bs.modal", function() {
    resetInputs();
    // Memory & colors variables
    var openedModal = $(".modal.fade.in");
    var memoryInput = openedModal.find(".memoryRadio");
    var colorInput = openedModal.find(".select-color > input");
    $(memoryInput).change(countPrice);
    $(colorInput).change(countPrice);
    // Price variables
    var totalPrice = openedModal.find(".total-price");

    countPrice();

    function resetInputs() {
      $(memoryInput).prop("checked", false);
      $(colorInput).prop("checked", false);
    }

    function countPrice() {
      if ($("#color-1").is(":checked")) {
        alert("it's checked");
      }
      console.log("checked");

      var totalPriceCounted;
      var memoryVal = $("input[name=memoryAmount]:checked", openedModal).data(
        "price"
      );
      var colorVal = $("input[name=color]:checked", openedModal).data("price");

      memoryVal = parseInt(memoryVal, 10);
      colorVal = parseInt(colorVal, 10);
      totalPriceCounted = memoryVal + colorVal;
      $(totalPrice).html(totalPriceCounted);
      $("input[name=hidden-totalPrice]").val(totalPriceCounted);
    }
  });

  // $("form").submit(function(e) {
  //   e.preventDefault();
  //   var name = $(this)
  //     .find("input[name=name]")
  //     .val();
  //   var phone = $(this)
  //     .find("input[name=phone]")
  //     .val();
  //   var iphone = $(this)
  //     .find("input[name=hidden-phoneName]")
  //     .val();
  //   var memory = $(this)
  //     .find("input[name=memoryAmount]:checked")
  //     .val();
  //   var color = $(this)
  //     .find("input[name=color]:checked")
  //     .val();
  //   var price = $(this)
  //     .find("input[name=hidden-totalPrice]")
  //     .val();
  //   var dataString =
  //     "name=" +
  //     name +
  //     "&phone=" +
  //     phone +
  //     "&iphone=" +
  //     iphone +
  //     "&memory=" +
  //     memory +
  //     "&color=" +
  //     color +
  //     "&price=" +
  //     price;
  //   console.log(dataString);

  //   $.ajax({
  //     type: "POST",
  //     url: "forms.php",
  //     data: dataString,
  //     success: function() {
  //       $(this).fadeOut(1000);
  //       $(this)
  //         .find(".success")
  //         .fadeIn(1000);
  //     }
  //   });
  //   return false;
  // });
})(jQuery),
  $(function() {
    $(window).scroll(function() {
      $(window).scrollTop() >= 20
        ? $(".top-menu").addClass("is-scrolling")
        : $(".top-menu").removeClass("is-scrolling");
    }),
      $(".hamburger").click(function() {
        $(".hamburger").toggleClass("is-active"),
          $(".mobile-menu-content").toggleClass("on");
      }),
      $("#order-1").magnificPopup({
        type: "inline",
        fixedContentPos: !1,
        fixedBgPos: !0,
        overflowY: "auto",
        closeBtnInside: !0,
        preloader: !1,
        midClick: !0,
        removalDelay: 300,
        mainClass: "my-mfp-slide-bottom"
      }),
      $("#order-2").magnificPopup({
        type: "inline",
        fixedContentPos: !1,
        fixedBgPos: !0,
        overflowY: "auto",
        closeBtnInside: !0,
        preloader: !1,
        midClick: !0,
        removalDelay: 300,
        mainClass: "my-mfp-slide-bottom"
      }),
      $("#order-3").magnificPopup({
        type: "inline",
        fixedContentPos: !1,
        fixedBgPos: !0,
        overflowY: "auto",
        closeBtnInside: !0,
        preloader: !1,
        midClick: !0,
        removalDelay: 300,
        mainClass: "my-mfp-slide-bottom"
      }),
      $("#order-4").magnificPopup({
        type: "inline",
        fixedContentPos: !1,
        fixedBgPos: !0,
        overflowY: "auto",
        closeBtnInside: !0,
        preloader: !1,
        midClick: !0,
        removalDelay: 300,
        mainClass: "my-mfp-slide-bottom"
      }),
      $("#order-5").magnificPopup({
        type: "inline",
        fixedContentPos: !1,
        fixedBgPos: !0,
        overflowY: "auto",
        closeBtnInside: !0,
        preloader: !1,
        midClick: !0,
        removalDelay: 300,
        mainClass: "my-mfp-slide-bottom"
      }),
      $("#order-6").magnificPopup({
        type: "inline",
        fixedContentPos: !1,
        fixedBgPos: !0,
        overflowY: "auto",
        closeBtnInside: !0,
        preloader: !1,
        midClick: !0,
        removalDelay: 300,
        mainClass: "my-mfp-slide-bottom"
      }),
      $("#order-7").magnificPopup({
        type: "inline",
        fixedContentPos: !1,
        fixedBgPos: !0,
        overflowY: "auto",
        closeBtnInside: !0,
        preloader: !1,
        midClick: !0,
        removalDelay: 300,
        mainClass: "my-mfp-slide-bottom"
      }),
      $("#order-8").magnificPopup({
        type: "inline",
        fixedContentPos: !1,
        fixedBgPos: !0,
        overflowY: "auto",
        closeBtnInside: !0,
        preloader: !1,
        midClick: !0,
        removalDelay: 300,
        mainClass: "my-mfp-slide-bottom"
      }),
      $("#callback").magnificPopup({
        type: "inline",
        fixedContentPos: !1,
        fixedBgPos: !0,
        overflowY: "auto",
        closeBtnInside: !0,
        preloader: !1,
        midClick: !0,
        removalDelay: 300,
        mainClass: "my-mfp-slide-bottom"
      }),
      $("#consulting").magnificPopup({
        type: "inline",
        fixedContentPos: !1,
        fixedBgPos: !0,
        overflowY: "auto",
        closeBtnInside: !0,
        preloader: !1,
        midClick: !0,
        removalDelay: 300,
        mainClass: "my-mfp-slide-bottom"
      }),
      $("#benefit-order-1").magnificPopup({
        type: "inline",
        fixedContentPos: !1,
        fixedBgPos: !0,
        overflowY: "auto",
        closeBtnInside: !0,
        preloader: !1,
        midClick: !0,
        removalDelay: 300,
        mainClass: "my-mfp-slide-bottom"
      }),
      $("#benefit-order-2").magnificPopup({
        type: "inline",
        fixedContentPos: !1,
        fixedBgPos: !0,
        overflowY: "auto",
        closeBtnInside: !0,
        preloader: !1,
        midClick: !0,
        removalDelay: 300,
        mainClass: "my-mfp-slide-bottom"
      }),
      $("#benefit-order-2-2").magnificPopup({
        type: "inline",
        fixedContentPos: !1,
        fixedBgPos: !0,
        overflowY: "auto",
        closeBtnInside: !0,
        preloader: !1,
        midClick: !0,
        removalDelay: 300,
        mainClass: "my-mfp-slide-bottom"
      }),
      $("#benefit-order-3").magnificPopup({
        type: "inline",
        fixedContentPos: !1,
        fixedBgPos: !0,
        overflowY: "auto",
        closeBtnInside: !0,
        preloader: !1,
        midClick: !0,
        removalDelay: 300,
        mainClass: "my-mfp-slide-bottom"
      }),
      $("#benefit-order-4").magnificPopup({
        type: "inline",
        fixedContentPos: !1,
        fixedBgPos: !0,
        overflowY: "auto",
        closeBtnInside: !0,
        preloader: !1,
        midClick: !0,
        removalDelay: 300,
        mainClass: "my-mfp-slide-bottom"
      }),
      $("#benefit-order-4-4").magnificPopup({
        type: "inline",
        fixedContentPos: !1,
        fixedBgPos: !0,
        overflowY: "auto",
        closeBtnInside: !0,
        preloader: !1,
        midClick: !0,
        removalDelay: 300,
        mainClass: "my-mfp-slide-bottom"
      }),
      $("#benefit-order-5").magnificPopup({
        type: "inline",
        fixedContentPos: !1,
        fixedBgPos: !0,
        overflowY: "auto",
        closeBtnInside: !0,
        preloader: !1,
        midClick: !0,
        removalDelay: 300,
        mainClass: "my-mfp-slide-bottom"
      }),
      $("#product1-gray-r").click(function() {
        $("#product1-gray.product-image-item").addClass("active"),
          $("#product1-gold.product-image-item").removeClass("active"),
          $("#product1-silver.product-image-item").removeClass("active");
      }),
      $("#product1-gold-r").click(function() {
        $("#product1-gray.product-image-item").removeClass("active"),
          $("#product1-gold.product-image-item").addClass("active"),
          $("#product1-silver.product-image-item").removeClass("active");
      }),
      $("#product1-silver-r").click(function() {
        $("#product1-gray.product-image-item").removeClass("active"),
          $("#product1-gold.product-image-item").removeClass("active"),
          $("#product1-silver.product-image-item").addClass("active");
      }),
      $("#product2-gray-r").click(function() {
        $("#product2-gray.product-image-item").addClass("active"),
          $("#product2-gold.product-image-item").removeClass("active"),
          $("#product2-silver.product-image-item").removeClass("active");
      }),
      $("#product2-gold-r").click(function() {
        $("#product2-gray.product-image-item").removeClass("active"),
          $("#product2-gold.product-image-item").addClass("active"),
          $("#product2-silver.product-image-item").removeClass("active");
      }),
      $("#product2-silver-r").click(function() {
        $("#product2-gray.product-image-item").removeClass("active"),
          $("#product2-gold.product-image-item").removeClass("active"),
          $("#product2-silver.product-image-item").addClass("active");
      }),
      $("#product3-gray-r").click(function() {
        $("#product3-gray.product-image-item").addClass("active"),
          $("#product3-gold.product-image-item").removeClass("active"),
          $("#product3-silver.product-image-item").removeClass("active");
      }),
      $("#product3-gold-r").click(function() {
        $("#product3-gray.product-image-item").removeClass("active"),
          $("#product3-gold.product-image-item").addClass("active"),
          $("#product3-silver.product-image-item").removeClass("active");
      }),
      $("#product3-silver-r").click(function() {
        $("#product3-gray.product-image-item").removeClass("active"),
          $("#product3-gold.product-image-item").removeClass("active"),
          $("#product3-silver.product-image-item").addClass("active");
      }),
      $("#product4-gray-r").click(function() {
        $("#product4-gray.product-image-item").addClass("active"),
          $("#product4-gold.product-image-item").removeClass("active"),
          $("#product4-silver.product-image-item").removeClass("active");
      }),
      $("#product4-gold-r").click(function() {
        $("#product4-gray.product-image-item").removeClass("active"),
          $("#product4-gold.product-image-item").addClass("active"),
          $("#product4-silver.product-image-item").removeClass("active");
      }),
      $("#product4-silver-r").click(function() {
        $("#product4-gray.product-image-item").removeClass("active"),
          $("#product4-gold.product-image-item").removeClass("active"),
          $("#product4-silver.product-image-item").addClass("active");
      }),
      $("#product5-gray-r").click(function() {
        $("#product5-gray.product-image-item").addClass("active"),
          $("#product5-gold.product-image-item").removeClass("active"),
          $("#product5-silver.product-image-item").removeClass("active");
      }),
      $("#product5-gold-r").click(function() {
        $("#product5-gray.product-image-item").removeClass("active"),
          $("#product5-gold.product-image-item").addClass("active"),
          $("#product5-silver.product-image-item").removeClass("active");
      }),
      $("#product5-silver-r").click(function() {
        $("#product5-gray.product-image-item").removeClass("active"),
          $("#product5-gold.product-image-item").removeClass("active"),
          $("#product5-silver.product-image-item").addClass("active");
      }),
      $("#product6-black-r").click(function() {
        $("#product6-red.product-image-item").removeClass("active"),
          $("#product6-pink.product-image-item").removeClass("active"),
          $("#product6-gold.product-image-item").removeClass("active");
        $("#product6-silver.product-image-item").removeClass("active");
        $("#product6-black.product-image-item").addClass("active");
      }),
      $("#product6-red-r").click(function() {
        $("#product6-red.product-image-item").addClass("active"),
          $("#product6-pink.product-image-item").removeClass("active"),
          $("#product6-gold.product-image-item").removeClass("active");
        $("#product6-silver.product-image-item").removeClass("active");
        $("#product6-black.product-image-item").removeClass("active");
      }),
      $("#product6-pink-r").click(function() {
        $("#product6-red.product-image-item").removeClass("active"),
          $("#product6-pink.product-image-item").addClass("active"),
          $("#product6-gold.product-image-item").removeClass("active");
        $("#product6-silver.product-image-item").removeClass("active");
        $("#product6-black.product-image-item").removeClass("active");
      }),
      $("#product6-gold-r").click(function() {
        $("#product6-red.product-image-item").removeClass("active"),
          $("#product6-pink.product-image-item").removeClass("active"),
          $("#product6-gold.product-image-item").addClass("active");
        $("#product6-silver.product-image-item").removeClass("active");
        $("#product6-black.product-image-item").removeClass("active");
      }),
      $("#product6-silver-r").click(function() {
        $("#product6-red.product-image-item").removeClass("active"),
          $("#product6-pink.product-image-item").removeClass("active"),
          $("#product6-gold.product-image-item").removeClass("active");
        $("#product6-silver.product-image-item").addClass("active");
        $("#product6-black.product-image-item").removeClass("active");
      }),
      $("#product7-black-r").click(function() {
        $("#product7-black.product-image-item").addClass("active");
      }),
      $("#product8-black-r").click(function() {
        $("#product8-gold.product-image-item").removeClass("active");
        $("#product8-silver.product-image-item").removeClass("active");
        $("#product8-black.product-image-item").addClass("active");
      }),
      $("#product8-gold-r").click(function() {
        $("#product8-gold.product-image-item").addClass("active");
        $("#product8-silver.product-image-item").removeClass("active");
        $("#product8-black.product-image-item").removeClass("active");
      }),
      $("#product8-silver-r").click(function() {
        $("#product8-gold.product-image-item").removeClass("active");
        $("#product8-silver.product-image-item").addClass("active");
        $("#product8-black.product-image-item").removeClass("active");
      }),
      $("form#order-form-1").change(function() {
        if ($("input[id='product1-memory-1']").prop("checked")) {
          var e = $("#product1-memory-1").data("price");
          $("#order-form-1 .total-price-count").html(e);
        } else if ($("input[id='product1-memory-2']").prop("checked")) {
          var e = $("#product1-memory-2").data("price");
          $("#order-form-1 .total-price-count").html(e);
        } else if ($("input[id='product1-memory-3']").prop("checked")) {
          var e = $("#product1-memory-3").data("price");
          $("#order-form-1 .total-price-count").html(e);
        } else if ($("input[id='product1-memory-4']").prop("checked")) {
          var e = $("#product1-memory-4").data("price");
          $("#order-form-1 .total-price-count").html(e);
        }
      }),
      $("form#order-form-2").change(function() {
        if ($("input[id='product2-memory-1']").prop("checked")) {
          var e = $("#product2-memory-1").data("price");
          $("#order-form-2 .total-price-count").html(e);
        } else if ($("input[id='product2-memory-2']").prop("checked")) {
          var e = $("#product2-memory-2").data("price");
          $("#order-form-2 .total-price-count").html(e);
        } else if ($("input[id='product2-memory-3']").prop("checked")) {
          var e = $("#product2-memory-3").data("price");
          $("#order-form-2 .total-price-count").html(e);
        } else if ($("input[id='product2-memory-4']").prop("checked")) {
          var e = $("#product2-memory-4").data("price");
          $("#order-form-2 .total-price-count").html(e);
        }
      }),
      $("form#order-form-3").change(function() {
        if ($("input[id='product3-memory-1']").prop("checked")) {
          var e = $("#product3-memory-1").data("price");
          $("#order-form-3 .total-price-count").html(e);
        } else if ($("input[id='product3-memory-2']").prop("checked")) {
          var e = $("#product3-memory-2").data("price");
          $("#order-form-3 .total-price-count").html(e);
        } else if ($("input[id='product3-memory-3']").prop("checked")) {
          var e = $("#product3-memory-3").data("price");
          $("#order-form-3 .total-price-count").html(e);
        } else if ($("input[id='product3-memory-4']").prop("checked")) {
          var e = $("#product3-memory-4").data("price");
          $("#order-form-3 .total-price-count").html(e);
        }
      }),
      $("form#order-form-4").change(function() {
        if ($("input[id='product4-memory-1']").prop("checked")) {
          var e = $("#product4-memory-1").data("price");
          $("#order-form-4 .total-price-count").html(e);
        } else if ($("input[id='product4-memory-2']").prop("checked")) {
          var e = $("#product4-memory-2").data("price");
          $("#order-form-4 .total-price-count").html(e);
        } else if ($("input[id='product4-memory-3']").prop("checked")) {
          var e = $("#product4-memory-3").data("price");
          $("#order-form-4 .total-price-count").html(e);
        } else if ($("input[id='product4-memory-4']").prop("checked")) {
          var e = $("#product4-memory-4").data("price");
          $("#order-form-4 .total-price-count").html(e);
        }
      }),
      $("form#order-form-5").change(function() {
        if ($("input[id='product5-memory-1']").prop("checked")) {
          var e = $("#product5-memory-1").data("price");
          $("#order-form-5 .total-price-count").html(e);
        } else if ($("input[id='product5-memory-2']").prop("checked")) {
          var e = $("#product5-memory-2").data("price");
          $("#order-form-5 .total-price-count").html(e);
        } else if ($("input[id='product5-memory-3']").prop("checked")) {
          var e = $("#product5-memory-3").data("price");
          $("#order-form-5 .total-price-count").html(e);
        } else if ($("input[id='product5-memory-4']").prop("checked")) {
          var e = $("#product5-memory-4").data("price");
          $("#order-form-5 .total-price-count").html(e);
        }
      }),
      $("form#order-form-6").change(function() {
        if ($("input[id='product6-memory-1']").prop("checked")) {
          var e = $("#product6-memory-1").data("price");
          $("#order-form-6 .total-price-count").html(e);
        } else if ($("input[id='product6-memory-2']").prop("checked")) {
          var e = $("#product6-memory-2").data("price");
          $("#order-form-6 .total-price-count").html(e);
        } else if ($("input[id='product6-memory-3']").prop("checked")) {
          var e = $("#product6-memory-3").data("price");
          $("#order-form-6 .total-price-count").html(e);
        } else if ($("input[id='product6-memory-4']").prop("checked")) {
          var e = $("#product6-memory-4").data("price");
          $("#order-form-6 .total-price-count").html(e);
        }
      }),
      $("form#order-form-7").change(function() {
        if ($("input[id='product7-memory-1']").prop("checked")) {
          var e = $("#product7-memory-1").data("price");
          $("#order-form-7 .total-price-count").html(e);
        } else if ($("input[id='product7-memory-2']").prop("checked")) {
          var e = $("#product7-memory-2").data("price");
          $("#order-form-7 .total-price-count").html(e);
        } else if ($("input[id='product7-memory-3']").prop("checked")) {
          var e = $("#product7-memory-3").data("price");
          $("#order-form-7 .total-price-count").html(e);
        } else if ($("input[id='product7-memory-4']").prop("checked")) {
          var e = $("#product7-memory-4").data("price");
          $("#order-form-7 .total-price-count").html(e);
        }
      }),
      $("form#order-form-8").change(function() {
        if ($("input[id='product8-memory-1']").prop("checked")) {
          var e = $("#product8-memory-1").data("price");
          $("#order-form-8 .total-price-count").html(e);
        } else if ($("input[id='product8-memory-2']").prop("checked")) {
          var e = $("#product8-memory-2").data("price");
          $("#order-form-8 .total-price-count").html(e);
        } else if ($("input[id='product8-memory-3']").prop("checked")) {
          var e = $("#product8-memory-3").data("price");
          $("#order-form-8 .total-price-count").html(e);
        } else if ($("input[id='product8-memory-4']").prop("checked")) {
          var e = $("#product8-memory-4").data("price");
          $("#order-form-8 .total-price-count").html(e);
        }
      }),
      $("#callback-f").submit(function() {
        var e = $(this);
        return (
          $.ajax({
            type: "POST",
            url: "forms.php",
            data: e.serialize()
          }).done(function() {
            $("#callback-f .success").addClass("visible"),
              setTimeout(function() {
                e.trigger("reset"),
                  $("#callback-f .success").removeClass("visible"),
                  $.magnificPopup.close();
              }, 4e3);
          }),
          !1
        );
      }),
      $("#consulting-f").submit(function() {
        var e = $(this);
        return (
          $.ajax({
            type: "POST",
            url: "forms.php",
            data: e.serialize()
          }).done(function() {
            $("#consulting-f .success").addClass("visible"),
              setTimeout(function() {
                e.trigger("reset"),
                  $("#consulting-f .success").removeClass("visible"),
                  $.magnificPopup.close();
              }, 4e3);
          }),
          !1
        );
      }),
      $("#quest-f").submit(function() {
        var e = $(this);
        return (
          $.ajax({
            type: "POST",
            url: "forms.php",
            data: e.serialize()
          }).done(function() {
            $("#quest-f .success").addClass("visible"),
              setTimeout(function() {
                e.trigger("reset"),
                  $("#quest-f .success").removeClass("visible"),
                  $.magnificPopup.close();
              }, 4e3);
          }),
          !1
        );
      }),
      $(".questionsForm").submit(function() {
        var e = $(this);
        console.log(e.serialize());
        return (
          $.ajax({
            type: "POST",
            url: "forms.php",
            data: e.serialize()
          }).done(function() {
            $("#questionsForm .success").addClass("visible"),
              setTimeout(function() {
                e.trigger("reset"),
                  $("#questionsForm .success").removeClass("visible");
              }, 4e3);
          }),
          !1
        );
      }),
      $("#order-form-1").submit(function() {
        var e = $(this);
        console.log(e.serialize());
        return (
          $.ajax({
            type: "POST",
            url: "forms.php",
            data: e.serialize()
          }).done(function() {
            $("#order-form-1 .success").addClass("visible"),
              setTimeout(function() {
                e.trigger("reset"),
                  $("#order-form-1 .success").removeClass("visible"),
                  $.magnificPopup.close();
              }, 4e3);
          }),
          !1
        );
      }),
      $("#order-form-2").submit(function() {
        var e = $(this);
        return (
          $.ajax({
            type: "POST",
            url: "forms.php",
            data: e.serialize()
          }).done(function() {
            $("#order-form-2 .success").addClass("visible"),
              setTimeout(function() {
                e.trigger("reset"),
                  $("#order-form-2 .success").removeClass("visible"),
                  $.magnificPopup.close();
              }, 4e3);
          }),
          !1
        );
      }),
      $("#order-form-3").submit(function() {
        var e = $(this);
        return (
          $.ajax({
            type: "POST",
            url: "forms.php",
            data: e.serialize()
          }).done(function() {
            $("#order-form-3 .success").addClass("visible"),
              setTimeout(function() {
                e.trigger("reset"),
                  $("#order-form-3 .success").removeClass("visible"),
                  $.magnificPopup.close();
              }, 4e3);
          }),
          !1
        );
      }),
      $("#order-form-4").submit(function() {
        var e = $(this);
        return (
          $.ajax({
            type: "POST",
            url: "forms.php",
            data: e.serialize()
          }).done(function() {
            $("#order-form-4 .success").addClass("visible"),
              setTimeout(function() {
                e.trigger("reset"),
                  $("#order-form-4 .success").removeClass("visible"),
                  $.magnificPopup.close();
              }, 4e3);
          }),
          !1
        );
      }),
      $("#order-form-5").submit(function() {
        var e = $(this);
        return (
          $.ajax({
            type: "POST",
            url: "forms.php",
            data: e.serialize()
          }).done(function() {
            $("#order-form-5 .success").addClass("visible"),
              setTimeout(function() {
                e.trigger("reset"),
                  $("#order-form-5 .success").removeClass("visible"),
                  $.magnificPopup.close();
              }, 4e3);
          }),
          !1
        );
      }),
      $("#order-form-6").submit(function() {
        var e = $(this);
        return (
          $.ajax({
            type: "POST",
            url: "forms.php",
            data: e.serialize()
          }).done(function() {
            $("#order-form-6 .success").addClass("visible"),
              setTimeout(function() {
                e.trigger("reset"),
                  $("#order-form-6 .success").removeClass("visible"),
                  $.magnificPopup.close();
              }, 4e3);
          }),
          !1
        );
      }),
      $("#order-form-7").submit(function() {
        var e = $(this);
        return (
          $.ajax({
            type: "POST",
            url: "forms.php",
            data: e.serialize()
          }).done(function() {
            $("#order-form-7 .success").addClass("visible"),
              setTimeout(function() {
                e.trigger("reset"),
                  $("#order-form-7 .success").removeClass("visible"),
                  $.magnificPopup.close();
              }, 4e3);
          }),
          !1
        );
      }),
      $("#order-form-8").submit(function() {
        var e = $(this);
        return (
          $.ajax({
            type: "POST",
            url: "forms.php",
            data: e.serialize()
          }).done(function() {
            $("#order-form-8 .success").addClass("visible"),
              setTimeout(function() {
                e.trigger("reset"),
                  $("#order-form-8 .success").removeClass("visible"),
                  $.magnificPopup.close();
              }, 4e3);
          }),
          !1
        );
      }),
      $(".slow-scroll").click(function() {
        var e = $(this).attr("href");
        return (
          $("body").animate(
            {
              scrollTop: $(e).offset().top
            },
            1e3
          ),
          !1
        );
      }),
      $(".top").click(function() {
        $("html, body")
          .stop()
          .animate(
            {
              scrollTop: 0
            },
            "slow",
            "swing"
          );
      }),
      $(window).scroll(function() {
        $(this).scrollTop() > $(window).height()
          ? $(".top").addClass("active")
          : $(".top").removeClass("active");
      }),
      $("#order-1_btn").click(function() {
        $("#order-1").trigger("click");
      }),
      $("#order-2_btn").click(function() {
        $("#order-2").trigger("click");
      }),
      $("#order-3_btn").click(function() {
        $("#order-3").trigger("click");
      }),
      $("#order-4_btn").click(function() {
        $("#order-4").trigger("click");
      }),
      $("#order-5_btn").click(function() {
        $("#order-5").trigger("click");
      }),
      $("#order-form-1 #kredit").click(function() {
        if ($("#order-form-1 input[name=color]:checked").length > 0)
          if ($("#order-form-1 input[name=capacity]:checked").length > 0) {
            var e = $("#order-form-1 input[name=product]").val(),
              t = $("#order-form-1 input[name=color]:checked").val(),
              n = $("#order-form-1 input[name=capacity]:checked").val(),
              r = $("#order-form-1 span.total-price-count").html(),
              i = r.replace(/\s+/g, "");
            $("#order-form-1_kredit input[name=itemName_0]").val(e + t + n),
              $("#order-form-1_kredit input[name=sum]").val(i + ".00"),
              $("#order-form-1_kredit input[name=itemPrice_0]").val(i + ".00"),
              $("#order-form-1_kredit #btn_kredit").trigger("click");
          } else
            $("#order-form-1 .error.memory").css("visibility", "visible"),
              setTimeout(function() {
                $("#order-form-1 .error.memory").css("visibility", "hidden");
              }, 2e3);
        else
          $("#order-form-1 .error.color").css("visibility", "visible"),
            setTimeout(function() {
              $("#order-form-1 .error.color").css("visibility", "hidden");
            }, 2e3);
      }),
      $("#order-form-2 #kredit").click(function() {
        if ($("#order-form-2 input[name=color]:checked").length > 0)
          if ($("#order-form-2 input[name=capacity]:checked").length > 0) {
            var e = $("#order-form-2 input[name=product]").val(),
              t = $("#order-form-2 input[name=color]:checked").val(),
              n = $("#order-form-2 input[name=capacity]:checked").val(),
              r = $("#order-form-1 span.total-price-count").html(),
              i = r.replace(/\s+/g, "");
            $("#order-form-2_kredit input[name=itemName_0]").val(e + t + n),
              $("#order-form-2_kredit input[name=sum]").val(i + ".00"),
              $("#order-form-2_kredit input[name=itemPrice_0]").val(i + ".00"),
              $("#order-form-2_kredit #btn_kredit").trigger("click");
          } else
            $("#order-form-2 .error.memory").css("visibility", "visible"),
              setTimeout(function() {
                $("#order-form-2 .error.memory").css("visibility", "hidden");
              }, 2e3);
        else
          $("#order-form-2 .error.color").css("visibility", "visible"),
            setTimeout(function() {
              $("#order-form-2 .error.color").css("visibility", "hidden");
            }, 2e3);
      }),
      $("#order-form-3 #kredit").click(function() {
        if ($("#order-form-3 input[name=color]:checked").length > 0)
          if ($("#order-form-3 input[name=capacity]:checked").length > 0) {
            var e = $("#order-form-3 input[name=product]").val(),
              t = $("#order-form-3 input[name=color]:checked").val(),
              n = $("#order-form-3 input[name=capacity]:checked").val(),
              r = $("#order-form-3 span.total-price-count").html(),
              i = r.replace(/\s+/g, "");
            $("#order-form-3_kredit input[name=itemName_0]").val(e + t + n),
              $("#order-form-3_kredit input[name=sum]").val(i + ".00"),
              $("#order-form-3_kredit input[name=itemPrice_0]").val(i + ".00"),
              $("#order-form-3_kredit #btn_kredit").trigger("click");
          } else
            $("#order-form-3 .error.memory").css("visibility", "visible"),
              setTimeout(function() {
                $("#order-form-3 .error.memory").css("visibility", "hidden");
              }, 2e3);
        else
          $("#order-form-3 .error.color").css("visibility", "visible"),
            setTimeout(function() {
              $("#order-form-3 .error.color").css("visibility", "hidden");
            }, 2e3);
      }),
      $("#order-form-4 #kredit").click(function() {
        if ($("#order-form-4 input[name=color]:checked").length > 0)
          if ($("#order-form-4 input[name=capacity]:checked").length > 0) {
            var e = $("#order-form-4 input[name=product]").val(),
              t = $("#order-form-4 input[name=color]:checked").val(),
              n = $("#order-form-4 input[name=capacity]:checked").val(),
              r = $("#order-form-4 span.total-price-count").html(),
              i = r.replace(/\s+/g, "");
            $("#order-form-4_kredit input[name=itemName_0]").val(e + t + n),
              $("#order-form-4_kredit input[name=sum]").val(i + ".00"),
              $("#order-form-4_kredit input[name=itemPrice_0]").val(i + ".00"),
              $("#order-form-4_kredit #btn_kredit").trigger("click");
          } else
            $("#order-form-4 .error.memory").css("visibility", "visible"),
              setTimeout(function() {
                $("#order-form-4 .error.memory").css("visibility", "hidden");
              }, 2e3);
        else
          $("#order-form-4 .error.color").css("visibility", "visible"),
            setTimeout(function() {
              $("#order-form-4 .error.color").css("visibility", "hidden");
            }, 2e3);
      }),
      $("#order-form-5 #kredit").click(function() {
        if ($("#order-form-5 input[name=color]:checked").length > 0)
          if ($("#order-form-5 input[name=capacity]:checked").length > 0) {
            var e = $("#order-form-5 input[name=product]").val(),
              t = $("#order-form-5 input[name=color]:checked").val(),
              n = $("#order-form-5 input[name=capacity]:checked").val(),
              r = $("#order-form-5 span.total-price-count").html(),
              i = r.replace(/\s+/g, "");
            $("#order-form-5_kredit input[name=itemName_0]").val(e + t + n),
              $("#order-form-5_kredit input[name=sum]").val(i + ".00"),
              $("#order-form-5_kredit input[name=itemPrice_0]").val(i + ".00"),
              $("#order-form-5_kredit #btn_kredit").trigger("click");
          } else
            $("#order-form-5 .error.memory").css("visibility", "visible"),
              setTimeout(function() {
                $("#order-form-5 .error.memory").css("visibility", "hidden");
              }, 2e3);
        else
          $("#order-form-5 .error.color").css("visibility", "visible"),
            setTimeout(function() {
              $("#order-form-5 .error.color").css("visibility", "hidden");
            }, 2e3);
      });
    $("#order-form-6 #kredit").click(function() {
      if ($("#order-form-6 input[name=color]:checked").length > 0)
        if ($("#order-form-6 input[name=capacity]:checked").length > 0) {
          var e = $("#order-form-6 input[name=product]").val(),
            t = $("#order-form-6 input[name=color]:checked").val(),
            n = $("#order-form-6 input[name=capacity]:checked").val(),
            r = $("#order-form-6 span.total-price-count").html(),
            i = r.replace(/\s+/g, "");
        } else
          $("#order-form-6 .error.memory").css("visibility", "visible"),
            setTimeout(function() {
              $("#order-form-6 .error.memory").css("visibility", "hidden");
            }, 2e3);
      else
        $("#order-form-6 .error.color").css("visibility", "visible"),
          setTimeout(function() {
            $("#order-form-6 .error.color").css("visibility", "hidden");
          }, 2e3);
    });
  });
jQuery;
