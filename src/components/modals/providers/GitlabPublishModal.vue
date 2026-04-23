<template>
  <modal-inner aria-label="Xuất bản lên GitLab">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="gitlab"></icon-provider>
      </div>
      <p>Xuất bản <b>{{currentFileName}}</b> lên project <b>GitLab</b> của bạn.</p>
      <form-entry label="URL project" error="projectUrl">
        <input slot="field" class="textfield" type="text" v-model.trim="projectUrl" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>Ví dụ:</b> {{config.token.serverUrl}}/path/to/project
        </div>
      </form-entry>
      <form-entry label="Đường dẫn file" error="path">
        <input slot="field" class="textfield" type="text" v-model.trim="path" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>Ví dụ:</b> path/to/README.md<br>
          Nếu file đã tồn tại, nó sẽ bị ghi đè.
        </div>
      </form-entry>
      <form-entry label="Nhánh" info="tuỳ chọn">
        <input slot="field" class="textfield" type="text" v-model.trim="branch" @keydown.enter="resolve()">
        <div class="form-entry__info">
          Nếu không điền, nhánh <code>master</code> sẽ được sử dụng.
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
import gitlabProvider from '../../../services/providers/gitlabProvider';
import modalTemplate from '../common/modalTemplate';
import utils from '../../../services/utils';

export default modalTemplate({
  data: () => ({
    branch: '',
    path: '',
  }),
  computedLocalSettings: {
    projectUrl: 'gitlabProjectUrl',
    selectedTemplate: 'gitlabPublishTemplate',
  },
  created() {
    this.path = `${this.currentFileName}.md`;
  },
  methods: {
    resolve() {
      const projectPath = utils.parseGitlabProjectPath(this.projectUrl);
      if (!projectPath) {
        this.setError('projectUrl');
      }
      if (!this.path) {
        this.setError('path');
      }
      if (projectPath && this.path) {
        // Return new location
        const location = gitlabProvider.makeLocation(
          this.config.token,
          projectPath,
          this.branch || 'master',
          this.path,
        );
        location.templateId = this.selectedTemplate;
        this.config.resolve(location);
      }
    },
  },
});
</script>
