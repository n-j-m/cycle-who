
const URL = "https://api.github.com/users";
const TOKEN = GITHUB_TOKEN;

export function model({ refreshClick$ }) {
  let randomOffset = Math.floor(Math.random() * 500);
  let headers = {};
  if (TOKEN) {
    headers["Authorization"] = `token ${TOKEN}`;
  }
  return {
    users$: refreshClick$
      .map(() => ({
        method: "GET",
        url: `${URL}?since=${randomOffset}`,
        headers
      }))
  };
}
