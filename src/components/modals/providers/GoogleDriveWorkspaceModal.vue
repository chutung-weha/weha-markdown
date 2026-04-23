<template>
  <modal-inner aria-label="Thêm workspace Google Drive">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="googleDrive"></icon-provider>
      </div>
      <p>Tạo workspace được đồng bộ với một thư mục <b>Google Drive</b>.</p>
      <form-entry label="ID thư mục" info="tuỳ chọn">
        <input slot="field" class="textfield" type="text" v-model.trim="folderId" @keydown.enter="resolve()">
        <div class="form-entry__info">
          Nếu không điền, một thư mục workspace mới sẽ được tạo trong thư mục gốc Drive của bạn.
        </div>
        <div class="form-entry__actions">
          <a href="javascript:void(0)" @click="openFolder">Chọn thư mục</a>
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
import modalTemplate from '../common/modalTemplate';
import utils from '../../../services/utils';
import store from '../../../store';

export default modalTemplate({
  computedLocalSettings: {
    folderId: 'googleDriveWorkspaceFolderId',
  },
  methods: {
    openFolder() {
      return store.dispatch(
        'modal/hideUntil',
        googleHelper.openPicker(this.config.token, 'folder')
          .then((folders) => {
            if (folders[0]) {
              store.dispatch('data/patchLocalSettings', {
                googleDriveWorkspaceFolderId: folders[0].id,
              });
            }
          }),
      );
    },
    resolve() {
      const url = utils.addQueryParams('app', {
        providerId: 'googleDriveWorkspace',
        folderId: this.folderId,
        sub: this.config.token.sub,
      }, true);
      this.config.resolve();
      window.open(url);
    },
  },
});
</script>
