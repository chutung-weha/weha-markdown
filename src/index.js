import Vue from 'vue';
import 'babel-polyfill';
import 'indexeddbshim/dist/indexeddbshim';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import './extensions';
import './services/optional';
import './icons';
import App from './components/App';
import store from './store';
import localDbSvc from './services/localDbSvc';

if (!indexedDB) {
  throw new Error('Trình duyệt của bạn không được hỗ trợ. Vui lòng cập nhật lên phiên bản mới nhất.');
}

OfflinePluginRuntime.install({
  onUpdateReady: () => {
    // Tells to new SW to take control immediately
    OfflinePluginRuntime.applyUpdate();
  },
  onUpdated: async () => {
    if (!store.state.light) {
      await localDbSvc.sync();
      localStorage.updated = true;
      // Reload the webpage to load into the new version
      window.location.reload();
    }
  },
});

if (localStorage.updated) {
  store.dispatch('notification/info', 'Weha Markdown vừa được cập nhật!');
  setTimeout(() => localStorage.removeItem('updated'), 2000);
}

if (!localStorage.installPrompted) {
  window.addEventListener('beforeinstallprompt', async (promptEvent) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    promptEvent.preventDefault();

    try {
      await store.dispatch('notification/confirm', 'Thêm Weha Markdown vào màn hình chính?');
      promptEvent.prompt();
      await promptEvent.userChoice;
    } catch (err) {
      // Cancel
    }
    localStorage.installPrompted = true;
  });
}

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
