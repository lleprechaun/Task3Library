let books = [
    {
        title: 'Book number 1',
        content: 'sadfsadfasdfasdfasdasdfasdfasdfasdffds',
        lastModifiedDate: 'Wed Dec 21 2022 15:21:53 GMT+0400 (Самарское стандартное время)',
        fullRead: false
    },
    {
        title: 'Book number 2',
        content: 'aSWWQWEQEWQasdfasdfasdfasdffds',
        lastModifiedDate: 'Wed Dec 20 2022 15:21:53 GMT+0400 (Самарское стандартное время)',
        fullRead: false
    },
    {
        title: 'Book number 3',
        content: 'Разнообразный и богатый опыт укрепление и развитие структуры обеспечивает широкому кругу (специалистов) участие в формировании соответствующий условий активизации. Повседневная практика показывает, что сложившаяся структура организации влечет за собой процесс внедрения и модернизации дальнейших направлений развития. Повседневная практика показывает, что реализация намеченных плановых заданий позволяет оценить значение существенных финансовых и административных условий. Идейные соображения высшего порядка, а также начало повседневной работы по формированию позиции влечет за собой процесс внедрения и модернизации модели развития. С другой стороны постоянное информационно-пропагандистское обеспечение нашей деятельности в значительной степени обуславливает создание дальнейших направлений развития.'
            +
            '</br>' +
            'Задача организации, в особенности же рамки и место обучения кадров обеспечивает широкому кругу (специалистов) участие в формировании новых предложений. Разнообразный и богатый опыт новая модель организационной деятельности играет важную роль в формировании направлений прогрессивного развития. Товарищи! постоянное информационно-пропагандистское обеспечение нашей деятельности обеспечивает широкому кругу (специалистов) участие в формировании позиций, занимаемых участниками в отношении поставленных задач. Значимость этих проблем настолько очевидна, что консультация с широким активом обеспечивает широкому кругу (специалистов) участие в формировании систем массового участия.',
        lastModifiedDate: 'Wed Dec 19 2022 15:00:53 GMT+0400 (Самарское стандартное время)',
        fullRead: false
    },
    {
        title: 'Book number 4',
        content: 'sadfsadfasdfasdfasdasQWERTYUIOPfds',
        lastModifiedDate: 'Wed Dec 21 2022 16:21:53 GMT+0400 (Самарское стандартное время)',
        fullRead: false
    },
    {
        title: 'Book number 5',
        content: 'adfafdadafada',
        lastModifiedDate: 'Wed Dec 21 2022 13:20:45 GMT+0400 (Самарское стандартное время)',
        fullRead: false
    }
];
let favBooks = [
    {
        title: 'Book number 1',
        content: 'sadfsadfasdfasdfasdasdfasdfasdfasdffds',
        lastModifiedDate: 'Wed Dec 21 2022 15:21:53 GMT+0400 (Самарское стандартное время)',
        fullRead: false
    },
    {
        title: 'Book number 2',
        content: 'aSWWQWEQEWQasdfasdfasdfasdffds',
        lastModifiedDate: 'Wed Dec 20 2022 15:21:53 GMT+0400 (Самарское стандартное время)',
        fullRead: false
    },
];
document.addEventListener("DOMContentLoaded", function() {
    // localStorage.setItem('books', JSON.stringify(books));
    // сортировка по времени добавления
    books.sort((a,b)=>new Date(a.lastModifiedDate)-new Date(b.lastModifiedDate));
    let $parentSection = document.getElementsByClassName('favourite-books-content__books')[0];
    for (let i = 0; i < favBooks.length; i++) {
        createSectBook(favBooks[i], $parentSection);
    }

    let lsFavBooks = JSON.parse(localStorage.getItem('favBooks')) || [];
    for (let i = 0; i < lsFavBooks.length; i++) {
        favBooks.push(lsFavBooks[i]);
        createSectBook(lsFavBooks[i], $parentSection);
    }

    $parentSection = document.getElementsByClassName('list-books-content__books')[0];
    for (let i = 0; i < books.length; i++) {
        createSectBook(books[i], $parentSection);
    }

    let lsBooks = JSON.parse(localStorage.getItem('books')) || [];
    for (let i = 0; i < lsBooks.length; i++) {
        books.push(lsBooks[i]);
        createSectBook(lsBooks[i], $parentSection);
    }
});
function createSectBook(book, $parentSection){
    // создаем блок с книгой и функциональными кнопками
    let $section = document.createElement('div');
    $section.classList.add('flex', 'books-content-book');

    $parentSection.prepend($section);

    // добавляем заголовок книги
    let $nameBook = document.createElement('p');
    $nameBook.classList.add('p-name-book');
    $nameBook.innerHTML = `- ${book.title || book.split('- ')[1]}`;
    $nameBook.addEventListener('click', function (e){
        openBook($nameBook)
    });
    if ($parentSection.className === 'list-books-content__books') {
        $nameBook.addEventListener('mousedown', function (e){
            dragManager($section, $nameBook)
        });
        $nameBook.addEventListener('dragstart', function (){
            return false
        });
    }
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
    if(book.fullRead) {
        $inputFunc2.style.cursor = 'not-allowed';
        $inputFunc2.value = 'прочитал';
        $inputFunc2.style.color = 'rgba(0, 0, 0, 0.5)';
        $inputFunc2.style.borderColor = 'rgba(0, 0, 0, 0.5)';
    }
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
        deleteBook($inputFunc4, $parentSection)
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
function deleteBook(elem, parent) {
    let index = books.findIndex(e => e.title === elem.parentElement.parentElement.firstElementChild.innerHTML.split('- ')[1]);
    books.splice(index,1);
    document.getElementsByClassName('reading__h')[0].innerHTML = '';
    document.getElementsByClassName('reading__book-content')[0].innerHTML = '';
    elem.parentElement.parentElement.remove();

    if (parent.className === 'list-books-content__books') {
        let localS = JSON.parse(localStorage.getItem('books'));
        index = localS.findIndex(e => e.title === elem.parentElement.parentElement.firstElementChild.innerHTML.split('- ')[1]);
        localS.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(localS));
    } else {
        let localS = JSON.parse(localStorage.getItem('favBooks'));
        index = localS.findIndex(e => e.title === elem.parentElement.parentElement.firstElementChild.innerHTML.split('- ')[1]);
        localS.splice(index, 1);
        localStorage.setItem('favBooks', JSON.stringify(localS));
    }
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

    var credentials = btoa("Dev:qdprivate");
    var auth = { "Authorization" : `Basic ${credentials}` };
    fetch("http://site.com/protected/", { headers : auth })
        .then((result) => {
            if (result.status !== 200) { throw new Error("Bad Server Response"); }
            return result.json();
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => { console.log(error); });
    let body = {
        login: 'Dev',
        file: elem.files[0]
    }
    let post = JSON.stringify(body);

    xhr.open('POST', 'https://apiinterns.osora.ru/', true);
    xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    // xhr.setRequestHeader('Authorization', 'http://site.com/protected/');

    xhr.send(post);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if(xhr.status === 200) {
                document.getElementsByClassName('reading__book-content')[0].innerHTML = xhr.responseText;
                console.log(xhr);
            }
        }
    }
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
    for (let i = 0; i < $bookContent.length; i++) {
        if ($bookContent[i].style.background === 'rgb(232, 222, 222)'){
            index = books.findIndex(e => e.title === $bookContent[i].firstElementChild.innerHTML.split('- ')[1]);
            books[index].title = document.getElementsByClassName('editBook__h')[0].value;

            books[index].content = document.getElementsByClassName('editBook__book-content')[0].value;
            $bookContent[i].firstElementChild.innerHTML = `- ${document.getElementsByClassName('editBook__h')[0].value}`;

            let localS = JSON.parse(localStorage.getItem('books'));
            index = localS.findIndex(e => e.title === $bookContent[i].firstElementChild.innerHTML.split('- ')[1]);
            localS[index].title = document.getElementsByClassName('editBook__h')[0].value;
            localS[index].content = document.getElementsByClassName('editBook__book-content')[0].value;
            localStorage.setItem('books', JSON.stringify(localS));

            localS = JSON.parse(localStorage.getItem('favBooks'));
            index = localS.findIndex(e => e.title === $bookContent[i].firstElementChild.innerHTML.split('- ')[1]);
            localS[index].title = document.getElementsByClassName('editBook__h')[0].value;
            localS[index].content = document.getElementsByClassName('editBook__book-content')[0].value;
            localStorage.setItem('favBooks', JSON.stringify(localS));
        }
    }
}

// отметка о прочитанной книге
function fullReadBook(elem) {
    elem.style.cursor = 'not-allowed';
    elem.value = 'прочитал';
    elem.style.color = 'rgba(0, 0, 0, 0.5)';
    elem.style.borderColor = 'rgba(0, 0, 0, 0.5)';
    let index = books.findIndex(e => e.title === elem.parentElement.parentElement.firstElementChild.innerHTML.split('- ')[1]);
    books[index].fullRead = true;

    let localS = JSON.parse(localStorage.getItem('books'));
    index = localS.findIndex(e => e.title === elem.parentElement.parentElement.firstElementChild.innerHTML.split('- ')[1]);
    localS[index].fullRead = true;
    localStorage.setItem('books', JSON.stringify(localS));

    localS = JSON.parse(localStorage.getItem('favBooks'));
    index = localS.findIndex(e => e.title === elem.parentElement.parentElement.firstElementChild.innerHTML.split('- ')[1]);
    localS[index].fullRead = true;
    localStorage.setItem('favBooks', JSON.stringify(localS));
}

function writeBook() {
    document.getElementsByClassName('upload-book__label-file')[0].style.display = 'none';
}
function saveWriteBook() {
    let header = document.getElementsByClassName('upload-book__input-book')[0].value;
    let content = document.getElementsByClassName('upload-book__textarea')[0].value;

    let object = {
        title: header,
        content: content,
        lastModifiedDate: new Date().toString(),
        fullRead: false
    };
    books.push(object);
    let localS = JSON.parse(localStorage.getItem('books')) || [];
    localS.push(object)
    localStorage.setItem('books', JSON.stringify(localS));

    header = null;
    content = null;
}





function dragManager($section, element) {

    let dragObject = {};

    let self = this; // для доступа к себе из обработчиков

    function onMouseDown(e) {
        if (e.which !== 1) return;

        let elem = e.target.closest('.p-name-book');
        if (!elem) return;

        dragObject.elem = elem;

        // запомним, что элемент нажат на текущих координатах pageX/pageY
        dragObject.downX = e.pageX;
        dragObject.downY = e.pageY;

        return false;
    }
    function onMouseMove(e) {
        if (!dragObject.elem) return; // элемент не зажат

        if (!dragObject.avatar) { // если перенос не начат...
            let moveX = e.pageX - dragObject.downX;
            let moveY = e.pageY - dragObject.downY;

            // если мышь передвинулась в нажатом состоянии недостаточно далеко
            if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
                return;
            }

            // начинаем перенос
            dragObject.avatar = createAvatar(e); // создать аватар
            if (!dragObject.avatar) { // отмена переноса, нельзя "захватить" за эту часть элемента
                dragObject = {};
                return;
            }

            // создать вспомогательные свойства shiftX/shiftY
            let coords = getCoords(dragObject.avatar);
            dragObject.shiftX = dragObject.downX - coords.left;
            dragObject.shiftY = dragObject.downY - coords.top;

            startDrag(e); // отобразить начало переноса
        }

        // отобразить перенос объекта при каждом движении мыши
        dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
        dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';

        return false;
    }
    function onMouseUp(e) {
        if (dragObject.avatar) { // если перенос идет
            finishDrag(e);
        }

        // перенос либо не начинался, либо завершился
        // в любом случае очистим "состояние переноса" dragObject
        dragObject = {};
    }
    function finishDrag(e) {
        let dropElem = findDroppable(e);

        if (!dropElem) {
            dropElem.style.background = '#F1F0F0';
            self.onDragCancel(dragObject);
        } else {
            self.onDragEnd(dragObject, dropElem);
        }
    }
    function createAvatar(e) {

        // запомнить старые свойства, чтобы вернуться к ним при отмене переноса
        let avatar = dragObject.elem;
        let old = {
            parent: avatar.parentNode,
            nextSibling: avatar.nextSibling,
            position: avatar.position || '',
            left: avatar.left || '',
            top: avatar.top || '',
            zIndex: avatar.zIndex || ''
        };

        // функция для отмены переноса
        avatar.rollback = function() {
            old.parent.insertBefore(avatar, old.nextSibling);
            avatar.style.position = old.position;
            avatar.style.left = old.left;
            avatar.style.top = old.top;
            avatar.style.zIndex = old.zIndex
        };

        return avatar;
    }
    function startDrag(e) {
        let avatar = dragObject.avatar;
        document.getElementsByClassName('dropzone')[0].style.background = '#E8DEDE';

        let $nameBook = document.createElement('p');
        $nameBook.classList.add('p-name-book');
        $nameBook.innerHTML = element.innerHTML;
        $section.prepend($nameBook);
        // инициировать начало переноса

        avatar.style.zIndex = '9999';
        avatar.style.position = 'absolute';
    }
    function findDroppable(event) {
        // спрячем переносимый элемент
        dragObject.avatar.hidden = true;

        // получить самый вложенный элемент под курсором мыши
        let elem = document.elementFromPoint(event.clientX, event.clientY);

        // показать переносимый элемент обратно
        dragObject.avatar.hidden = false;

        if (elem === null) {
            // такое возможно, если курсор мыши "вылетел" за границу окна
            return null;
        }

        return elem.closest('.dropzone');
    }

    document.onmousedown = onMouseDown;
    document.onmousemove = onMouseMove;
    document.onmouseup = onMouseUp;

    this.onDragEnd = function(dragObject, dropElem) {
        dropElem.style.background = '#F1F0F0';
        let $parentSection = document.getElementsByClassName('favourite-books-content__books')[0];
        createSectBook(dragObject.avatar.innerHTML, $parentSection);
        $section.removeChild(element);

        let index = books.findIndex(i => i.title === element.innerHTML.split('- ')[1]);
        favBooks.push(books[index]);
        let localS = JSON.parse(localStorage.getItem('favBooks')) || [];
        localS.push(books[index]);
        localStorage.setItem('favBooks', JSON.stringify(localS));
    };
    this.onDragCancel = function(dragObject) {
        dragObject.avatar.rollback();
    };
}
function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };

}
