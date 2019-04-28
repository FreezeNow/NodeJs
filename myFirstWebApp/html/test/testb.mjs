import testa from './testa.mjs';

const b = {
  ddd: 'ddd',
  ba() {
    const { a } = testa;
    console.log(`ba:${a.ccc}`);
    console.log(`bb:${b.ddd}`);
  },
};
console.log(`bb:${b.ddd}`);


export default {
  b,
};