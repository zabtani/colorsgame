const ui = {
  inRoundView: (coloredLevelTitle) => {
    mainContainer.innerHTML = '';
    btnsContainer.style.display = 'none';
    titleContainer.innerHTML = coloredLevelTitle;
    titleContainer.style.color = 'black';
  },

  lostRoundView: () => {
    titleContainer.innerHTML = `LOST ROUND `;
    titleContainer.style.color = 'red';
    btnsContainer.style.display = 'none';
    mainContainer.innerHTML = `wrong answer! back to lvl ${engine.lvl}`;
  },
  wonRoundView: () => {
    titleContainer.innerHTML = 'winner!';
    titleContainer.style.color = 'green';
    btnsContainer.style.display = 'block';
    mainContainer.innerHTML = `good job! press start for round ${engine.lvl}`;
  },
  changeGameNameColors: (coloredGameName) => {
    titleContainer.innerHTML = coloredGameName;
  },
  welcomeView: () => {
    mainContainer.innerHTML =
      'welcome. please follow the colors and recall which is where. start game when ready.';
  },
  createSection: (randomColor) => {
    let section = document.createElement('div');
    section.classList.add('animated');
    section.classList.add('section');
    section.style.backgroundColor = randomColor;
    mainContainer.appendChild(section);
  },

  createSectionOptionBtn: (section, OptionalColor) => {
    const colorBtn = document.createElement('button');
    colorBtn.classList.add('answer-cube');

    colorBtn.style.backgroundColor = OptionalColor;
    section.appendChild(colorBtn);
    return colorBtn;
  },

  hideSectionColor: (section) => {
    section.classList.remove('animated');
    section.style.backgroundColor = 'transparent';
  },
  sectionSolved: (compliment, section) => {
    section.innerHTML = compliment;
  },
};
