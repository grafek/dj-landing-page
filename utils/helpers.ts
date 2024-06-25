export function debounce(fn: Function, sleep = 200) {
  let timer: string | number | NodeJS.Timeout | undefined;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      fn();
    }, sleep);
  };
}

export function getDJingYears() {
  const currYear = new Date().getFullYear();
  const startDJingYear = new Date("6/6/2021").getFullYear();

  return currYear - startDJingYear;
}
