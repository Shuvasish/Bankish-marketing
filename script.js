'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//page navigaion

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  //old school
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
  //modern
  // section1.scrollIntoView({ behavior: 'smooth' });
});
//this is not efficient
// document.querySelectorAll('.nav__link').forEach(el =>
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     // console.log(document.querySelector(e.target.getAttribute('href')));
//     // console.log(this);
//     const id = this.getAttribute('href');
//     // console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     // console.log(e.target);
//   })
// );

//this is  efficient || EVENT DELEGATION

//1. add event listener to common parent
//2. determine element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target);
  e.preventDefault();
  //matching tech
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//tabed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //gurding
  if (!clicked) return;

  //remove classes from tabs
  tabs.forEach(t => {
    t.classList.remove('operations__tab--active');
  });

  //active tab
  clicked.classList.add('operations__tab--active');
  console.log(`operations__content--${clicked.dataset.tab}`);
  //remove classes from content
  tabContent.forEach(t => t.classList.remove('operations__content--active'));
  //active content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
  // console.log(clicked.dataset.tab);
});

// const tem = clicked.parentElement.children;
// console.log(tem);
// [...tem].forEach(e => {
//   if (e !== clicked) {
//     e.classList.remove('operations__tab--active');
//   }
// });
// // //event
// // const alerth1 = function () {
// //   alert('enter');
// //   h1.removeEventListener('mouseenter', alerth1);
// // };
// // const h1 = document.querySelector('h1');
// // h1.addEventListener('mouseenter', alerth1);

// // //bubbling

// // const randomInt = (min, max) =>
// //   Math.floor(Math.random() * (max - min + 1) + min);
// // const randomColor = () =>
// //   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
// // console.log(randomColor());

// // document.querySelector('.nav__link').addEventListener('click', function (e) {
// //   this.style.backgroundColor = randomColor();
// //   console.log('link', e.target, e.currentTarget);
// //   // e.stopPropagation();
// // });
// // document.querySelector('.nav__links').addEventListener('click', function (e) {
// //   this.style.backgroundColor = randomColor();
// //   console.log('links', e.target, e.currentTarget);
// //   // e.stopPropagation();
// // });

// // document.querySelector('.nav').addEventListener(
// //   'click',
// //   function (e) {
// //     this.style.backgroundColor = randomColor();
// //     console.log('nav', e.target, e.currentTarget);
// //     // e.stopPropagation();
// //   },
// //   false
// // );
// //dom traversing
// const h1 = document.querySelector('h1');
// console.log();
// console.log(h1.children);
// console.log(typeof [...h1.childNodes].forEach(e => console.log(e)));
// [...h1.children].forEach(e => (e.style.color = 'white'));
// // console.log(h1.firstElementChild);
// // console.log(h1.lastElementChild);
// // // const n = document.querySelector('.nav');
// // // console.log(n.childNodes);
// // // console.log(n.children);
// // h1.children.forEach(e => (e.style.color = 'white'));
// //going upwareds: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';
// h1.closest('h1').style.borderRadius = '100px';
// [...h1.parentElement.children].forEach(e => {
//   if (e !== h1) {
//     return (e.style.transform = 'scale(.711)');
//   }
// });
