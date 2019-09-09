import app from './app';
import '@babel/polyfill';
async function main() {
    await app.listen(process.env.PORT || 5000);
    console.log('server on port', process.env.PORT || 5000);
}

main();