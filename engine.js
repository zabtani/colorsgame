//GLOBALS
const playerInput = document.getElementById('player-name-input');
const mainContainer = document.getElementById('main-container');
const titleContainer = document.getElementById('title-container');
const btnsContainer = document.getElementById('btns-container');
const sections = document.getElementsByClassName('section');
const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-btn');
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

const PLAYERS_RECORED = [];

//GAME engine
const engine = {
  game_name: GAME_NAME,
  lvl_title: LVL_TITLE,
  optional_colors: OPTIONAL_COLORS,
  commpliments: COMPLIMENTS,
  gameNameInterval: '',
  unsolved_sections: 0,
  lvl: 1,
  just_entered: true,
  player_input: playerInput,
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
  nameIsValid: () => {
    if (engine.player_input.value) {
      return true;
    } else {
      return false;
    }
  },
  welcome: () => {
    engine.just_entered = true;
    engine.lvl = 1;
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
    PLAYERS_RECORED.push({ name: engine.player_name, score: engine.lvl });
    engine.lvl = 1;
    const recoredList = engine.generateScores(PLAYERS_RECORED);
    ui.lostRoundView(recoredList);
    backBtn.addEventListener('click', engine.welcome);
  },

  generateScores: (recoredArr) => {
    let recoredList = '<ul>';
    for (recored of recoredArr) {
      recoredList += `<li>name: ${recored.name} | score:${recored.score} </li>`;
    }
    recoredList += '</ul>';
    return recoredList;
  },

  wonlvl: () => {
    engine.lvl++;
    ui.wonRoundView();
  },

  rightAnswer: (section) => {
    const commpliment = engine.generateCompliment();
    ui.sectionSolved(commpliment, section);
    engine.unsolved_sections--;
    if (engine.unsolved_sections === 0) {
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
    for (section = 0; section < engine.lvl; section++) {
      engine.renderAnswerBtns(sections[section]);
      ui.hideSectionColor(sections[section]);
    }
  },

  startRound: (playerInputValue) => {
    engine.player_name = playerInputValue;
    if (engine.just_entered) {
      clearInterval(engine.gameNameInterval);
      engine.just_entered = false;
    }
    console.log('srrtrnd');
    engine.buildSections();
    engine.unsolved_sections = sections.length;
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

startBtn.addEventListener('click', () => {
  console.log('wel');
  if (engine.nameIsValid()) {
    engine.startRound(engine.player_input.value);
  } else {
    ui.displayErr(engine.player_input.value);
    setTimeout(() => {
      ui.removeErr();
    }, 1000);
  }
});
