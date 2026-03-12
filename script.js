const nav = document.querySelector('.navigation');
const mobileBox = document.querySelector('.mobile-box');
const copyright = document.querySelector('#copyright');

mobileBox.addEventListener('click', () =>{
	nav.classList.toggle('mobile-menu-open');
});

const currentDate = new Date().getFullYear();

window.addEventListener('load', () => {
  copyright.innerText = `Copyright ${currentDate} South Branch Trades.`;
});