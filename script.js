
//header & footer fetch
async function loadComponent(selector, file) {
    const res = await fetch(file);
    const html = await res.text();
    document.querySelector(selector).innerHTML = html;
}

await loadComponent('#header', '/partials/header.html');
await loadComponent('#footer', '/partials/footer.html');


//mobile navigation click, add date to copyright
const nav = document.querySelector('.navigation');
const mobileBox = document.querySelector('.mobile-box');

mobileBox.addEventListener('click', () =>{
	nav.classList.toggle('mobile-menu-open');
});

const copyright = document.querySelector('#copyright');
const currentDate = new Date().getFullYear();

window.addEventListener('load', () => {
  copyright.innerText = `Copyright ${currentDate} South Branch Trades.`;
});