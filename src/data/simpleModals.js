const simpleModal = (contentHtml, rejectText, resolveText) => ({
  contentHtml: typeof contentHtml === 'function' ? contentHtml : () => contentHtml,
  rejectText,
  resolveText,
});

/* eslint sort-keys: "error" */
export default {
  commentDeletion: simpleModal(
    '<p>Bạn sắp xoá một bình luận. Bạn có chắc không?</p>',
    'Không',
    'Có, xoá',
  ),
  discussionDeletion: simpleModal(
    '<p>Bạn sắp xoá một thảo luận. Bạn có chắc không?</p>',
    'Không',
    'Có, xoá',
  ),
  fileRestoration: simpleModal(
    '<p>Bạn sắp hoàn tác một số thay đổi. Bạn có chắc không?</p>',
    'Không',
    'Có, hoàn tác',
  ),
  folderDeletion: simpleModal(
    config => `<p>Bạn sắp xoá thư mục <b>${config.item.name}</b>. Các file bên trong sẽ được chuyển vào Thùng rác. Bạn có chắc không?</p>`,
    'Không',
    'Có, xoá',
  ),
  pathConflict: simpleModal(
    config => `<p><b>${config.item.name}</b> đã tồn tại. Bạn có muốn thêm hậu tố không?</p>`,
    'Không',
    'Có, thêm hậu tố',
  ),
  paymentSuccess: simpleModal(
    '<h3>Cảm ơn bạn đã thanh toán!</h3><p>Gói tài trợ của bạn sẽ được kích hoạt trong giây lát.</p>',
    'Đồng ý',
  ),
  providerRedirection: simpleModal(
    config => `<p>Bạn sắp được chuyển đến trang uỷ quyền của <b>${config.name}</b>.</p>`,
    'Huỷ',
    'Tiếp tục',
  ),
  removeWorkspace: simpleModal(
    '<p>Bạn sắp gỡ một workspace khỏi máy cục bộ. Bạn có chắc không?</p>',
    'Không',
    'Có, gỡ',
  ),
  reset: simpleModal(
    '<p>Thao tác này sẽ xoá toàn bộ workspace cục bộ của bạn. Bạn có chắc không?</p>',
    'Không',
    'Có, xoá',
  ),
  signInForComment: simpleModal(
    `<p>Bạn cần đăng nhập bằng Google để bắt đầu bình luận.</p>
    <div class="modal__info"><b>Lưu ý:</b> Thao tác này sẽ đồng bộ workspace chính của bạn.</div>`,
    'Huỷ',
    'Đăng nhập',
  ),
  signInForSponsorship: simpleModal(
    `<p>Bạn cần đăng nhập bằng Google để tài trợ.</p>
    <div class="modal__info"><b>Lưu ý:</b> Thao tác này sẽ đồng bộ workspace chính của bạn.</div>`,
    'Huỷ',
    'Đăng nhập',
  ),
  sponsorOnly: simpleModal(
    '<p>Tính năng này chỉ dành cho nhà tài trợ vì nó sử dụng tài nguyên máy chủ.</p>',
    'Đã hiểu',
  ),
  stripName: simpleModal(
    config => `<p><b>${config.item.name}</b> chứa ký tự không hợp lệ. Bạn có muốn loại bỏ chúng không?</p>`,
    'Không',
    'Có, loại bỏ',
  ),
  tempFileDeletion: simpleModal(
    config => `<p>Bạn sắp xoá vĩnh viễn file tạm <b>${config.item.name}</b>. Bạn có chắc không?</p>`,
    'Không',
    'Có, xoá',
  ),
  tempFolderDeletion: simpleModal(
    '<p>Bạn sắp xoá vĩnh viễn tất cả file tạm. Bạn có chắc không?</p>',
    'Không',
    'Có, xoá hết',
  ),
  trashDeletion: simpleModal(
    '<p>Các file trong Thùng rác sẽ tự động bị xoá sau 7 ngày không hoạt động.</p>',
    'Đồng ý',
  ),
  unauthorizedName: simpleModal(
    config => `<p><b>${config.item.name}</b> là một tên không được phép.</p>`,
    'Đồng ý',
  ),
  workspaceGoogleRedirection: simpleModal(
    '<p>Weha Markdown cần quyền truy cập đầy đủ vào Google Drive để mở workspace này.</p>',
    'Huỷ',
    'Cấp quyền',
  ),
};
