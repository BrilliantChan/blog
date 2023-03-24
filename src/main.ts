import app from './core/lazyload';
import router from './router';
import store from './store';
import './core/antdv';
import './router/before.each';

app.use(router)
    .use(store)
    .mount('#app');
