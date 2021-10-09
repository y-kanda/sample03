$(function () {
  AOS.init();

  // ハンバーガーメニュー 右からフェードイン出来てない？要検討
  $(".white-mask").hide();
  $(".menu-trigger, .menu-list, .menu-item a").click(function () {
    $(".white-mask").fadeToggle(300);
    $(".menu-list, .menu-trigger").toggleClass("open");
    $("body").toggleClass("noscroll");
  });
  // スムーススクロール
  $("a[href^='#']:not([href='#'])").click(function () {
    var target = $($(this).attr("href")).offset().top;
    // 固定ヘッダーの高さ分を引く
    target -= 94;
    // コンテンツへスクロール
    $("html, body").animate({ scrollTop: target }, 500);
    return false;
  });
  // faqのanswer表示
  $(".faq-item:not(:first-child) dd").hide();
  $(".faq-list dl").on("click", function (e) {
    $("dd", this).slideToggle("fast");
  });

  const swiper = new Swiper(".swiper-container", {
    // Optinal parameters
    loop: true,
    centeredSlides: true,
    slidesPerView: 3.5,
    spaceBetween: 56,

    breakpoints: {
      300: {
        slidesPerView: 1.5,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 36,
      },
      // 1024: {
      //   slidesPerView: 3,
      //   spaceBetween: 36,
      // },
      1280: {
        slidesPerView: 3.5,
        spaceBetween: 56,
      },
    },

    autoplay: {
      speed: 5000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
      reverseDirection: false,
    },

    pagination: {
      el: ".swiper-pagination",
      // クリックできる
      clickable: true,
    },
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const $submitBtn = $("#js-submit");
  $("#form input, #form textarea").on("change", function () {
    // もしお問合せ内容が入力され、プライバシーポリシーのチェックボックスにチェックがされている
    if (
      $('#form input[type="text"]').val() !== "" &&
      $('#form input[type="mail"]').val() !== "" &&
      $("#form textarea").val() !== "" &&
      $("#form #check").prop("checked") === true
    ) {
      $submitBtn.prop("disabled", false); // 送信ボタンを有効化する
    } else {
      $submitBtn.prop("disabled", true); // 送信ボタンを無効化する
    }
  });
  $("#form").submit(function (event) {
    var formData = $("#form").serialize();
    $.ajax({
      url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSe_1Zami7nR2SbL4r-N2JgZfIBupcFtd6fhGMMjrp81MT3OAA/formResponse",
      data: formData,
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          $(".end-message").slideDown();
          $(".contact-btn").fadeOut();
          //window.location.href = "thanks.html"; 送信完了ページに遷移、移動する
        },
        200: function () {
          $(".false-message").slideDown();
        },
      },
    });
    // submitイベントを無効化し遷移させない
    event.preventDefault();
  });
});
