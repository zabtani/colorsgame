//GLOBALS
const mainContainer = document.getElementById('main-container');
const titleContainer = document.getElementById('title-container');
const btnsContainer = document.getElementById('btns-container');
const sections = document.getElementsByClassName('section');
const startBtn = document.getElementById('start-btn');
const GAME_NAME = 'colors game';
const LVL_TITLE = `Level `;
const OPTIONAL_COLORS = ['black', 'blue', 'red', 'green', 'yellow'];
const COMPLIMENTS = [
  'good memory!',
  'genius!',
  'champion!',
  'elephant!',
  'wooow!',
  'nice!',
  'amazing!',
  'pro!',
];

//GAME engine
const engine = {
  game_name: GAME_NAME,
  lvl_title: LVL_TITLE,
  optional_colors: OPTIONAL_COLORS,
  commpliments: COMPLIMENTS,
  gameNameInterval: '',
  lvl_unsolved: 0,
  lvl: 1,
  just_entered: true,
  randomInt: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  randomColor: () => {
    return engine.optional_colors[
      engine.randomInt(0, engine.optional_colors.length - 1)
    ];
  },
  colorString: (string) => {
    let coloredName = '';
    let lastCharColor = '';
    for (i = 0; i <= string.length; i++) {
      let randColor = engine.randomColor();
      if (randColor === lastCharColor) {
        i--;
      } else {
        let charColor = randColor;
        let char = string.charAt(i);
        coloredName += `<span style="color:${charColor}">${char}</span>`;
        lastCharColor = randColor;
      }
    }
    return coloredName;
  },
  welcome: () => {
    startBtn.addEventListener('click', engine.startRound);
    ui.welcomeView();
    gameName = engine.colorString(engine.game_name);
    ui.changeGameNameColors(gameName);
    engine.gameNameInterval = setInterval(() => {
      let gameName = engine.colorString(engine.game_name);
      ui.changeGameNameColors(gameName);
    }, 500);
  },
  generateCompliment: () => {
    return engine.commpliments[
      engine.randomInt(0, engine.commpliments.length - 1)
    ];
  },
  lostlvl: () => {
    if (engine.lvl > 1) {
      engine.lvl--;
    }
    ui.lostRoundView();
    setTimeout(() => {
      engine.startRound();
    }, 2000);
  },

  wonlvl: () => {
    engine.lvl++;
    ui.wonRoundView();
  },

  rightAnswer: (section) => {
    const commpliment = engine.generateCompliment();
    ui.sectionSolved(commpliment, section);
    engine.lvl_unsolved--;
    if (engine.lvl_unsolved === 0) {
      engine.wonlvl();
    }
  },

  renderAnswerBtns: (section) => {
    const sectionAnswer = section.style.backgroundColor;
    for (color of engine.optional_colors) {
      let optionBtn = ui.createSectionOptionBtn(section, color);
      optionBtn.addEventListener(
        'click',
        sectionAnswer === color
          ? engine.rightAnswer.bind(this, section)
          : engine.lostlvl
      );
    }
  },

  hideSections: () => {
    for (section = 0; section < sections.length; section++) {
      engine.renderAnswerBtns(sections[section]);
      ui.hideSectionColor(sections[section]);
    }
  },

  startRound: () => {
    if (engine.just_entered) {
      clearInterval(engine.gameNameInterval);
      engine.just_entered = false;
    }
    engine.buildSections();
    engine.lvl_unsolved = sections.length;
    setTimeout(() => {
      engine.hideSections();
    }, 2500);
  },

  buildSections: () => {
    const coloredTitle = engine.colorString(engine.lvl_title + '' + engine.lvl);
    ui.inRoundView(coloredTitle);
    for (section = 0; section < engine.lvl; section++) {
      const optionalColor = engine.randomColor();
      ui.createSection(optionalColor);
    }
  },
};
//STARTING engine
if (engine.just_entered) {
  engine.welcome();
}
