document.addEventListener("DOMContentLoaded", function () {


  /* VARIABLES */
  const list = document.querySelector('#list')
  const showPanelDiv = document.querySelector('#show-panel')
  const likeBtn = document.querySelector('#like-btn')

  const currentUser = {
    id: 1,
    username: 'pouros'
  }
  //This is hardcoded just to show functionality

  /* EVENT LISTENERS */

  list.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      showPanelFetch(event.target.dataset.id)
    }
  })

  /* FETCH REQUESTS */

  const bookListFetch = () => {
    fetch('http://localhost:3000/books')
      .then(resp => resp.json())
      .then(books => books.forEach(book => { renderBookList(book) })
      )
  }

  const showPanelFetch = (bookId) => {
    fetch(`http://localhost:3000/books/${bookId}`)
      .then(resp => resp.json())
      .then(book => renderShowPanel(book))
  }

  const likePatchFetch = (bookId, usersArray) => {
    fetch(`http://localhost:3000/books/${bookId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usersArray)
    })
    .then(resp => resp.json())
    .then(updatedBook => console.log(updatedBook))
  }


  /* RENDER FUNCTIONS */

  const renderBookList = (bookObj) => {
    const li = document.createElement('li')
    const br = document.createElement('br')
    li.dataset.id = bookObj.id
    li.textContent = bookObj.title
    list.append(li, br)
  }

  const renderShowPanel = (bookObj) => {
    showPanelDiv.innerHTML = ""
    
    const bookObject = bookObj
    const bookImg = document.createElement('img')
    const bookTitle = document.createElement('h2')
    const bookSubtitle = document.createElement('h4')
    const author = document.createElement('h4')
    const description = document.createElement('span')
    const userLikesUl = document.createElement('ul')
    const likeBtn = document.createElement('button')

    bookImg.src = bookObj.img_url
    bookTitle.textContent = bookObj.title
    bookSubtitle.textContent = bookObj.subtitle
    author.textContent = `By: ${bookObj.author}`
    description.textContent = bookObj.description
    userLikesUl.id = "liked-by"
    likeBtn.textContent = "LIKE"
    likeBtn.id = "like-btn"
    likeBtn.dataset.id = bookObj.id

    bookObj.users.forEach(user => {
      const userLi = document.createElement('li')
      userLi.textContent = user.username
      userLi.dataset.id = user.id
      userLikesUl.append(userLi)
    })

    showPanelDiv.append(bookImg, bookTitle, bookSubtitle,
      author, description, userLikesUl, likeBtn)

    likeBtn.addEventListener('click', () => {
      const bookId = likeBtn.dataset.id
      const userArray = bookObject.users
      debugger
      userArray.push(user)
      
      likePatchFetch(bookId, userArray)
    })
  }

  /* INITIALIZE */


  const initialize = () => {
    bookListFetch()
  }

  initialize()





















});
