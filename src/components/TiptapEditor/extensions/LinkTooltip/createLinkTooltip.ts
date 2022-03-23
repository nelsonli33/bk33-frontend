import tippy, { createSingleton } from "tippy.js";

export function createLinkTooltip() {
  tippy(".js-link-tooltip", {
    delay: 100,
    duration: 200,
    content: (reference) =>
      `<a href=${reference.getAttribute(
        "href"
      )} target='_blank'>${reference.getAttribute("href")}</a>`,
    interactive: true,
    interactiveBorder: 25,
    placement: "bottom",
    appendTo: document.body,
    offset: [0, 10],
    allowHTML: true,

    theme: "link",
  });
}
