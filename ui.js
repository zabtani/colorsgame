const mainContainer = document.getElementById('main-container');
const titleContainer = document.getElementById('title-container');
const sections = mainContainer.childNodes;
const startBtn = document.getElementById('start-btn');
const compliments = [
  'good memory!',
  'genius!',
  'champion!',
  'elephant!',
  'wooow!',
  'nice!',
  'amazing!',
];

const UI = {
  gameNotification: (type) => {
    let notification;
    switch (type) {
      case 'fail':
        notification = `<span class='red'><span class='big-letters'>wrong answer!</span><br><br> back to LVL ${LVL} </span>`;
        break;
      case 'success':
        notification = `<span class='green'><span class='big-letters'>good job!</span><br><br> press start for round ${LVL}</span> `;
        break;
      case 'welcome':
        notification =
          'welcome. please follow the color and recall which is where. start game when ready.';
    }
    mainContainer.innerHTML = notification;
  },

  lvlTitleView: () => {
    mainContainer.innerHTML = '';
    startBtn.style.display = 'none';
    titleContainer.innerHTML = `LVL ${LVL}`;
  },
  sectionRandomCompliment: (section) => {
    section.innerHTML = generateCompliment(compliments);
  },

  revealStartBtn: () => {
    titleContainer.innerHTML = '';
    titleContainer.appendChild(startBtn);
    startBtn.style.display = 'block';
  },
  createSectionAnswerBtn: (section, color) => {
    const colorBtn = document.createElement('button');
    colorBtn.setAttribute(`class`, `answer-cube`);
    colorBtn.style.backgroundColor = color;
    section.appendChild(colorBtn);
    return colorBtn;
  },

  createSection: (OptionalColor) => {
    const section = document.createElement('div');
    const sectionColor = OptionalColor;
    section.style.backgroundColor = sectionColor;
    mainContainer.appendChild(section);
  },
  hideSectionContent: (sectionContent) => {
    sectionContent.style.backgroundColor = 'transparent';
  },
};
