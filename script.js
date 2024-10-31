const headings = document.querySelectorAll('.heading');
const contents = document.querySelectorAll('.content');
const arrows = document.querySelectorAll('.arrow');

headings.forEach(heading => {
    heading.addEventListener('click', function() {
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