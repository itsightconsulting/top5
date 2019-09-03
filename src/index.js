import app from './app';
import '@babel/polyfill';
async function main() {
    await app.listen(process.env.PORT || 5000); // se configuro asignar el puerto como en lo servidores
    console.log('server on port', process.env.PORT || 5000);
}

main();