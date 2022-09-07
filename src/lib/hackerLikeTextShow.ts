import $ from "jquery";

const delay = 80;

const mistakeProbability = 0.05;

const getRandomChar = () => (Math.random() + 1).toString(36).substring(7)[0];

export function hackerLikeTextShow(selector: string, text: string) {
  const element = $(selector);

  let position = 0;

  let isLastSymbolMistake = false;

  let currentString = "";

  let timeout = setTimeout(function write() {
    if (position >= text.length) {
      clearTimeout(timeout);
      return;
    }

    if (isLastSymbolMistake) {
      currentString = currentString.slice(0, -1);
      element.text(currentString);
      isLastSymbolMistake = false;

      timeout = setTimeout(write, Math.random() * delay * 2);
      return;
    }

    if (Math.random() <= mistakeProbability) {
      isLastSymbolMistake = true;
      currentString = currentString + getRandomChar();
      element.text(currentString);

      timeout = setTimeout(write, Math.random() * delay * 4);
      return;
    }

    currentString = currentString + text[position];
    element.text(currentString);
    position++;

    timeout = setTimeout(write, Math.random() * delay);
  }, delay);
}
