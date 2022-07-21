class User {
    constructor() {
        this.classname = 'btn__color--active'
    }

    handleClick(element, id, avatar, login, url) {
        const followers = {
            id,
            avatar,
            login,
            url
        }

        const {pushUsers} = localStorageUtil.putUsers(followers)
        if (pushUsers) {
            element.classList.add(this.classname)
        } else {
            element.classList.remove(this.classname)
        }
    }


    hideModal() {
        const closeModal = document.querySelector('.close-btn')

        closeModal.addEventListener('click', () => {
            showModal.style.opacity = '0'
            showModal.style.visibility = 'hidden'
        })
    }


    showRepositories(id, avatar, login, url) {
        const cart = {
            id, avatar, login, url
        }
        showRepos.render(cart)

        const showModal = document.querySelector('.modal')
        showModal.style.opacity = '1'
        showModal.style.visibility = 'visible'


    }
    hideModal() {
        const closeModal = document.querySelector('.close-btn')
        closeModal.addEventListener('click', () => {
            const showModal = document.querySelector('.modal')
            showModal.style.opacity = '0'
            showModal.style.visibility = 'hidden'
        })
    }

    render() {
        const inputSearch = document.querySelector(".input-search")
        const userCard = document.getElementById('user-card')
        const sortClass = document.querySelector('.sort-class')
        const orderClass = document.querySelector('.order-class')
        const perPage = document.querySelector('.per-page')
        const paginationInput = document.querySelector('.pagination-input')
        const prevPageBtn = document.querySelector('.prev-page')
        const nextPageBtn = document.querySelector('.next-page')
        const usersStore = localStorageUtil.getUsers()

        const obj = {
            name: '',
            sort: 'followers',
            order: 'asc',
            perPage: '5',
            page: '1'

        }
        console.log(obj)
        const sortItems = (el) => {
            obj.sort = el
        }
        const orderItems = (el) => {
            obj.order = el
        }
        const perPageItems = (el) => {
            obj.perPage = el
        }
        const nameItems = (el) => {
            obj.name = el
        }
        const paginPage = (el) => {
            obj.page = el
        }
        const addPrev = () => {
            obj.page = obj.page > 1 ? obj.page - 1 : obj.page
        }
        const addNext = () => {
            obj.page = obj.page + 1
        }


        const searchUsers = () => {
            fetch(`https://api.github.com/search/users?q=${obj.name}&sort=${obj.sort}&order=${obj.order}&per_page=${obj.perPage}&page=${obj.page}`)
                .then(response => {
                    console.log(response)
                    if (!response.ok) {
                        throw Error('error')
                    } else {
                        return response.json()
                    }

                })
                .then((data) => {
                    console.log(data)
                    const resultsUser = data.items
                    render(resultsUser)
                })


            const render = (result) => {
                userCard.innerHTML = ''
                result.forEach(item => {
                    let activeClass = '';
                    const findIndex = usersStore.find(el => el.id === item.id)

                    if (findIndex) {
                        activeClass = 'btn__color--active';
                    } else {
                        activeClass = ''
                    }
                    userCard.innerHTML += `
        <div class="card mt-2 row" >
                <div class="card-body col  d-flex p-4 align-items-center" >
                <img src=${item.avatar_url} class="card-img-top"
                     style="width: 8rem;" alt="...">
                <div class="d-flex flex-column ms-5">
                    <h3 class="">${item.login}</h3>
                    <a href=${item.html_url} class="text-dark">link to github</a>
                </div>
                <div class="d-flex flex-column align-items-end ms-auto">
                    <button type="button" class="btn-color ${activeClass}   mb-2 " onclick="user.handleClick(this,${item.id},\'${item.avatar_url}\', \'${item.login}\',\'${item.html_url}\')">
                        <i class="fa-solid fa-star text-light bg-secondary " ></i>
                    </button>
                    <a href="#modal-one"  type="button" class="btn btn-dark text-white ">
                    <button  onclick="user.showRepositories(${item.id}, \'${item.avatar_url}', \'${item.login}\',\'${item.html_url}\',\'${item.url}\')">Show repositories</button></a>
                                                    </div>
                            </div>
                         </div> 
                </div >`
                })
            }
        }


        let timeOutToken = 0
        window.onload = () => {
            sortClass.addEventListener('change', () => {
                sortItems(sortClass.value)
                searchUsers()
            })
            orderClass.addEventListener('change', () => {
                orderItems(orderClass.value)
                searchUsers()
            })
            perPage.addEventListener('change', () => {
                perPageItems(perPage.value)
                searchUsers()
            })
            paginationInput.addEventListener('change', () => {
                paginPage(paginationInput.value)
                searchUsers()
            })
            prevPageBtn.addEventListener('click', () => {
                addPrev()
                searchUsers()
            })
            nextPageBtn.addEventListener('click', () => {
                addNext()
                searchUsers()
            })
            inputSearch.onkeyup = (event) => {
                clearTimeout(timeOutToken)
                timeOutToken = setTimeout(() => {
                    nameItems(inputSearch.value)
                    searchUsers()

                }, 500)
                console.log(inputSearch.value)
            }
        }


    }
}

const user = new User()

user.render()