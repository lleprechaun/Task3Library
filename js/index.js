let books = [
    {
        title: 'Book number 1',
        content: 'sadfsadfasdfasdfasdasdfasdfasdfasdffds'
    },
    {
        title: 'Book number 2',
        content: 'aSWWQWEQEWQasdfasdfasdfasdffds'
    },
    {
        title: 'Book number 3',
        content: 'Разнообразный и богатый опыт укрепление и развитие структуры обеспечивает широкому кругу (специалистов) участие в формировании соответствующий условий активизации. Повседневная практика показывает, что сложившаяся структура организации влечет за собой процесс внедрения и модернизации дальнейших направлений развития. Повседневная практика показывает, что реализация намеченных плановых заданий позволяет оценить значение существенных финансовых и административных условий. Идейные соображения высшего порядка, а также начало повседневной работы по формированию позиции влечет за собой процесс внедрения и модернизации модели развития. С другой стороны постоянное информационно-пропагандистское обеспечение нашей деятельности в значительной степени обуславливает создание дальнейших направлений развития.'
            +
            '</br>' +
            'Задача организации, в особенности же рамки и место обучения кадров обеспечивает широкому кругу (специалистов) участие в формировании новых предложений. Разнообразный и богатый опыт новая модель организационной деятельности играет важную роль в формировании направлений прогрессивного развития. Товарищи! постоянное информационно-пропагандистское обеспечение нашей деятельности обеспечивает широкому кругу (специалистов) участие в формировании позиций, занимаемых участниками в отношении поставленных задач. Значимость этих проблем настолько очевидна, что консультация с широким активом обеспечивает широкому кругу (специалистов) участие в формировании систем массового участия.'
    },
    {
        title: 'Book number 4',
        content: 'sadfsadfasdfasdfasdasQWERTYUIOPfds'
    },
    {
        title: 'Book number 5',
        content: 'adfafdadafada'
    }
];
document.addEventListener("DOMContentLoaded", function() {
    let $parentSection = document.getElementsByClassName('favourite-books-content__books')[0];
    for (let i = books.length - 1; i >= 0; i--) {
        createSectBook(books[i].title, $parentSection);
    }
    $parentSection = document.getElementsByClassName('list-books-content__books')[0];
    for (let i = books.length - 1; i >= 0; i--) {
        createSectBook(books[i].title, $parentSection);
    }
});
function createSectBook(title, $parentSection){
    // создаем блок с книгой и функциональными кнопками
    let $section = document.createElement('div');
    $section.classList.add('flex', 'books-content-book');

    $parentSection.prepend($section);

    // добавляем заголовок книги
    let $nameBook = document.createElement('p');
    $nameBook.classList.add('p-name-book');
    $nameBook.innerHTML = `- ${title}`;
    $nameBook.addEventListener('click', function (e){
        openBook($nameBook)
    });
    $section.append($nameBook);

    // добавляем блок с функицональными кнопками
    let $divInput = document.createElement('div');
    $divInput.classList.add('flex', 'book__input');
    $section.append($divInput);

    // добавляем каждую кнопку
    let $inputFunc1 = document.createElement('input');
    $inputFunc1.classList.add('book__input-func');
    $inputFunc1.type = 'button';
    $inputFunc1.value = 'ред.';
    $inputFunc1.addEventListener('click', function (e){
        editBook($nameBook)
    });
    $divInput.append($inputFunc1);

    let $inputFunc2 = document.createElement('input');
    $inputFunc2.classList.add('book__input-func');
    $inputFunc2.type = 'button';
    $inputFunc2.value = 'прочитана';
    $inputFunc2.addEventListener('click', function (e){
        fullReadBook($inputFunc2)
    });
    $divInput.append($inputFunc2);

    let $inputFunc3 = document.createElement('input');
    $inputFunc3.classList.add('book__input-func');
    $inputFunc3.type = 'button';
    $inputFunc3.value = 'читать';
    $inputFunc3.addEventListener('click', function (e){
        openBook($nameBook)
    });
    $divInput.append($inputFunc3);

    let $inputFunc4 = document.createElement('input');
    $inputFunc4.classList.add('book__input-func');
    $inputFunc4.type = 'button';
    $inputFunc4.value = '  x  ';
    $inputFunc4.addEventListener('click', function (e){
        deleteBook($inputFunc4)
    });
    $divInput.append($inputFunc4);
}

// открытие содержимого книги
function openBook(elem) {
    // при переключении между книгами цвет предыдущего блока становится белым
    document.getElementsByClassName('editBook')[0].style.display = 'none';
    const allWhiteBack = document.getElementsByClassName('books-content-book');
    for (let i = 0; i < allWhiteBack.length; i++) {
        allWhiteBack[i].style.background = 'white';
    }
    // меняем цвет у блока с книгой
    elem.parentElement.style.background = '#E8DEDE';
    // ищем книгу в массиве
    elem = elem.innerHTML;
    const index = books.findIndex(e => e.title === elem.split('- ')[1]);
    // открываем ее содержимое
    document.getElementsByClassName('reading')[0].style.display = 'block';

    document.getElementsByClassName('reading__h')[0].style.display = 'block';
    document.getElementsByClassName('reading__h')[0].innerHTML = elem.split('- ')[1];

    document.getElementsByClassName('reading__book-content')[0].style.display = 'block';
    document.getElementsByClassName('reading__book-content')[0].innerHTML = books[index].content;
}

// удаление книги
function deleteBook(elem) {
    const index = books.findIndex(e => e.title === elem.parentElement.parentElement.firstElementChild.innerHTML.split('- ')[1]);
    books.splice(index,1);
    document.getElementsByClassName('reading__h')[0].innerHTML = '';
    document.getElementsByClassName('reading__book-content')[0].innerHTML = '';
    elem.parentElement.parentElement.remove();
}

//открытие кнопки для загрузки книги
function openInptUpload() {
    document.getElementsByClassName('upload-book__label-file')[0].style.display = 'block';
}

//загрузка книги
function uploadBook(elem) {
    document.getElementsByClassName('upload-book__span-file')[0].innerHTML = elem.files[0].name;
    console.log(elem.files[0]);


    let xhr = new XMLHttpRequest();

    let body = 'login=' + '' +
        '&file=' + elem.files[0];

    xhr.open('POST', 'https://apiinterns.osora.ru/', true);
    xhr.setRequestHeader('Content-Type', 'multipart/form-data');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if(xhr.status === 200) {
                // document.getElementsByClassName('reading__book-content')[0].innerHTML = xhr.responseText;
                console.log(xhr.responseText);
            }
        }
    }

    xhr.send(body);
}

// редактирование книги
function editBook(elem) {
    const allWhiteBack = document.getElementsByClassName('books-content-book');
    for (let i = 0; i < allWhiteBack.length; i++) {
        allWhiteBack[i].style.background = 'white';
    }
    elem.parentElement.style.background = '#E8DEDE';
    document.getElementsByClassName('reading')[0].style.display = 'block';
    document.getElementsByClassName('reading__h')[0].style.display = 'none';
    document.getElementsByClassName('reading__book-content')[0].style.display = 'none';

    document.getElementsByClassName('editBook')[0].style.display = 'flex';
    const index = books.findIndex(e => e.title === elem.innerHTML.split('- ')[1]);
    let $editH = document.getElementsByClassName('editBook__h')[0];
    $editH.value = books[index].title;

    let $editContent = document.getElementsByClassName('editBook__book-content')[0];
    $editContent.value = books[index].content;
}

// сохранение изменений в книге
function saveEdit() {
    let index;
    const $bookContent = document.getElementsByClassName('books-content-book')
    console.log(document.getElementsByClassName('books-content-book'))
    console.log(document.getElementsByClassName('editBook__h')[0].value)
    for (let i = 0; i < $bookContent.length; i++) {
        if ($bookContent[i].style.background === 'rgb(232, 222, 222)'){
            index = books.findIndex(e => e.title === $bookContent[i].firstElementChild.innerHTML.split('- ')[1]);
            books[index].title = document.getElementsByClassName('editBook__h')[0].value;
            books[index].content = document.getElementsByClassName('editBook__book-content')[0].value;
            $bookContent[i].firstElementChild.innerHTML = `- ${document.getElementsByClassName('editBook__h')[0].value}`;
        }
    }
}

//
function fullReadBook(elem) {
    elem.style.cursor = 'not-allowed';
    elem.value = 'прочитал';
    elem.style.color = 'rgba(0, 0, 0, 0.5)';
    elem.style.borderColor = 'rgba(0, 0, 0, 0.5)';
}
