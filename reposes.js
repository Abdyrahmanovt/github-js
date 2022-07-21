
class Reposes {

    render(){
        const showRepository = document.getElementById('show-repos')
        const login = showRepos.render();
        console.log(login, 'dkdkdkdk')
        fetch(`https://api.github.com/users/${login}/repos`)
            .then(response => response.json())
            .then(data =>
                data.forEach(item => {
                        showRepository.innerHTML +=
                            `
                       <div class="">
                            <p>${item.name}</p>
                            <a href=${item.html_url} target="_blank">go to github</a>
                        </div>`
                    }
                )
            )
    }

}

const reposes = new Reposes();
reposes.render();
