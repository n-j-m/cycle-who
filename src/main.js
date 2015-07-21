import Cycle, { Rx } from "@cycle/core";
import { h, makeDOMDriver } from "@cycle/dom";

const { Observable } = Rx;

function main() {
  return {
    DOM: Observable.just(false)
      .map(() =>
        h("div.jumbotron",
          h("h1", "Hello!")
        )
      )
  };
}

Cycle.run(main, {
  DOM: makeDOMDriver("#app")
});
