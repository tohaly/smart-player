import * as knnClassifier from "@tensorflow-models/knn-classifier";
import * as mobilenetModule from "@tensorflow-models/mobilenet";
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs-core';

class Model {
    classifier;
    mobilenet;

    getImage = (url) => {
        const image = document.createElement('img');
        image.width = 400;
        image.height = 400;
        image.src = url;
        return tf.browser.fromPixels(image);
    }

    getInfer = (url) => {
        const image = this.getImage(url);
        return this.mobilenet.infer(image, 'conv_preds');
    }

    addExample = async (url, label) => {
        const infer = this.getInfer(url);

        if(this.classifier.getClassifierDataset()[label]) {
            console.log(await this.classifier.predictClass(infer, 3));

        }

        new Array(20).fill(0).forEach(()=>{
            this.classifier.addExample(infer, label);
        })
    }

    boostrap = async (items) => {
        console.log('Start loading model... Please wait...')
        this.classifier = knnClassifier.create();
        this.mobilenet = await mobilenetModule.load();
        this.classifier.setClassifierDataset(items);
        console.log('Model loaded! You can try start!')
    }

    getDataSet = () => this.classifier.getClassifierDataset();

    classAlreadySaved = (label) => !!this.getClasses()[label];

    getPredictedLabel = async (url) => {
        const infer = this.getInfer(url);
        console.log(await this.classifier.predictClass(infer, 3));
    }
}

export default new Model()
