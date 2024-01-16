export const togglePreloader = (show, preloaderSelector) => {
  const preloader = document.querySelector(preloaderSelector);

  if (show) {
    preloader.style.display = 'inline-block';
  } else {
    preloader.style.display = 'none';
  }
}