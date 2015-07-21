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


function log(label) {
  return (thing) => {
    console.log(`${label}:`, thing);
    return thing;
  };
}

function main({ DOM, HTTP }) {
  let refresh$ = DOM.get(".refresh", "click");

  let requests$ = refresh$
    .startWith("click")
    .map(() => {
      let randomOffset = Math.floor(Math.random() * 500);
      let headers = {};
      console.log("token:", TOKEN);
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
    .flatMap(res =>
      Observable.range(0, 3)
        .map(() => Math.floor(Math.random() * res.body.length))
        .map(index => res.body[index])
    )
    .map(log("flatMapped"))
    .scan([], (users, currentUser) => {
      users.push(currentUser);
      console.log("users:", users);
      return users;
    });

  let userList$ = users$
    .map(log("user list"))
    .map(users => {
      console.log("render:", users);
      return h("div", [
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
            users === null ? "" : users.map((user, i) =>
              h("tr", [
                h("td", [
                  h("a.close", {href: "javascript:void(0)", "data-index": i}, "x")
                ]),
                h("td", [
                  h("img.img-responsive.img-circle", {
                    src: user.avatar_url,
                    style: {
                      width: "48px",
                      height: "48px"
                    }
                  })
                ]),
                h("td", user.login)
              ])
            )
          ])
        ])
      ]);
    });

  return {
    DOM: userList$,
    HTTP: requests$
  };
}

Cycle.run(main, {
  DOM: makeDOMDriver("#app"),
  HTTP: makeHTTPDriver()
});
