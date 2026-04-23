<template>
  <modal-inner aria-label="Xuất bản lên Google Drive">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="googleDrive"></icon-provider>
      </div>
      <p>Xuất bản <b>{{currentFileName}}</b> lên tài khoản <b>Google Drive</b> của bạn.</p>
      <form-entry label="ID thư mục" info="tuỳ chọn">
        <input slot="field" class="textfield" type="text" v-model.trim="folderId" @keydown.enter="resolve()">
        <div class="form-entry__info">
          Nếu không điền, file sẽ được tạo trong thư mục gốc Drive của bạn.
        </div>
        <div class="form-entry__actions">
          <a href="javascript:void(0)" @click="openFolder">Chọn thư mục</a>
        </div>
      </form-entry>
      <form-entry label="ID file hiện có" info="tuỳ chọn">
        <input slot="field" class="textfield" type="text" v-model.trim="fileId" @keydown.enter="resolve()">
        <div class="form-entry__info">
          Thao tác này sẽ ghi đè file trên máy chủ.
        </div>
      </form-entry>
      <div class="form-entry">
        <div class="form-entry__radio">
          <label>
            <input type="radio" v-model="format" value="markdown"> Xuất Markdown
          </label>
        </div>
        <div class="form-entry__radio">
          <label>
            <input type="radio" v-model="format" value="html"> Xuất HTML
          </label>
        </div>
      </div>
      <form-entry label="Mẫu" v-if="format === 'html'">
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
import googleHelper from '../../../services/providers/helpers/googleHelper';
import googleDriveProvider from '../../../services/providers/googleDriveProvider';
import modalTemplate from '../common/modalTemplate';
import store from '../../../store';

export default modalTemplate({
  data: () => ({
    fileId: '',
  }),
  computedLocalSettings: {
    folderId: 'googleDriveFolderId',
    selectedTemplate: 'googleDrivePublishTemplate',
    format: 'googleDrivePublishFormat',
  },
  methods: {
    openFolder() {
      return store.dispatch(
        'modal/hideUntil',
        googleHelper.openPicker(this.config.token, 'folder')
          .then((folders) => {
            if (folders[0]) {
              store.dispatch('data/patchLocalSettings', {
                googleDriveFolderId: folders[0].id,
              });
            }
          }),
      );
    },
    resolve() {
      // Return new location
      const location = googleDriveProvider.makeLocation(this.config.token, this.fileId);
      if (this.format === 'html') {
        location.templateId = this.selectedTemplate;
      }
      this.config.resolve(location);
    },
  },
});
</script>
