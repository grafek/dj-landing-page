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
