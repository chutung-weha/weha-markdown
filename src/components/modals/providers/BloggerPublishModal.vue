<template>
  <modal-inner aria-label="Xuất bản lên Blogger">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="blogger"></icon-provider>
      </div>
      <p>Xuất bản <b>{{currentFileName}}</b> lên trang <b>Blogger</b> của bạn.</p>
      <form-entry label="URL blog" error="blogUrl">
        <input slot="field" class="textfield" type="text" v-model.trim="blogUrl" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>Ví dụ:</b> http://example.blogger.com/
        </div>
      </form-entry>
      <form-entry label="ID bài viết hiện có" info="tuỳ chọn">
        <input slot="field" class="textfield" type="text" v-model.trim="postId" @keydown.enter="resolve()">
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
        <b>Mẹo:</b> Bạn có thể cung cấp giá trị cho <code>title</code>, <code>tags</code>,
        <code>status</code> và <code>date</code> trong <a href="javascript:void(0)" @click="openFileProperties">thuộc tính file</a>.
      </div>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">Huỷ</button>
      <button class="button button--resolve" @click="resolve()">Đồng ý</button>
    </div>
  </modal-inner>
</template>

<script>
import bloggerProvider from '../../../services/providers/bloggerProvider';
import modalTemplate from '../common/modalTemplate';

export default modalTemplate({
  data: () => ({
    postId: '',
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
        const location = bloggerProvider.makeLocation(
          this.config.token,
          this.blogUrl,
          this.postId,
        );
        location.templateId = this.selectedTemplate;
        this.config.resolve(location);
      }
    },
  },
});
</script>
