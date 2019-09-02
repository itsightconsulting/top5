import app from './app';
import '@babel/polyfill';
async function main(){
    await app.listen(3700); // se configuro asignar el puerto como en lo servidores
    console.log('server on port 3700');
}

main();