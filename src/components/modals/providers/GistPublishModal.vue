<template>
  <modal-inner aria-label="Xuất bản lên Gist">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="gist"></icon-provider>
      </div>
      <p>Xuất bản <b>{{currentFileName}}</b> lên một <b>Gist</b>.</p>
      <form-entry label="Tên file" error="filename">
        <input slot="field" class="textfield" type="text" v-model.trim="filename" @keydown.enter="resolve()">
      </form-entry>
      <div class="form-entry">
        <div class="form-entry__checkbox">
          <label>
            <input type="checkbox" v-model="isPublic"> Công khai
          </label>
        </div>
      </div>
      <form-entry label="ID Gist hiện có" info="tuỳ chọn">
        <input slot="field" class="textfield" type="text" v-model.trim="gistId" @keydown.enter="resolve()">
        <div class="form-entry__info">
          Nếu file đã tồn tại trong Gist, nó sẽ bị ghi đè.
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
      <div class="modal__info">
        <b>Mẹo:</b> Bạn có thể cung cấp giá trị cho <code>title</code> trong <a href="javascript:void(0)" @click="openFileProperties">thuộc tính file</a>.
      </div>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">Huỷ</button>
      <button class="button button--resolve" @click="resolve()">Đồng ý</button>
    </div>
  </modal-inner>
</template>

<script>
import gistProvider from '../../../services/providers/gistProvider';
import modalTemplate from '../common/modalTemplate';

export default modalTemplate({
  data: () => ({
    filename: '',
    gistId: '',
  }),
  computedLocalSettings: {
    isPublic: 'gistIsPublic',
    selectedTemplate: 'gistPublishTemplate',
  },
  created() {
    this.filename = `${this.currentFileName}.md`;
  },
  methods: {
    resolve() {
      if (!this.filename) {
        this.setError('filename');
      } else {
        // Return new location
        const location = gistProvider.makeLocation(
          this.config.token,
          this.filename,
          this.isPublic,
          this.gistId,
        );
        location.templateId = this.selectedTemplate;
        this.config.resolve(location);
      }
    },
  },
});
</script>
