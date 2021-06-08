import * as tf from '@tensorflow/tfjs';

const STYLE_MODEL_URL_MAP = {
    "hayao": "https://unpkg.com/local-tfjs-models@0.0.2/cartoon-GAN/hayao/model.json",   
    "hosoda": "https://unpkg.com/local-tfjs-models@0.0.2/cartoon-GAN/hosoda/model.json",
    "paprika": "https://unpkg.com/local-tfjs-models@0.0.2/cartoon-GAN/paprika/model.json",
    "shinkai": "https://unpkg.com/local-tfjs-models@0.0.2/cartoon-GAN/shinkai/model.json"   
};

type STYLE_TYPE = "hayao" | "hosoda" | "paprika" | "shinkai";

async function setupModel(style: STYLE_TYPE): Promise<tf.GraphModel> {
    const model = await tf.loadGraphModel(STYLE_MODEL_URL_MAP[style]);
    // this predict action is used to save time, because every first predict action is very slow.
    model.predict(tf.zeros([1, 1, 1, 3]));
    return model;
}

async function predict(style: STYLE_TYPE, inputImgElement: HTMLImageElement | HTMLCanvasElement, outputElement: HTMLCanvasElement) {
    // load and init model
    const model = await setupModel(style);

    // convert the input image to tensor accepted by model
    let inputTensor = tf.browser.fromPixels(inputImgElement);
    inputTensor = inputTensor.toFloat();
    inputTensor = inputTensor.reverse(2);
    inputTensor = tf.expandDims(inputTensor, 0);

    let outputTensor = model.predict(inputTensor as tf.Tensor<tf.Rank>) as tf.Tensor<tf.Rank>;
    // convert the predict tensor to output image
    outputTensor = tf.squeeze(outputTensor, [0]);
    outputTensor = outputTensor.reverse(2);
    outputTensor = outputTensor.mul(0.5).add(0.5);
    outputTensor = tf.clipByValue(outputTensor, 0, 1);

    // put the result into canvas element.
    tf.browser.toPixels(outputTensor as tf.Tensor2D, outputElement);

}


const MAX_WIDTH = 350;

const input = new Image();
input.onload = async () => {

    if (input.width > MAX_WIDTH) {
        input.height = MAX_WIDTH / (input.width / input.height); 
        input.width = MAX_WIDTH;
    }
    


    const outputCanvas1 = document.createElement('canvas');
    outputCanvas1.width = input.width;
    outputCanvas1.height = input.height;
    document.body.appendChild(outputCanvas1);

    const outputCanvas2 = document.createElement('canvas');
    outputCanvas2.width = input.width;
    outputCanvas2.height = input.height;
    document.body.appendChild(outputCanvas2);

    const outputCanvas3 = document.createElement('canvas');
    outputCanvas3.width = input.width;
    outputCanvas3.height = input.height;
    document.body.appendChild(outputCanvas3);

    const outputCanvas4 = document.createElement('canvas');
    outputCanvas4.width = input.width;
    outputCanvas4.height = input.height;
    document.body.appendChild(outputCanvas4);

    console.log('load');

    await tf.setBackend('webgl');

    await predict("hayao", input, outputCanvas1);
    console.log("hayao");
    await predict("hosoda", input, outputCanvas2);
    console.log("hosoda");
    await predict("paprika", input, outputCanvas3);
    console.log("paprika");
    await predict("shinkai", input, outputCanvas4);
    console.log("shinkai");

}

input.src = './test-images/girl1.png';

document.body.appendChild(input);

