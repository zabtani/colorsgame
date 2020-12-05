const OPTIONAL_COLORS = ['black', 'blue', 'red', 'green', 'yellow'];
let LVL = 1;
let LVL_UNSOLVED;
let justEntered = true;

if (justEntered) {
  UI.gameNotification('welcome');
  justEntered = false;
}
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const generateCompliment = (comments) => {
  return comments[randomInt(0, comments.length - 1)];
};

const lostLVL = () => {
  if (LVL > 1) {
    LVL--;
  }
  UI.gameNotification('fail');
  setTimeout(() => {
    startRound();
  }, 2000);
};

const wonLVL = () => {
  LVL++;
  UI.revealStartBtn();
  UI.gameNotification('success');
};

const presentOptionalAnswers = (section) => {
  const currentSection = sections[section];
  const sectionAnswer = currentSection.style.backgroundColor;
  const rightAnswer = () => {
    UI.sectionRandomCompliment(currentSection);
    LVL_UNSOLVED--;
    if (LVL_UNSOLVED === 0) {
      wonLVL();
    }
  };
  for (color of OPTIONAL_COLORS) {
    let colorOption = UI.createSectionAnswerBtn(currentSection, color);
    colorOption.addEventListener(
      'click',
      sectionAnswer === color ? rightAnswer : lostLVL
    );
  }
};

const hideSections = () => {
  for (section = 0; section < sections.length; section++) {
    presentOptionalAnswers(section);
    UI.hideSectionContent(sections[section]);
  }
};

const startRound = () => {
  LVL_UNSOLVED = sections.length;
  buildSections();
  setTimeout(() => {
    hideSections();
  }, 2000);
};

const buildSections = () => {
  UI.lvlTitleView();
  for (section = 0; section < LVL; section++) {
    const sectionColor = `${
      OPTIONAL_COLORS[randomInt(0, OPTIONAL_COLORS.length - 1)]
    }`;
    UI.createSection(sectionColor);
  } 
};

startBtn.addEventListener('click', startRound);
