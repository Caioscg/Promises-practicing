
const routes = {
    "/": "/pages/home.html",
    "/about": "/pages/about.html",
    "/contact": "/pages/contact.html",
    404: "/pages/404.html"
}

function route(event) {
    event = event || window.event
    event.preventDefault() // nao redireciona ao clicar nos links

    window.history.pushState({}, "", event.target.href)  // adiciona o href do target que disparou o evento no histórico

    handle()
}

function handle() {
    const { pathname } = window.location // (desestruturando o protótipo)
    //  const pathname = window.location.pathname -> outra maneira de pegar o pathname

    const route = routes[pathname] || routes[404]

    fetch(route)
        .then(data => data.text())
        .then(html => {
            document.querySelector("#app").innerHTML = html
    })
    
}

handle()

window.onpopstate = () => handle()

window.route = () => route() // para disparar no html