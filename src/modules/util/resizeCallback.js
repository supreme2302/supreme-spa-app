export default () => {
  console.log('resizeCall');
  const elements = document.getElementsByClassName('my-hidden');
  if (window.innerWidth <= 960) {
    for (let i = 0; i < elements.length; ++i) {
      elements[i].style.display = 'none';
    }
  } else {
    for (let i = 0; i < elements.length; ++i) {
      elements[i].style.display = '';
    }
  }
};
