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
  trigger: "section.s-developper",
  start: "bottom bottom",
  end: "+=100%",
  animation: uncover,
  scrub: true,
  markers: true,
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();
