import brain from 'brain.js';

const encode = (arg) => arg.split('').map(x => (x.charCodeAt(0) / 255));


function fixLengths(data) {
  let maxLengthInput = -1;
  for (let i = 0; i < data.length; i++) {
    if (data[i].input.length > maxLengthInput) {
      maxLengthInput = data[i].input.length;
    }
  }
  
  for (let i = 0; i < data.length; i++) {
    while (data[i].input.length < maxLengthInput) {
      data[i].input.push(0);
    }
  }
  
  return data;
}


function processTrainingData(data) {
   return data.map(d => {
       return {
           input: encode(d.input),
           output: d.output
       }
   })
}

export function train(data) {
   let net = new brain.NeuralNetwork();
   window.net = net;
   net.train(fixLengths(processTrainingData(data)));
   const trainedNet = net.toFunction();
   return trainedNet;
};

export function execute(trainedNet, input) {
  const encoded = encode(input)
  console.log(encoded)
   let results = trainedNet(encoded);
   let output;
   results.tanglish > results.english ? output = 'Tanglish' : output = 'English';
   console.log(results);
   return output;
}


