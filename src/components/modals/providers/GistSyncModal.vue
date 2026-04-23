<template>
  <modal-inner aria-label="Đồng bộ với Gist">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="gist"></icon-provider>
      </div>
      <p>Lưu <b>{{currentFileName}}</b> vào một <b>Gist</b> và giữ đồng bộ.</p>
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
        this.config.resolve(location);
      }
    },
  },
});
</script>
