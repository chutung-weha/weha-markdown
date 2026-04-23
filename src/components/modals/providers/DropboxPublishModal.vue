<template>
  <modal-inner aria-label="Xuất bản lên Dropbox">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="dropbox"></icon-provider>
      </div>
      <p>Xuất bản <b>{{currentFileName}}</b> lên <b>Dropbox</b> của bạn.</p>
      <form-entry label="Đường dẫn file" error="path">
        <input slot="field" class="textfield" type="text" v-model.trim="path" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>Ví dụ:</b> {{config.token.fullAccess ? '' : '/Applications/StackEdit (restricted)'}}/path/to/My Document.html<br>
          Nếu file đã tồn tại, nó sẽ bị ghi đè.
        </div>
      </form-entry>
      <form-entry label="Mẫu">
        <select slot="field" class="textfield" v-model="selectedTemplate" @keydown.enter="resolve()">
          <option v-for="(template, id) in allTemplatesById" :key="id" :value="id">
            {{ template.name }}
          </option>
        </select>
        <div class="form-entry__actions">
          <a href="javascript:void(0)" @click="configureTemplates">Cấu hình mẫu</a>
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
import dropboxProvider from '../../../services/providers/dropboxProvider';
import modalTemplate from '../common/modalTemplate';

export default modalTemplate({
  data: () => ({
    path: '',
  }),
  computedLocalSettings: {
    selectedTemplate: 'dropboxPublishTemplate',
  },
  created() {
    this.path = `/${this.currentFileName}.html`;
  },
  methods: {
    resolve() {
      if (!dropboxProvider.checkPath(this.path)) {
        this.setError('path');
      } else {
        // Return new location
        const location = dropboxProvider.makeLocation(this.config.token, this.path);
        location.templateId = this.selectedTemplate;
        this.config.resolve(location);
      }
    },
  },
});
</script>
