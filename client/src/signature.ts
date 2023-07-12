const min = document.getElementById("min");
const max = document.getElementById("max");
if (min !== null && max !== null) {
  const minInput = min as HTMLInputElement;
  const maxInput = max as HTMLInputElement;
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
