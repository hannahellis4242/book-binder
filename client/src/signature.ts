const [min, max] = ["min", "max"].map((x) => document.getElementById(x));
if (min !== null && max !== null) {
  const [minInput, maxInput] = [min, max].map((x) => x as HTMLInputElement);
  if (minInput !== null && minInput !== null) {
    minInput.addEventListener("change", (ev: Event) => {
      ev.preventDefault();
      maxInput.min = minInput.value;
      const minNum = Number.parseInt(minInput.value);
      const maxNum = Number.parseInt(maxInput.value);
      if (minNum > maxNum) {
        maxInput.value = minInput.value;
      }
    });
  }
}
const options = [3, 4, 5, 6]
  .map((x) => x.toString())
  .map((x) => document.getElementById(x))
  .filter((x) => x !== null)
  .map((x) => x as HTMLInputElement)
  .filter((x) => x !== null);

const numberOfOptionsSelected = () =>
  options
    .map((x) => x.checked)
    .map((x) => (x ? 1 : 0))
    .reduce<number>((x, y) => x + y, 0);

if (options.length > 0 && numberOfOptionsSelected() === 0) {
  options[0].checked = true;
}

options.forEach((option) =>
  option.addEventListener("change", (ev: Event) => {
    ev.preventDefault();
    if (numberOfOptionsSelected() === 0) {
      options[0].checked = true;
    }
  })
);
