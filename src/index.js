import dom from "./helpers/dom";
import {Bot} from "./helpers/bot";
import {SimpleEvent} from "./helpers/simpleEvent";
import {SimpleStorage} from "./helpers/simpleStorage";

let score = 0;
const eventer = new SimpleEvent();
const storage = new SimpleStorage();
const bot = new Bot(dom, eventer, storage)

storage.loadFromStorage();
bot.startGame();
eventer.addEventListeners(bot.eventNames.CHANGE_ROUND, (round, labels) => {
    dom.tryRemveImage();
    const foundIndex = labels.findIndex(label => storage.isHasLabel(label));
    if(foundIndex !== -1) {
        console.log('The answer is known!')
        bot.clickByIndex(foundIndex);
        score +=1;
    } else {
        console.log('Unknown answer, testing...')
        bot.testClick();
    }

    if(round === 10) {
        console.log(`Result: ${score}/10`)
        score = 0;
        setTimeout(() => {
            storage.saveToStorage();
        }, 2000)
        bot.restartGame(round);
    }
})
