const OPTIONAL_COLORS = ['black', 'blue', 'red', 'green', 'yellow'];
let LVL = 1;
let LVL_UNSOLVED;
let justEntered = true;
const COMPLIMENTS = [
  'good memory!',
  'genius!',
  'champion!',
  'elephant!',
  'wooow!',
  'nice!',
  'amazing!',
];

if (justEntered) {
  UI.welcomeMSG();
  justEntered = false;
}

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const generateCompliment = () => {
  return COMPLIMENTS[randomInt(0, COMPLIMENTS.length - 1)];
};

const lostLVL = () => {
  if (LVL > 1) {
    LVL--;
  }

  UI.wrongMSG();
  setTimeout(() => {
    startRound();
  }, 2000);
};

const wonLVL = () => {
  LVL++;
  UI.titleOnStart();
  UI.successMSG();
};

const rightAnswer = (section) => {
  const commpliment = generateCompliment();
  UI.sectionSolved(commpliment, section);
  LVL_UNSOLVED--;
  if (LVL_UNSOLVED === 0) {
    wonLVL();
  }
};

const presentOptionalAnswers = (section) => {
  const sectionAnswer = section.style.backgroundColor;
  for (color of OPTIONAL_COLORS) {
    let colorOption = UI.createSectionOptionBtn(section, color);
    colorOption.addEventListener(
      'click',
      sectionAnswer === color ? rightAnswer.bind(this, section) : lostLVL
    );
  }
};

const hideSections = () => {
  for (section = 0; section < sections.length; section++) {
    presentOptionalAnswers(sections[section]);
    UI.hideSectionColor(sections[section]);
  }
};

const startRound = () => {
  buildSections();
  LVL_UNSOLVED = sections.length;
  setTimeout(() => {
    hideSections();
  }, 2000);
};

const buildSections = () => {
  UI.titleOnLvl();
  for (section = 0; section < LVL; section++) {
    const optionalColor = `${
      OPTIONAL_COLORS[randomInt(0, OPTIONAL_COLORS.length - 1)]
    }`;
    UI.createSection(optionalColor);
  }
};

startBtn.addEventListener('click', startRound);
