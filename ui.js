const ui = {
  btnInErr: () => {
    startBtn.textContent = `please enter name`;
    startBtn.style.color = 'red';
  },
  btnOutErr: () => {
    startBtn.textContent = `start game!`;
    startBtn.style.color = 'white';
  },
  inRoundView: (coloredLevelTitle) => {
    btnsContainer.style.display = 'none';
    playerInput.style.display = 'none';
    mainContainer.innerHTML = '';
    titleContainer.innerHTML = coloredLevelTitle;
    titleContainer.style.color = 'black';
  },

  lostRoundView: (recoreds) => {
    btnsContainer.style.display = 'block';
    backBtn.style.display = 'block';
    startBtn.style.display = 'none';
    titleContainer.innerHTML = `LOST ROUND `;
    titleContainer.style.color = 'red';
    mainContainer.innerHTML = recoreds;
  },
  wonRoundView: () => {
    titleContainer.innerHTML = 'winner!';
    titleContainer.style.color = 'green';
    btnsContainer.style.display = 'block';
    mainContainer.innerHTML = `good job! press start for round ${engine.lvl}`;
  },
  welcomeView: () => {
    playerInput.style.display = 'block';
    startBtn.style.display = 'block';
    backBtn.style.display = 'none';
    mainContainer.innerHTML =
      'welcome. please follow the colors and recall which is where. start game when ready.';
  },
  changeGameNameColors: (coloredGameName) => {
    titleContainer.innerHTML = coloredGameName;
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
