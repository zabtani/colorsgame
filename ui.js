const mainContainer = document.getElementById('main-container');
const titleContainer = document.getElementById('title-container');
const sections = mainContainer.childNodes;
const startBtn = document.getElementById('start-btn');

const UI = {
  wrongMSG: () => {
    mainContainer.innerHTML = `wrong answer! back to LVL ${LVL}`;
  },
  successMSG: () => {
    mainContainer.innerHTML = `good job! press start for round ${LVL}`;
  },

  welcomeMSG: () => {
    mainContainer.innerHTML =
      'welcome. please follow the colors and recall which is where. start game when ready.';
  },

  titleOnLvl: () => {
    mainContainer.innerHTML = '';
    startBtn.style.display = 'none';
    titleContainer.innerHTML = `LVL ${LVL}`;
  },
  titleOnStart: () => {
    titleContainer.innerHTML = '';
    titleContainer.appendChild(startBtn);
    startBtn.style.display = 'block';
  },
  sectionSolved: (compliment, section) => {
    section.innerHTML = compliment;
  },

  createSectionOptionBtn: (section, OptionalColor) => {
    const colorBtn = document.createElement('button');
    colorBtn.setAttribute(`class`, `answer-cube`);
    colorBtn.style.backgroundColor = OptionalColor;
    section.appendChild(colorBtn);
    return colorBtn;
  },

  createSection: (randomColor) => {
    const section = document.createElement('div');
    section.style.backgroundColor = randomColor;
    mainContainer.appendChild(section);
  },
  hideSectionColor: (section) => {
    section.style.backgroundColor = 'transparent';
  },
};
