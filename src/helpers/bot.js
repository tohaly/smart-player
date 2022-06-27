function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.abs(Math.round(rand));
}

export class Bot {
    eventNames = {CHANGE_ROUND: 'change-round'}
    roundController = 2;

    constructor(dom, eventer, storage) {
        this.dom = dom;
        this.eventer = eventer;
        this.storage = storage;
    }

    changeRound = async () => {
        this.eventer.dispatch(this.eventNames.CHANGE_ROUND, await this.dom.getRoundNum(), this.dom.getLabels());
    }

    gameObserver = async () => {
        this.changeRound()
        let counter = 0;
        const target = await this.dom.safeGetContainer(this.dom.getGameRow);

        const observer = new MutationObserver(async () => {
            counter += 1;
            if(counter === 1) {
                this.changeRound();
                this.roundController = await this.dom.getRoundNum();
            }

            if(counter === 2) {
                counter = 0;
            }
        })

        observer.observe(target, {
            childList:     true
        });
    }

    clickByIndex = async (index) => {
        this.dom.getAnswers()[index].click();
    }

    testClick = async () => {
        const roundContainer = this.dom.getRoundContainer();
        const randomInt = randomInteger(0,3);
        if(roundContainer) {
            (await this.dom.safeGetContainer(this.dom.getAnswers))[randomInt].click();


            setTimeout(async () => {
                const isIncorrect = this.dom.isCorrectAnswer(this.dom.getAnswers()[randomInt]);
                const answerText = (await this.dom.safeGetContainer(this.dom.getAnswers))[randomInt].textContent;

                if(isIncorrect) {
                    this.storage.addAnswer(answerText);
                }
            }, 1000);
        }
    }

    restartGame = (roundNum) => {
        if(roundNum === 10) {
            setTimeout(() => {
                console.log('RESTART...')
                this.startGame();
            }, 6000)
        }
    }

    startGame = () => {
        let interval = setInterval(() => {
            const button = this.dom.getStartButton();

            if(this.dom.hasInput()) {
                return;
            }

            if(button) {
                button.click();
            } else{
                clearInterval(interval)
                this.gameObserver();
            }
        }, 800)
    }
}


