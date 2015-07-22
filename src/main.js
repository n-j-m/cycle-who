/*eslint-disable no-unused-vars*/
import Cycle, { Rx } from "@cycle/core";
import { h, makeDOMDriver } from "@cycle/dom";
import { makeHTTPDriver } from "@cycle/http";

const { Observable } = Rx;
/*eslint-enable no-unused-vars*/

const URL = "https://api.github.com/users";
/*eslint-disable no-undef*/
const TOKEN = GITHUB_TOKEN;
/*eslint-enable no-undef*/

/*eslint-disable no-unused-vars*/
function log(label) {
  return (thing) => {
    console.log(`${label}:`, thing);
    return thing;
  };
}
/*eslint-enable no-unused-vars*/

function createSuggestion(closeClick$, users$) {
  return closeClick$
    .startWith("startup click")
    .combineLatest(
      users$,
      (click, users) => users[Math.floor(Math.random() * users.length)]
    );
}

function main({ DOM, HTTP }) {
  let refresh$ = DOM.get(".refresh", "click");

  let requests$ = refresh$
    .startWith("click")
    .map(() => {
      let randomOffset = Math.floor(Math.random() * 500);
      let headers = {};
      if (TOKEN) {
        headers.Authorization = `token ${TOKEN}`;
      }
      return {
        method: "GET",
        url: `${URL}?since=${randomOffset}`,
        headers
      };
    });

  let users$ = HTTP
    .filter(res$ => res$.request.url.indexOf(URL) === 0)
    .mergeAll()
    .map(res => res.body);

  let suggestion1$ = createSuggestion(DOM.get(".close1", "click"), users$);
  let suggestion2$ = createSuggestion(DOM.get(".close2", "click"), users$);
  let suggestion3$ = createSuggestion(DOM.get(".close3", "click"), users$);

  let userList$ = Observable
    .combineLatest(
      suggestion1$,
      suggestion2$,
      suggestion3$,
      (user1, user2, user3) => ({ user1, user2, user3 })
    )
    .map(({user1, user2, user3}) => h("div", [
        h("button.refresh.btn.btn-default", "Refresh"),
        h("table.table.table-hover", [
          h("thead", [
            h("tr", [
              h("th", "#"),
              h("th", "Img"),
              h("th", "Login")
            ])
          ]),
          h("tbody", [
            h("tr", [
              h("td", [
                h("a.close1", {href: "javascript:void(0)"}, "x")
              ]),
              h("td", [
                h("img.img-responsive.img-circle", {
                  src: user1.avatar_url,
                  style: {
                    width: "48px",
                    height: "48px"
                  }
                })
              ]),
              h("td", user1.login)
            ]),
            h("tr", [
              h("td", [
                h("a.close2", {href: "javascript:void(0)"}, "x")
              ]),
              h("td", [
                h("img.img-responsive.img-circle", {
                  src: user2.avatar_url,
                  style: {
                    width: "48px",
                    height: "48px"
                  }
                })
              ]),
              h("td", user2.login)
            ]),
            h("tr", [
              h("td", [
                h("a.close3", {href: "javascript:void(0)"}, "x")
              ]),
              h("td", [
                h("img.img-responsive.img-circle", {
                  src: user3.avatar_url,
                  style: {
                    width: "48px",
                    height: "48px"
                  }
                })
              ]),
              h("td", user3.login)
            ])
          ])
        ])
      ])
    );

  return {
    DOM: userList$,
    HTTP: requests$
  };
}

Cycle.run(main, {
  DOM: makeDOMDriver("#app"),
  HTTP: makeHTTPDriver()
});
