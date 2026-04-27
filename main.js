const sleep = ms => new Promise(r => setTimeout(r, ms));

const routes = {
    "/": { title: "Home", render: 'home.html' },
    "/about": { title: "About", render: 'about.html' },
    "/contact": { title: "Contact", render: 'contact.html' },
};

function router() {
    let view = routes[location.pathname];

    if (view) {
        document.title = view.title;
        app.innerHTML = '<span class="loader"></span>';
        sleep(1000)
            .then(() => fetch(view.render))
            .then(r => r.text())
            .then(h => app.innerHTML = h)
            .catch(e => console.error(e));
    } else {
        history.replaceState("", "", "/");
        router();
    }
};

// Handle navigation
window.addEventListener("click", e => {
    if (e.target.dataset.link !== undefined) {
        e.preventDefault();
        history.pushState("", "", e.target.href);
        router();
    }
});

// Update router
window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);
