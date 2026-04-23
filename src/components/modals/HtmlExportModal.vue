<template>
  <modal-inner aria-label="Xuất ra HTML">
    <div class="modal__content">
      <p>Vui lòng chọn template cho <b>bản xuất HTML</b> của bạn.</p>
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
      <button class="button button--copy" v-clipboard="result" @click="info('Đã sao chép HTML vào clipboard!')">Sao chép</button>
      <button class="button" @click="config.reject()">Huỷ</button>
      <button class="button button--resolve" @click="resolve()">Đồng ý</button>
    </div>
  </modal-inner>
</template>

<script>
import { mapActions } from 'vuex';
import exportSvc from '../../services/exportSvc';
import modalTemplate from './common/modalTemplate';
import store from '../../store';
import badgeSvc from '../../services/badgeSvc';

export default modalTemplate({
  data: () => ({
    result: '',
  }),
  computedLocalSettings: {
    selectedTemplate: 'htmlExportTemplate',
  },
  mounted() {
    let timeoutId;
    this.$watch('selectedTemplate', (selectedTemplate) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        const currentFile = store.getters['file/current'];
        const html = await exportSvc.applyTemplate(
          currentFile.id,
          this.allTemplatesById[selectedTemplate],
        );
        this.result = html;
      }, 10);
    }, {
      immediate: true,
    });
  },
  methods: {
    ...mapActions('notification', [
      'info',
    ]),
    async resolve() {
      const { config } = this;
      const currentFile = store.getters['file/current'];
      config.resolve();
      await exportSvc.exportToDisk(currentFile.id, 'html', this.allTemplatesById[this.selectedTemplate]);
      badgeSvc.addBadge('exportHtml');
    },
  },
});
</script>
