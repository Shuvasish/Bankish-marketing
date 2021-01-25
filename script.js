'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

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
  //remove classes from content
  tabContent.forEach(t => t.classList.remove('operations__content--active'));
  //active content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
  // console.log(clicked.dataset.tab);
});

//menu fade animations
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    // console.log(siblings);
    siblings.forEach(el => {
      if (el !== link) {
        // console.log(el);
        // console.log(e);
        // console.log(this);
        el.style.opacity = this;
      }
    });
    // logo.style.opacity = e;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//sticky navbar

//recommended way
// console.log(document.querySelector('.nav').getBoundingClientRect().height);
// console.log(nav.getBoundingClientRect().height);
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);
const obsCallback = function (entries) {
  const [entry] = entries;
  // console.log();
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
    // console.log(nav.getBoundingClientRect().height);
  } else if (entry.isIntersecting) {
    nav.classList.remove('sticky');
  }
};
const headerObserver = new IntersectionObserver(obsCallback, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//revealing sections on scroll
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry.target.classList);

  if (!entry.isIntersecting) return;
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);
const loadImg = function (entires, observer) {
  const [entry] = entires;
  // console.log(entry);
  if (!entry.isIntersecting) return;

  //replace src with data-src

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);

  // console.log(entry.target.dataset.src);
  // console.log(entry.target.getAttribute('src'));
  // entry.target.getAttribute('src').replace(entry.target.dataset.src);
  // console.log(
  //   entry.target.getAttribute('src').replace(entry.target.dataset.src)
  // );
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//Slider

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const slider = document.querySelector('.slider');
  let curSlide = 0;
  const maxSlide = slides.length;
  const dotContainer = document.querySelector('.dots');
  // slider.style.transform = 'scale(0.4) translateX(-800px) ';
  // slider.style.overflow = 'visible';
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button> `
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
    // console.log(document.querySelector(`.dots__dot[data-slide="${slide}"]`));
  };
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  //next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  //previous slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    // console.log(e.keyCode);
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  //event handlers

  //initialization
  dotContainer.addEventListener('click', function (e) {
    // console.log(e.target);
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      curSlide = slide;
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
  const init = function () {
    goToSlide(curSlide);
    createDots();
    activateDot(curSlide);
  };
  init();
};
slider();

//not recommended way

// const initialCords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function (e) {
//   // console.log(
//   //   document.querySelector('#section--1').getBoundingClientRect().top +
//   //     window.pageYOffset
//   // );
//   // console.log(window.scrollY);

//   console.log(initialCords.top + window.pageYOffset);
//   console.log(window.scrollY);
//   if (window.scrollY >= initialCords.top) {
//     console.log('enter');
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });
/////////////////////
/////////////////////
/////////////////////

//my way
// const tar = document.querySelector('.nav');
// tar.addEventListener('mouseover', function (e) {
//   //   console.log(e.target);
//   //   console.log(e.target.closest('.nav').children);
//   [...e.target.closest('.nav').children].forEach(el => {
//     console.log(el);
//     console.log(e.target.closest('.nav').children);
//     [...e.target.closest('.nav').children].forEach(c => {
//       console.log(el === c);
//       if (c !== el) {
//         c.style.opacity = 0.5;
//       } else {
//         console.log(c);
//         // c.style.opacity = 1;
//       }
//     });
//     console.log(el === e.target.closest('.nav').children);
//   });
// });
// e.target.style.opacity = 1;

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

//intersectionObserver
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => console.log(entry));
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);
