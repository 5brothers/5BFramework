//Top nav toggle
$(document).ready(function () {
    $(".toggle").click(function () {
        $(".navHolder").toggleClass('showNav');
    });

    $(".navHolder").click(function (e) {
        if (e.target === this) {
            $(".navHolder").toggleClass('showNav');
        }
    });
});

//Adaptive Tables
$(".content table").wrap("<div class='adapt-t'></div>");

//ToTop button
$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('.totop').fadeIn();
        } else {
            $('.totop').fadeOut();
        }
    });
    $('.totop').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
    });
});

//Phone number format
$('.tel').text(function (i, text) {
    return text.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
});

//Check checkbox in form
$('.checkright').on('change', function () {
    if ($(this).is(':checked')) $('.submit-form').attr('disabled', false);
    else $('.submit-form').attr('disabled', true);
});

//Show Password
$(".show-pass").click(function () {

    $(this).toggleClass("open close");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});

// Slider
$('.responsive').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
      },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
      },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
      }
    ]
});

//   Tabs
(function ($) {
    $(function () {

        $('ul.tabs__caption').on('click', 'li:not(.active)', function () {
            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
        });

    });
})(jQuery);

//FAQ
$(".topic-holder").click(function () {
    $(this).next(".spoiladoor").slideToggle("fast");
    $(this).toggleClass("spoilastyle");
    $(this).find(".minus").slideToggle("fast");
});

// Делим число на разряды
document.addEventListener('DOMContentLoaded', function() {
  var digitElements = document.querySelectorAll('.digit');

  digitElements.forEach(function(digitElement) {
      var number = parseFloat(digitElement.textContent);

      if (!isNaN(number)) {
          digitElement.textContent = number.toLocaleString('ru-RU');
      }
  });
});

// Плавный переход по id
document.addEventListener("DOMContentLoaded", () => {
    // Перехватываем клик по всем ссылкам, которые содержат символ #
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const hashIndex = href.indexOf('#');

            if (hashIndex === -1) return; // Если нет символа #, ничего не делаем

            e.preventDefault(); // Предотвратить стандартное поведение ссылок

            // Извлекаем идентификатор элемента после символа #
            const targetId = href.substring(hashIndex);
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Прокручиваем страницу к элементу плавно
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// Modalio
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".infoModalHolder .crissCross").forEach((crissCross) => {
      crissCross.addEventListener("click", () => {
        const infoModalHolder = crissCross.closest(".infoModalHolder");
        if (infoModalHolder) {
          
          infoModalHolder.classList.remove("show-modal");
          
        }
      });
    });
  });
  
//Загружаем код спрайта SVG в шаблон
$.get("../templates/img/sprite-icons.svg", function(data) {
    var div = document.createElement("div");
    div.className = "svg-sprite";
    div.style.display = "none";
    div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
    document.body.insertBefore(div, document.body.lastElementChild);
  });
  