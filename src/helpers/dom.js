function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Dom {
    isCorrectAnswer = (answerElement) => {
        let result = false;

        answerElement.classList.forEach(selector => {
            if(selector.startsWith('button_correct')) {
                result = true;
            }
        })

        return result;
    }

    getAnswers = () => {
        return document.querySelector('[class*=game_footer]').querySelectorAll('[class^=button_text]');
    }

    getLabels = () => {
        let result = [];

        this.getAnswers().forEach(element => {
            result.push(element.textContent);
        })

        return result;
    }

    safeGetContainer = async (getter) => {
        const node = getter();
        if(!node) {
            await sleep(0);
            return this.safeGetContainer(getter);
        }

        return node;
    }

    tryRemveImage = () => {
        try {
            this.getImageContainer().style.backgroundImage = null;
        } catch (err) {
            console.log('Error remove image')
        }

    }

    getImageContainer = () => document.querySelector('[class^=screen_image]');
    getRoundContainer = () => document.querySelector('[class^=screen_top]');
    getAnswers = () => document.querySelector('[class*=game_footer]').querySelectorAll('[class^=button_text]');
    getStartButton = () => document.querySelector('[class^=wideButton_root]');
    getRoundNum = async () => {
        const roundContainer = await this.safeGetContainer(this.getRoundContainer);
        const roundNum = Number(roundContainer.textContent.replace(/Round-/, ''));
        return roundNum;
    }
    getGameRow = () =>  document.querySelector('[class^=game_row]');
    hasInput = () => document.querySelector('input');
}

export default new Dom();
