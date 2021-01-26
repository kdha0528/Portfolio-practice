'use strict';

//Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar__dark');
        navMenu.classList.remove('show');
    } else {
        navbar.classList.remove('navbar__dark');
    }
});

// Handle scrolling when tapping on the navbar menu.
const navbarMenu = document.querySelector('.navbar__menu');
let selectedNavItem;
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    }
    navMenu.classList.remove('show');
    scrollIntoView(link);
});

const navLogo = document.querySelector('.navbar__logo');
navLogo.addEventListener('click', () => {
    scrollIntoView('#home');
});

//Make home slowlu fade to transparent as the window scrolls down.
window.addEventListener('scroll', scrollingFadeIn);

//dhow "arrow up" button when scrolling down
const arrow = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        arrow.classList.add('arrow-up__visible');
    } else {
        arrow.classList.remove('arrow-up__visible');
    }
});

//Handle click on the "arrow up" button
arrow.addEventListener('click', () => {
    scrollIntoView('#home');
});

//Project image and next-buttonm previous-button.
const img = document.querySelectorAll('.project__img');
const right = document.querySelector('.project__rightBtn');
const left = document.querySelector('.project__leftBtn');
const first = 0;
var index = 0;
right.addEventListener('click', () => {
    img[index].classList.add('anime-out');
    setTimeout(() => {
        if (index == img.length - 1) {
            img[index].classList.remove('project__visible');
            index = 0;
            img[index].classList.remove('project__invisible');
            img[img.length - 1].classList.remove('anime-out');
        } else if (index == 0) {
            img[index].classList.add('project__invisible');
            index++;
            img[index].classList.add('project__visible');
            img[0].classList.remove('anime-out');
        } else {
            img[index].classList.remove('project__visible');
            index++;
            img[index].classList.add('project__visible');
            img[index - 1].classList.remove('anime-out');
        }
    }, 300);
});
left.addEventListener('click', () => {
    img[index].classList.add('anime-in');
    setTimeout(() => {
        if (index == 0) {
            img[index].classList.add('project__invisible');
            index = img.length - 1;
            img[index].classList.add('project__visible');
            img[0].classList.remove('anime-in');
        } else if (index == 1) {
            img[index].classList.remove('project__visible');
            index--;
            img[index].classList.remove('project__invisible');
            img[1].classList.remove('anime-in');
        } else {
            img[index].classList.remove('project__visible');
            index--;
            img[index].classList.add('project__visible');
            img[index + 1].classList.remove('anime-in');
        }
    }, 300);
});

//navbar toggle button for small screen
const menuBtn = document.querySelector('.navbar__toggle-btn');
const navMenu = document.querySelector('.navbar__menu');
menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

//make animation at the navbar when scrolling the page
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.navbar__menu__item');
var sectionIds = [];
navItems.forEach((element) => {
    sectionIds.push(element.dataset.link);
});
console.log(sectionIds);

const options = {
    threshold: 0.3,
};

const observerCallback = (entries) => {
    //solution1
    document.addEventListener('wheel', () => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navItems.forEach((item) => {
                    if (document.querySelector(item.dataset.link) == entry.target) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            } else {
                navItems.forEach((item) => {
                    if (document.querySelector(item.dataset.link) == entry.target) {
                        item.classList.remove('active');
                    }
                });
            }
        });
    });
};

const observer = new IntersectionObserver(observerCallback, options);

sections.forEach((section) => observer.observe(section));

//-----------function-----------

function scrollingFadeIn() {
    document.querySelectorAll('.section').forEach((item) => {
        let bottom = item.getBoundingClientRect().bottom;
        console.log(bottom);
        if (bottom <= window.innerHeight / 2) {
            item.style.opacity = bottom / (window.innerHeight / 2);
        } else {
            item.style.opacity = 1;
        }
    });
}

function selectNavItem(selected) {
    if (selectedNavItem != null) {
        selectedNavItem.classList.remove('active');
    }
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}
