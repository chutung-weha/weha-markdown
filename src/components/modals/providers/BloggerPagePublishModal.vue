<template>
  <modal-inner aria-label="Xuất bản lên Blogger Page">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="bloggerPage"></icon-provider>
      </div>
      <p>Xuất bản <b>{{currentFileName}}</b> lên <b>Blogger Page</b> của bạn.</p>
      <form-entry label="URL blog" error="blogUrl">
        <input slot="field" class="textfield" type="text" v-model.trim="blogUrl" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>Ví dụ:</b> http://example.blogger.com/
        </div>
      </form-entry>
      <form-entry label="ID trang hiện có" info="tuỳ chọn">
        <input slot="field" class="textfield" type="text" v-model.trim="pageId" @keydown.enter="resolve()">
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
import bloggerPageProvider from '../../../services/providers/bloggerPageProvider';
import modalTemplate from '../common/modalTemplate';

export default modalTemplate({
  data: () => ({
    pageId: '',
  }),
  computedLocalSettings: {
    blogUrl: 'bloggerBlogUrl',
    selectedTemplate: 'bloggerPublishTemplate',
  },
  methods: {
    resolve() {
      if (!this.blogUrl) {
        this.setError('blogUrl');
      } else {
        // Return new location
        const location = bloggerPageProvider.makeLocation(
          this.config.token,
          this.blogUrl,
          this.pageId,
        );
        location.templateId = this.selectedTemplate;
        this.config.resolve(location);
      }
    },
  },
});
</script>
