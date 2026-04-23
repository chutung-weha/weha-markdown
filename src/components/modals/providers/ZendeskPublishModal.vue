<template>
  <modal-inner aria-label="Xuất bản lên Zendesk">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="zendesk"></icon-provider>
      </div>
      <p>Xuất bản <b>{{currentFileName}}</b> lên <b>Zendesk Help Center</b> của bạn.</p>
      <form-entry label="ID phần (section)" error="sectionId">
        <input slot="field" class="textfield" type="text" v-model.trim="sectionId" @keydown.enter="resolve()">
        <div class="form-entry__info">
          https://example.zendesk.com/hc/en-us/sections/<b>21857469</b>-Section-name
        </div>
      </form-entry>
      <form-entry label="ID bài viết hiện có" info="tuỳ chọn">
        <input slot="field" class="textfield" type="text" v-model.trim="articleId" @keydown.enter="resolve()">
      </form-entry>
      <form-entry label="Ngôn ngữ" info="tuỳ chọn">
        <input slot="field" class="textfield" type="text" v-model.trim="locale" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>Mặc định:</b> en-us
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
        <b>Mẹo:</b> Bạn có thể cung cấp giá trị cho <code>title</code>, <code>tags</code> và
        <code>status</code> trong <a href="javascript:void(0)" @click="openFileProperties">thuộc tính file</a>.
      </div>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">Huỷ</button>
      <button class="button button--resolve" @click="resolve()">Đồng ý</button>
    </div>
  </modal-inner>
</template>

<script>
import zendeskProvider from '../../../services/providers/zendeskProvider';
import modalTemplate from '../common/modalTemplate';

export default modalTemplate({
  data: () => ({
    articleId: '',
  }),
  computedLocalSettings: {
    sectionId: 'zendescPublishSectionId',
    locale: 'zendescPublishLocale',
    selectedTemplate: 'zendeskPublishTemplate',
  },
  methods: {
    resolve() {
      if (!this.sectionId && !this.articleId) {
        this.setError('sectionId');
      } else {
        // Return new location
        const location = zendeskProvider.makeLocation(
          this.config.token,
          this.sectionId,
          this.locale || 'en-us',
          this.articleId,
        );
        location.templateId = this.selectedTemplate;
        this.config.resolve(location);
      }
    },
  },
});
</script>
