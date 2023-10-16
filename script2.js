class Book {
    constructor (title, author, pages, read){
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    } 
    info() {
        return this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ' + (this.read? 'read' : 'not read yet')
    }
}

class Library {
    constructor(){
        this.books = []
    }
    addBook(newBook) { 
        if (!this.isInLibrary(newBook)) {
            this.books.push(newBook)
            updateGrid()
            console.log('book added')
        } else {
            console.log('the book already exists on the library')
        } 
    }
    isInLibrary(newBook){
        let IsItIn = false
        for (const book of library.books) {
            if (book.title==newBook.title){
                return true
            }
        }
        return false
    }
}

removeBook = (e) =>{
    let pos = parseInt(e.getAttribute('data-pos'))
    console.log(pos)
    library.books.splice(pos, 1)
    updateGrid()
}

toggleRead = (e) =>{
    
    if (library.books[parseInt(e.getAttribute('data-pos'))].read){
        library.books[parseInt(e.getAttribute('data-pos'))].read = false
        e.classList.remove('read')
        e.classList.add('not-read')
        e.textContent = 'Not read'
    } else{
        e.classList.add('read')
        e.classList.remove('not-read')
        library.books[parseInt(e.getAttribute('data-pos'))].read = true
        e.textContent = 'Read'
    }

    console.log(library.books)
}

const createBookCard = (book) => {
    const bookCard = document.createElement('div')
    const title = document.createElement('h1')
    const author = document.createElement('p')
    const pages = document.createElement('p')
    const buttonGroup = document.createElement('div')
    const readBtn = document.createElement('button')
    const removeBtn = document.createElement('button')
  
    bookCard.classList.add('book-card')
    buttonGroup.classList.add('button-group')
    readBtn.classList.add('btn')
    removeBtn.classList.add('rmv')
    pages.classList.add('pgs')
    removeBtn.classList.add('btn')
    readBtn.onclick = function (){
        toggleRead(this)
    }
    removeBtn.onclick = function () {
        removeBook(this)
    }
  
    title.textContent = `"${book.title}"`
    author.textContent = book.author
    pages.textContent = `${book.pages} pages`
    removeBtn.setAttribute ("data-pos", `${library.books.length-1}`)
    readBtn.setAttribute ("data-pos", `${library.books.length-1}`)
    removeBtn.textContent = 'Remove'
    
  
    if (book.read) {
      readBtn.textContent = 'Read'
      readBtn.classList.add('read')
    } else {
      readBtn.textContent = 'Not read'
      readBtn.classList.add('not-read')
    }
  
    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pages)
    buttonGroup.appendChild(readBtn)
    buttonGroup.appendChild(removeBtn)
    bookCard.appendChild(buttonGroup)
    booksGrid.appendChild(bookCard)
  }

  const updateGrid = () => {
    booksGrid.innerHTML = ''
    library.books.forEach(book => {
        createBookCard(book)
    });
  }

  const booksGrid = document.getElementById('booksGrid')
  const btnAdd = document.getElementById('btnAdd')
  const popup = document.querySelector('.popup')

  const library = new Library ()

  updateGrid()
  
  showPopup = () =>{
    popup.style.display = "block"
  }

  hidePopup = () =>{
    popup.style.display = "none"
  }

  const getBookFromInput = () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead = document.getElementById('isRead').checked
    return new Book(title, author, pages, isRead)
  }

submitForm =() => {
    const newBook = getBookFromInput()
    if (newBook.title != '' && newBook.author != '' && newBook.pages != ''){
        library.addBook(newBook)
        hidePopup()
        document.getElementById('title').value = ''
        document.getElementById('author').value = ''
        document.getElementById('pages').value = ''
        document.getElementById('isRead').checked = false
    }
    console.log(library)   
}