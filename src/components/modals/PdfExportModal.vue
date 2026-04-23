<template>
  <modal-inner aria-label="Xuất ra PDF">
    <div class="modal__content">
      <p>Vui lòng chọn template cho <b>bản xuất PDF</b> của bạn.</p>
      <form-entry label="Template">
        <select class="textfield" slot="field" v-model="selectedTemplate" @keydown.enter="resolve()">
          <option v-for="(template, id) in allTemplatesById" :key="id" :value="id">
            {{ template.name }}
          </option>
        </select>
        <div class="form-entry__actions">
          <a href="javascript:void(0)" @click="configureTemplates">Cấu hình template</a>
        </div>
      </form-entry>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">Huỷ</button>
      <button class="button button--resolve" @click="resolve()">Đồng ý</button>
    </div>
  </modal-inner>
</template>

<script>
import FileSaver from 'file-saver';
import exportSvc from '../../services/exportSvc';
import networkSvc from '../../services/networkSvc';
import googleHelper from '../../services/providers/helpers/googleHelper';
import modalTemplate from './common/modalTemplate';
import store from '../../store';
import badgeSvc from '../../services/badgeSvc';

export default modalTemplate({
  computedLocalSettings: {
    selectedTemplate: 'pdfExportTemplate',
  },
  methods: {
    async resolve() {
      this.config.resolve();
      const currentFile = store.getters['file/current'];
      store.dispatch('queue/enqueue', async () => {
        const [sponsorToken, html] = await Promise.all([
          Promise.resolve().then(() => {
            const tokenToRefresh = store.getters['workspace/sponsorToken'];
            return tokenToRefresh && googleHelper.refreshToken(tokenToRefresh);
          }),
          exportSvc.applyTemplate(
            currentFile.id,
            this.allTemplatesById[this.selectedTemplate],
            true,
          ),
        ]);

        try {
          const { body } = await networkSvc.request({
            method: 'POST',
            url: 'pdfExport',
            params: {
              idToken: sponsorToken && sponsorToken.idToken,
              options: JSON.stringify(store.getters['data/computedSettings'].wkhtmltopdf),
            },
            body: html,
            blob: true,
            timeout: 60000,
          });
          FileSaver.saveAs(body, `${currentFile.name}.pdf`);
          badgeSvc.addBadge('exportPdf');
        } catch (err) {
          if (err.status === 401) {
            store.dispatch('modal/open', 'sponsorOnly');
          } else {
            console.error(err); // eslint-disable-line no-console
            store.dispatch('notification/error', err);
          }
        }
      });
    },
  },
});
</script>
