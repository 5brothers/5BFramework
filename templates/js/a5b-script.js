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

document.querySelectorAll('.tel').forEach(function(el, i) {
  el.textContent = el.textContent.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
});

// Маска ввода телефона
(function() {
  // селектор полей маски
  const inputs = document.querySelectorAll('.telmask');

  inputs.forEach(function(input) {
    // фокус: если поле пустое — показать +7 ( и поставить курсор после (
    input.addEventListener('focus', function() {
      if (input.value.trim() === '') {
        input.value = '+7 (';
      }
      setCursorPosition(input, 4); // после "+7 ("
    });

    // клик: если кликают до зоны вводимых символов — перемещаем курсор за "+7 ("
    input.addEventListener('click', function() {
      if (input.selectionStart < 4) {
        setCursorPosition(input, 4);
      }
    });

    // keydown: обрабатываем Delete / Backspace (и поведение при выделении всего номера)
    input.addEventListener('keydown', function(e) {
      const key = e.key;

      // запрещаем удалять сам префикс "+7"
      if ((key === 'Backspace' || key === 'Delete') && input.selectionStart <= 3 && input.selectionEnd <= 3) {
        e.preventDefault();
        return;
      }

      // если есть выделение — проверим, выделены ли все вводимые цифры (кроме ведущей 7)
      if ((key === 'Backspace' || key === 'Delete') && input.selectionStart !== input.selectionEnd) {
        const val = input.value;
        const totalDigits = val.replace(/\D/g, ''); // например "7xxxxxxxxxx" или "7" если пусто
        const selected = val.substring(input.selectionStart, input.selectionEnd);
        const selDigits = selected.replace(/\D/g, '');

        // учитываем пользовательские цифры: totalDigitsWithoutLeading = totalDigits minus leading '7' (если есть)
        const totalUserDigits = totalDigits.startsWith('7') ? totalDigits.length - 1 : totalDigits.length;
        // выбранные пользовательские цифры
        let selUserDigits = selDigits;
        if (selUserDigits.startsWith('7')) selUserDigits = selUserDigits.substring(1);
        // если количество выбранных пользовательских цифр равно всех пользовательских цифр — удалить их все
        if (selUserDigits.length > 0 && selUserDigits.length === totalUserDigits) {
          e.preventDefault();
          // останется префикс "+7 ("
          input.value = '+7 (';
          setCursorPosition(input, 4);
          // триггерим input чтобы отработали другие слушатели (если есть)
          input.dispatchEvent(new Event('input', { bubbles: true }));
          return;
        }
      }

      // если нажали Backspace когда курсор стоит сразу после спецсимвола — позволим обработке в keydown ниже в input
      // для других кейсов не вмешиваемся — input обработает и отформатирует.
    });

    // input: основная логика форматирования + сохранение позиции курсора
    input.addEventListener('input', function(e) {
      const prev = e.target;
      const raw = prev.value;

      // вычислим сколько цифр было слева от курсора до форматирования (включая ведущую 7, если она там есть)
      const selStart = prev.selectionStart || 0;
      const digitsBefore = countDigits(raw.slice(0, selStart));

      // получаем только цифры из поля
      let digits = raw.replace(/\D/g, '');

      // если пользователь вдруг ввёл несколько первых 7/8 — обрезаем дополнительные
      if (digits.startsWith('8')) digits = '7' + digits.slice(1);
      if (!digits.startsWith('7')) digits = '7' + digits; // всегда начинаем с 7

      // Обрезаем лишние цифры до 11 цифр (7 + 10 пользовательских)
      digits = digits.slice(0, 11);

      // составляем формат
      let formatted = '+7';
      if (digits.length > 1) formatted += ' (' + digits.substring(1, 4);
      if (digits.length >= 4) formatted += ') ' + digits.substring(4, 7);
      if (digits.length >= 7) formatted += '-' + digits.substring(7, 9);
      if (digits.length >= 9) formatted += '-' + digits.substring(9, 11);

      // если осталась только ведущая 7 — показываем '+7 (' чтобы пользователю было видно где вводить
      if (digits.length === 1) {
        formatted = '+7 (';
      }

      prev.value = formatted;

      // восстановим позицию курсора: найдем позицию в formatted, где слева будет цифр столько же, сколько digitsBefore
      let pos = mapDigitIndexToPosition(formatted, digitsBefore);
      // если pos меньше 4 — поставим сразу после префикса
      if (pos < 4) pos = 4;
      setCursorPosition(prev, pos);
    });

    // blur: если ничего не введено — очистим поле
    input.addEventListener('blur', function() {
      if (input.value === '+7 (' || input.value === '+7') {
        input.value = '';
      }
    });
  });

  // ---- Вспомогательные функции ----

  // возвращает количество цифр в строке
  function countDigits(str) {
    const m = str.match(/\d/g);
    return m ? m.length : 0;
  }

  // находит индекс (позицию в строке) в formatted, где слева будет exactly 'digitIndex' цифр
  // если digitIndex==0 => возвращает позицию перед первой цифрой (обычно 4)
  function mapDigitIndexToPosition(formatted, digitIndex) {
    if (digitIndex <= 0) return 0;
    let count = 0;
    for (let i = 0; i < formatted.length; i++) {
      if (/\d/.test(formatted[i])) {
        count++;
        if (count === digitIndex) {
          // хотим поставить курсор сразу после этой цифры
          return i + 1;
        }
      }
    }
    // если нужных цифр не найдено — вернуть конец строки
    return formatted.length;
  }

  // ставим позицию курсора (совместимо со старыми браузерами)
  function setCursorPosition(elem, pos) {
    try {
      elem.focus();
      if (typeof pos !== 'number') pos = elem.value.length;
      elem.setSelectionRange(pos, pos);
    } catch (e) {
      // для IE
      const range = elem.createTextRange && elem.createTextRange();
      if (range) {
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    }
  }
})();

// Modalio
document.addEventListener('DOMContentLoaded', () => {

  /**
   * Закрывает активное модальное окно и удаляет обёртку.
   * @param {HTMLElement} modal - Элемент модального окна, который нужно скрыть.
   * @param {HTMLElement} cover - Элемент-обёртка, который нужно удалить.
   */
  function closeModal(modal, cover) {
    modal.classList.remove("showIt");
    cover.classList.remove("showIt");

    cover.addEventListener('transitionend', function () {
      this.remove();
    }, { once: true });
  }

  // Обработчик открытия модальных окон
  document.querySelectorAll('.showModal').forEach(button => {
    button.addEventListener('click', function () {
      const modalId = button.dataset.mtarget;
      const targetModal = document.getElementById(modalId);

      if (targetModal) {
        const modalCover = document.createElement('div');
        modalCover.className = 'modalio-cover modalioCover';
        document.body.appendChild(modalCover);

        targetModal.classList.add("showIt");
        modalCover.classList.add("showIt");

        // Добавляем обработчик для закрытия при клике на обёртку
        modalCover.addEventListener('click', function (event) {
          if (event.target === this) {
            closeModal(targetModal, modalCover);
          }
        });

        // Добавляем обработчик для крестика внутри модального окна
        const crossButton = targetModal.querySelector('.cross-modal');
        if (crossButton) {
          crossButton.addEventListener('click', function (event) {
            event.stopPropagation(); // Предотвращаем всплытие
            closeModal(targetModal, modalCover);
          });
        }
      }
    });
  });

  // Обработчик закрытия по клавише Esc
  document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
      const activeModal = document.querySelector('.modalio.showIt');
      const activeCover = document.querySelector('.modalio-cover.showIt');
      if (activeModal && activeCover) {
        closeModal(activeModal, activeCover);
      }
    }
  });
});