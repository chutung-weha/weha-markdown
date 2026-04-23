<template>
  <modal-inner aria-label="Liên kết tài khoản Zendesk">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="zendesk"></icon-provider>
      </div>
      <p>Liên kết tài khoản <b>Zendesk</b> của bạn với <b>Weha Markdown</b>.</p>
      <form-entry label="URL trang web" error="siteUrl">
        <input slot="field" class="textfield" type="text" v-model.trim="siteUrl" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>Ví dụ:</b> https://example.zendesk.com/
        </div>
      </form-entry>
      <form-entry label="Client Unique Identifier" error="clientId">
        <input slot="field" class="textfield" type="text" v-model.trim="clientId" @keydown.enter="resolve()">
        <div class="form-entry__info">
          Bạn cần cấu hình một OAuth Client với redirect URL <b>{{redirectUrl}}</b>
        </div>
        <div class="form-entry__actions">
          <a href="https://support.zendesk.com/hc/en-us/articles/203663836" target="_blank">Thông tin thêm</a>
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
import modalTemplate from '../common/modalTemplate';
import constants from '../../../data/constants';

export default modalTemplate({
  data: () => ({
    redirectUrl: constants.oauth2RedirectUri,
  }),
  computedLocalSettings: {
    siteUrl: 'zendeskSiteUrl',
    clientId: 'zendeskClientId',
  },
  methods: {
    resolve() {
      if (!this.siteUrl) {
        this.setError('siteUrl');
      }
      if (!this.clientId) {
        this.setError('clientId');
      }
      if (this.siteUrl && this.clientId) {
        const parsedUrl = this.siteUrl.match(/^https:\/\/([^.]+)\.zendesk\.com/);
        if (!parsedUrl) {
          this.setError('siteUrl');
        } else {
          this.config.resolve({
            subdomain: parsedUrl[1],
            clientId: this.clientId,
          });
        }
      }
    },
  },
});
</script>
