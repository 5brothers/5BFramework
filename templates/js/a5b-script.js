// Criss Cross
var criss = document.querySelectorAll('.criss')
criss.forEach(function(item) {
item.addEventListener('click', function() {
  this.classList.toggle('cross')
});
});

//Top nav toggle
var toggleNav = document.querySelector('.toggleNav');
var topNav = document.querySelector('.top-nav');

if (toggleNav && topNav) {
  toggleNav.addEventListener('click', function() {
    topNav.classList.toggle('show');
  });
}

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