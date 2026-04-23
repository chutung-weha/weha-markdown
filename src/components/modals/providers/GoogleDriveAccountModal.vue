<template>
  <modal-inner aria-label="Liên kết tài khoản Google Drive">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="googleDrive"></icon-provider>
      </div>
      <p>Liên kết tài khoản <b>Google Drive</b> của bạn với <b>Weha Markdown</b>.</p>
      <div class="form-entry">
        <div class="form-entry__checkbox">
          <label>
            <input type="checkbox" v-model="restrictedAccess"> Hạn chế quyền truy cập
          </label>
          <div class="form-entry__info">
            Nếu được chọn, quyền truy cập sẽ bị giới hạn ở các file bạn đã mở hoặc tạo bằng <b>Weha Markdown</b>.
          </div>
        </div>
      </div>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">Huỷ</button>
      <button class="button button--resolve" @click="config.resolve()">Đồng ý</button>
    </div>
  </modal-inner>
</template>

<script>
import modalTemplate from '../common/modalTemplate';

export default modalTemplate({
  computedLocalSettings: {
    restrictedAccess: 'googleDriveRestrictedAccess',
  },
});
</script>
