const headings = document.querySelectorAll('.heading');
const contents = document.querySelectorAll('.content');
const arrows = document.querySelectorAll('.arrow');
const description = document.querySelector('.description');

// Проверка маршрутов и отображение контента
function renderPage() {
    const path = window.location.pathname;

    // Если путь не соответствует существующему вопросу
    if (path !== '/' && !document.querySelector(`.content[id="content-${path.slice(1)}"]`)) {
        description.innerHTML = `
            <h2>Ошибка 404</h2>
            <p>Страница не найдена.</p>
        `;
        description.style.display = 'block';
        contents.forEach(content => (content.style.display = 'none'));
        return;
    }

    // Если путь корректный, показываем описание и контент
    description.style.display = 'block';
    contents.forEach(content => (content.style.display = 'block'));
}

// Слушатель на изменение истории (назад/вперёд)
window.addEventListener('popstate', renderPage);

// Инициализация страницы при загрузке
renderPage();

// Логика раскрытия/сокрытия контента FAQ
headings.forEach(heading => {
    heading.addEventListener('click', function () {
        const contentId = this.getAttribute('data-id');
        const contentElement = document.getElementById(`content-${contentId}`);
        const arrow = this.querySelector('.arrow');

        contents.forEach((content, index) => {
            if (content !== contentElement) {
                content.style.maxHeight = '0';
                content.style.padding = '0 10px';
                arrows[index].classList.remove('up');
            }
        });

        if (contentElement.style.maxHeight && contentElement.style.maxHeight !== '0px') {
            contentElement.style.maxHeight = '0';
            contentElement.style.padding = '0 10px';
            arrow.classList.remove('up');
        } else {
            contentElement.style.maxHeight = contentElement.scrollHeight + 'px';
            contentElement.style.padding = '10px';
            arrow.classList.add('up');

            window.addEventListener('resize', () => {
                if (contentElement.style.maxHeight !== '0px') {
                    contentElement.style.maxHeight = contentElement.scrollHeight + 'px';
                }
            });
        }
    });
});
