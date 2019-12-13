if(window.top!==window.self) {
  aCss = '                                \
  .p-workspace--context-pane-collapsed {  \
      grid-template-areas: "p-workspace__banner p-workspace__banner" "p-workspace__top_nav p-workspace__top_nav" "p-workspace__primary_view p-workspace__primary_view"; \
  }                                       \
                                          \
  .p-workspace__sidebar {                 \
      display: none !important;           \
  }                                       \
  ';

  let head = document.getElementsByTagName('head')[0];
  if (head) {
        let style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.textContent = aCss;
        head.appendChild(style);
  }
}
