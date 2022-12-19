var books = [
    {title: 'Book number 1', content: 'sadfsadfasdfasdfasdasdfasdfasdfasdffds'},
    {title: 'Book number 2', content: 'aSWWQWEQEWQasdfasdfasdfasdffds'},
    {title: 'Book number 3', content: 'Разнообразный и богатый опыт укрепление и развитие структуры обеспечивает широкому кругу (специалистов) участие в формировании соответствующий условий активизации. Повседневная практика показывает, что сложившаяся структура организации влечет за собой процесс внедрения и модернизации дальнейших направлений развития. Повседневная практика показывает, что реализация намеченных плановых заданий позволяет оценить значение существенных финансовых и административных условий. Идейные соображения высшего порядка, а также начало повседневной работы по формированию позиции влечет за собой процесс внедрения и модернизации модели развития. С другой стороны постоянное информационно-пропагандистское обеспечение нашей деятельности в значительной степени обуславливает создание дальнейших направлений развития.' +
            '</br>' +
            'Задача организации, в особенности же рамки и место обучения кадров обеспечивает широкому кругу (специалистов) участие в формировании новых предложений. Разнообразный и богатый опыт новая модель организационной деятельности играет важную роль в формировании направлений прогрессивного развития. Товарищи! постоянное информационно-пропагандистское обеспечение нашей деятельности обеспечивает широкому кругу (специалистов) участие в формировании позиций, занимаемых участниками в отношении поставленных задач. Значимость этих проблем настолько очевидна, что консультация с широким активом обеспечивает широкому кругу (специалистов) участие в формировании систем массового участия.'},
    {title: 'Book number 4', content: 'sadfsadfasdfasdfasdasQWERTYUIOPfds'}
];
document.addEventListener("DOMContentLoaded", function() {
    const countP = document.getElementsByClassName('p-name-book')
    let i = 0, j = 0;
    for (i; i < countP.length; i++) {
        if (countP[i].parentElement.parentElement.className === 'favourite-books-content') {
            countP[i].innerHTML = `- ${books[j].title}`;
            j++;
        } else {
            j = 0;
            break;
        }
    }
    for (i; i < countP.length; i++) {
        if (countP[i].parentElement.parentElement.className === 'list-books-content') {
            countP[i].innerHTML = `- ${books[j].title}`;
            j++;
        } else {
            break;
        }
    }
});
function openBook(elem) {
    // при переключении между книгами цвет предыдущего блока становится белым
    const allWhiteBack = document.getElementsByClassName('books-content-book');
    for (let i = 0; i < allWhiteBack.length; i++) {
        allWhiteBack[i].style.background = 'white';
    }
    // меняем цвет у блока с книгой
    elem.parentElement.style.background = '#E8DEDE';
    // ищем книгу в массиве
    elem = elem.innerHTML;
    const index = books.findIndex(e => e.title === elem.split('- ')[1]);
    // создаем тег p
    document.getElementsByClassName('reading__h')[0].innerHTML = elem.split('- ')[1];
    document.getElementsByClassName('reading__book-content')[0].innerHTML = books[index].content;
}
function deleteBook(elem) {
    const index = books.findIndex(e => e.title === elem.parentElement.parentElement.firstElementChild.innerHTML.split('- ')[1]);
    books.splice(index,1);
    document.getElementsByClassName('reading__h')[0].innerHTML = '';
    document.getElementsByClassName('reading__book-content')[0].innerHTML = '';
    elem.parentElement.parentElement.remove();
}
