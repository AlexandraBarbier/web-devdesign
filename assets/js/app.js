const locoScroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  smartphone: {
    smooth: true,
  },
});
///

///
window.addEventListener("load", function () {
  let revealText = document.querySelectorAll(".reveal-text");
  let results = Splitting({ target: revealText, by: "lines" });

  results.forEach((splitResult) => {
    const wrappedLines = splitResult.lines
      .map(
        (wordsArr) => `
            <span class="line"><div class="words">
              ${wordsArr
                .map(
                  (word) => `${word.outerHTML}<span class="whitespace"> 
             </span>`
                )
                .join("")}
            </div></span>`
      )
      .join("");
    splitResult.el.innerHTML = wrappedLines;
  });

  gsap.registerPlugin(ScrollTrigger);
  let revealLines = revealText.forEach((element) => {
    const lines = element.querySelectorAll(".line .words");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        toggleActions: "restart none none reset",
      },
    });
    tl.set(revealText, { autoAlpha: 1 });
    tl.from(lines, 1, {
      yPercent: 100,
      ease: Power3.out,
      stagger: 0.25,
      delay: 0.2,
    });
  });
});

///

locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".container", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },

  pinType: document.querySelector(".container").style.transform
    ? "transform"
    : "fixed",
});

ScrollTrigger.defaults({ scroller: ".container" });

gsap.set("section.footer-container", { yPercent: -50 });

const uncover = gsap.timeline({ paused: true });

uncover.to("section.footer-container", { yPercent: 0, ease: "none" });

ScrollTrigger.create({
  trigger: "section.s-graphic",
  start: "bottom bottom",
  end: "+=100%",
  animation: uncover,
  scrub: true,
  markers: false,
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();

///

// CONTACT LINK HOVER EFFECT
const spanContainers = document.querySelectorAll(".menu div, .hover--link div");
spanContainers.forEach((item) => {
  const letters = item.children[0].textContent.split("");
  item.innerHTML = "";

  letters.forEach((el, index) => {
    item.innerHTML += `<span style="transition-delay:${
      0.07 * index
    }s">${el}</span>`;
  });
});

/// menu open function

const tl = gsap.timeline({
  paused: "true",
});

tl.to(".menu-container", {
  duration: 1,
  x: 0,
});
tl.from(
  ".menu-close",
  {
    opacity: 0,
    rotate: "180deg",
  },
  "-=.2"
);
tl.from(
  ".line",
  {
    duration: 1,
    stagger: {
      amount: 0.5,
    },
    width: "0%",
  },
  "-=.2"
);
tl.from(
  ".menu-item-number",
  {
    duration: 1,
    stagger: {
      amount: 0.5,
    },
    y: 100,
  },
  "-=1.5"
);
tl.from(
  ".menu-item-name",
  {
    duration: 1,
    stagger: {
      amount: 0.5,
    },
    y: 100,
  },
  "-=1.3"
);
tl.from(
  ".menu-item-sub",
  {
    duration: 1,
    stagger: {
      amount: 0.5,
    },
    y: 100,
  },
  "-=1.1"
);
tl.from(
  ".menu-item-icon",
  {
    duration: 1,
    stagger: {
      amount: 0.5,
    },
    y: 100,
  },
  "-=1"
);
function menuOpen() {
  tl.play();
}
function menuClose() {
  tl.reverse();
}
