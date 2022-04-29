import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector('[name=delay]'),
  delayStep: document.querySelector('[name=step]'),
  amount: document.querySelector('[name=amount]'),
  createPromisesBtn: document.querySelector('button[data-start]'),
}

refs.form.addEventListener("submit", onSubmitClick);

function onSubmitClick(evt) {
  evt.preventDefault();

  const firstDelayValue = Number(refs.firstDelay.value);
  const delayStepValue = Number(refs.delayStep.value);
  const amountValue = Number(refs.amount.value);

  let delay = firstDelayValue-delayStepValue;

  for (let i = 1; i <= amountValue; i += 1){
    delay += delayStepValue;
    createPromise(i, delay).then(onFulfilled).catch(onRejected);

  }
 
}

function createPromise(position, delay) {
  
  return new Promise((resolve, reject) => { 
    
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
        if (shouldResolve) {
    // Fulfill
       resolve(console.log(`✅ Fulfilled promise ${position} in ${delay}ms`));
          
      } else {
    // Reject
       reject(console.log(`❌ Rejected promise ${position} in ${delay}ms`));
  }

    }, delay);

  });
}

function onFulfilled({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  //console.log(`✅ Fulfilled promise ${position} in ${delay}ms`)
}

function onRejected({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  //console.log(`❌ Rejected promise ${position} in ${delay}ms`)
}



// ✅ Fulfilled promise ${position} in ${delay}ms
// ❌ Rejected promise ${position} in ${delay}ms