<template>
  <modal-inner aria-label="Đồng bộ với GitHub">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="github"></icon-provider>
      </div>
      <p>Tạo workspace được đồng bộ với một thư mục repository <b>GitHub</b>.</p>
      <form-entry label="URL repository" error="repoUrl">
        <input slot="field" class="textfield" type="text" v-model.trim="repoUrl" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>Ví dụ:</b> https://github.com/owner/my-repo
        </div>
      </form-entry>
      <form-entry label="Đường dẫn thư mục" info="tuỳ chọn">
        <input slot="field" class="textfield" type="text" v-model.trim="path" @keydown.enter="resolve()">
        <div class="form-entry__info">
          Nếu không điền, thư mục gốc sẽ được sử dụng.
        </div>
      </form-entry>
      <form-entry label="Nhánh" info="tuỳ chọn">
        <input slot="field" class="textfield" type="text" v-model.trim="branch" @keydown.enter="resolve()">
        <div class="form-entry__info">
          Nếu không điền, nhánh <code>master</code> sẽ được sử dụng.
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
import utils from '../../../services/utils';
import modalTemplate from '../common/modalTemplate';

export default modalTemplate({
  data: () => ({
    branch: '',
    path: '',
  }),
  computedLocalSettings: {
    repoUrl: 'githubWorkspaceRepoUrl',
  },
  methods: {
    resolve() {
      const parsedRepo = utils.parseGithubRepoUrl(this.repoUrl);
      if (!parsedRepo) {
        this.setError('repoUrl');
      } else {
        const path = this.path && this.path.replace(/^\//, '');
        const url = utils.addQueryParams('app', {
          ...parsedRepo,
          providerId: 'githubWorkspace',
          branch: this.branch || 'master',
          path: path || undefined,
        }, true);
        this.config.resolve();
        window.open(url);
      }
    },
  },
});
</script>
