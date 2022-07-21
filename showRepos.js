class ShowRepos {
    render(cart) {
        const modalContent = document.querySelector('.modal-content')
        console.log(cart, 'msmsmsm')
        fetch(`https://api.github.com/users/${cart.login}/repos`)
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    modalContent.innerHTML += `
                            <div class="modal-box">
                                <div class="modal__text " >
                                    <h6 class="">${item.name}</h6>
                                    <a href=${item.html_url}>go to github</a>
                                </div>
                            </div>
                            
                    `

                })

            })

    }
}

const showRepos = new ShowRepos()
showRepos.render()
