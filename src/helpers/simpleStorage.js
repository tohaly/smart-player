export class SimpleStorage {
    STORAGE_KEY = 'rightAnswer';
    answersData = {};

    loadFromStorage = (initData = {}) => {
        chrome.storage.sync.get([this.STORAGE_KEY], (items) => {
            console.log('Answers loaded', items);
            this.answersData = {...items[this.STORAGE_KEY], ...initData}
        });
    }

    saveToStorage = () => {
        chrome.storage.sync.set({[this.STORAGE_KEY]: this.answersData}, () => {
            console.log('Answers saved', this.answersData);
        });
    }

    addAnswer = (label) => {
        this.answersData = {...this.answersData, [label]: true};
        console.log('Saved answer', label);
    }

    isHasLabel = (label) => !!this.answersData[label];
}
