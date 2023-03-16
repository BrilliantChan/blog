import app from './core/lazyload';
import router from './router';
import store from './store';
import './core/antdv';

app.use(router)
    .use(store)
    .mount('#app');
