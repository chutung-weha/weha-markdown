<template>
  <modal-inner aria-label="Đồng bộ với Google Drive">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="googleDrive"></icon-provider>
      </div>
      <p>Lưu <b>{{currentFileName}}</b> vào tài khoản <b>Google Drive</b> của bạn và giữ đồng bộ.</p>
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
      const location = googleDriveProvider.makeLocation(
        this.config.token,
        this.fileId,
        this.folderId,
      );
      this.config.resolve(location);
    },
  },
});
</script>
