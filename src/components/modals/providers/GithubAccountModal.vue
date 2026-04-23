<template>
  <modal-inner aria-label="Liên kết tài khoản GitHub">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="github"></icon-provider>
      </div>
      <p>Liên kết tài khoản <b>GitHub</b> của bạn với <b>Weha Markdown</b>.</p>
      <div class="form-entry">
        <div class="form-entry__checkbox">
          <label>
            <input type="checkbox" v-model="repoFullAccess"> Cấp quyền truy cập vào các repository riêng tư của bạn
          </label>
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
    repoFullAccess: 'githubRepoFullAccess',
  },
});
</script>
