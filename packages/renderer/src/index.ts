import {createApp} from 'vue';
import App from '/@/App.vue';
import OnuUI from 'onu-ui';
import 'virtual:uno.css';
import 'onu-ui/dist/style.css';

createApp(App).use(OnuUI).mount('#app');
