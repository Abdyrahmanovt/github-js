const favorites = document.getElementById('favorites')
const users = localStorageUtil.getUsers()


console.log(users)

users.forEach(item => {
    favorites.innerHTML += `
                    <div class="card-body col  d-flex p-4 align-items-center">
               <img src=${item.avatar} class="card-img-top"
                     style="width: 8rem;" alt="...">
                <div class="d-flex flex-column ms-5">
                    <h3 class="">${item.login}</h3>
                    <a href='#' class="text-dark">link to github</a>
                </div>
                <div class="d-flex flex-column align-items-end ms-auto">
                    <button type="button" class="btn btn-light bg-secondary mb-2" onclick="user.handleClick(this,${item.id},\'${item.avatar}\', \'${item.login}\',\'${item.url}\')">
                        <i class="fa-solid fa-star text-light bg-secondary"></i>
                    </button>
                    <button type="button" class="btn btn-dark text-white">Show repositories</button>
                </div>
            </div>
`
})
