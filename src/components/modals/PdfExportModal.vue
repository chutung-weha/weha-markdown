<template>
  <modal-inner aria-label="Xuất ra PDF">
    <div class="modal__content">
      <p>Chọn template rồi nhấn Đồng ý. Trình duyệt sẽ mở <b>hộp thoại in</b> —
        chọn đích "<b>Lưu thành PDF</b>" (Save as PDF) để xuất file.</p>
      <form-entry label="Template">
        <select class="textfield" slot="field" v-model="selectedTemplate" @keydown.enter="resolve()">
          <option v-for="(template, id) in allTemplatesById" :key="id" :value="id">
            {{ template.name }}
          </option>
        </select>
        <div class="form-entry__actions">
          <a href="javascript:void(0)" @click="configureTemplates">Cấu hình template</a>
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
import exportSvc from '../../services/exportSvc';
import modalTemplate from './common/modalTemplate';
import store from '../../store';
import badgeSvc from '../../services/badgeSvc';

// In một chuỗi HTML hoàn chỉnh qua iframe ẩn rồi mở hộp thoại in của trình duyệt.
// Iframe cô lập document để CSS @media print của app (app.scss) không ẩn/phá
// nội dung template, và không bị popup blocker như window.open().
function printHtml(html) {
  return new Promise((resolve) => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('aria-hidden', 'true');
    // Off-screen thay vì display:none để print() hoạt động ổn định mọi trình duyệt
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.left = '-9999px';
    iframe.style.top = '0';

    let cleaned = false;
    const cleanup = () => {
      if (cleaned) {
        return;
      }
      cleaned = true;
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
      resolve();
    };

    iframe.onload = () => {
      const win = iframe.contentWindow;
      const doc = iframe.contentDocument;
      if (!win || !doc) {
        cleanup();
        return;
      }

      // KaTeX dùng web font: phải đợi font tải xong nếu không ký hiệu toán bị vỡ.
      const fontsReady = (doc.fonts && doc.fonts.ready)
        ? doc.fonts.ready.catch(() => {})
        : Promise.resolve();
      // Ảnh remote có thể lỗi/CORS: error vẫn resolve để không treo.
      const imagesReady = Promise.all(Array.from(doc.images || []).map(img => (img.complete
        ? Promise.resolve()
        : new Promise((res) => {
          img.addEventListener('load', res, { once: true });
          img.addEventListener('error', res, { once: true });
        }))));
      // mermaid đã là SVG inline sẵn nên không cần đợi.
      const ready = Promise.all([fontsReady, imagesReady]);
      const timeout = new Promise((res) => { setTimeout(res, 3000); });

      Promise.race([ready, timeout]).then(() => {
        win.addEventListener('afterprint', cleanup, { once: true });
        // Fallback phòng trình duyệt không bắn afterprint (một số Safari)
        setTimeout(cleanup, 60000);
        setTimeout(() => {
          try {
            win.focus();
            win.print();
          } catch (e) {
            cleanup();
          }
        }, 50);
      });
    };

    document.body.appendChild(iframe);
    const idoc = iframe.contentDocument;
    idoc.open();
    idoc.write(html);
    idoc.close();
  });
}

export default modalTemplate({
  computedLocalSettings: {
    selectedTemplate: 'pdfExportTemplate',
  },
  methods: {
    async resolve() {
      this.config.resolve();
      const currentFile = store.getters['file/current'];
      try {
        const html = await exportSvc.applyTemplate(
          currentFile.id,
          this.allTemplatesById[this.selectedTemplate],
          true,
        );
        await printHtml(html);
        badgeSvc.addBadge('exportPdf');
      } catch (err) {
        console.error(err); // eslint-disable-line no-console
        store.dispatch('notification/error', err);
      }
    },
  },
});
</script>
