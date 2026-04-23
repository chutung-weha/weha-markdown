<template>
  <modal-inner aria-label="Đồng bộ với Dropbox">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="dropbox"></icon-provider>
      </div>
      <p>Lưu <b>{{currentFileName}}</b> lên <b>Dropbox</b> của bạn và giữ đồng bộ.</p>
      <form-entry label="Đường dẫn file" error="path">
        <input slot="field" class="textfield" type="text" v-model.trim="path" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>Ví dụ:</b> {{config.token.fullAccess ? '' : '/Applications/StackEdit (restricted)'}}/path/to/My Document.md<br>
          Nếu file đã tồn tại, nó sẽ bị ghi đè.
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
  created() {
    this.path = `/${this.currentFileName}.md`;
  },
  methods: {
    resolve() {
      if (!dropboxProvider.checkPath(this.path)) {
        this.setError('path');
      } else {
        // Return new location
        const location = dropboxProvider.makeLocation(this.config.token, this.path);
        this.config.resolve(location);
      }
    },
  },
});
</script>
