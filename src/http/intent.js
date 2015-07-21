
export function intent(DOM) {
  return {
    refreshClick$: DOM.get(".refresh", "click")
  };
}
