class Feature {
  constructor(id, badgeName, description, children = null) {
    this.id = id;
    this.badgeName = badgeName;
    this.description = description;
    this.children = children;
  }

  toBadge(badgeCreations) {
    const children = this.children
      ? this.children.map(child => child.toBadge(badgeCreations))
      : null;
    return {
      featureId: this.id,
      name: this.badgeName,
      description: this.description,
      children,
      isEarned: children
        ? children.every(child => child.isEarned)
        : !!badgeCreations[this.id],
      hasSomeEarned: children && children.some(child => child.isEarned),
    };
  }
}

export default [
  new Feature(
    'navigationBar',
    'Chuyên gia thanh điều hướng',
    'Làm chủ thanh điều hướng bằng cách định dạng Markdown và đổi tên file hiện tại.',
    [
      new Feature(
        'formatButtons',
        'Nhà định dạng',
        'Dùng các nút định dạng để thay đổi định dạng trong file Markdown của bạn.',
      ),
      new Feature(
        'editCurrentFileName',
        'Người đổi tên',
        'Dùng ô tên trên thanh điều hướng để đổi tên file hiện tại.',
      ),
      new Feature(
        'toggleExplorer',
        'Bật/tắt trình quản lý',
        'Dùng thanh điều hướng để bật/tắt trình quản lý file.',
      ),
      new Feature(
        'toggleSideBar',
        'Bật/tắt thanh bên',
        'Dùng thanh điều hướng để bật/tắt thanh bên.',
      ),
    ],
  ),
  new Feature(
    'explorer',
    'Trình quản lý file',
    'Dùng trình quản lý file để quản lý file và thư mục trong workspace.',
    [
      new Feature(
        'createFile',
        'Người tạo file',
        'Dùng trình quản lý file để tạo file mới trong workspace.',
      ),
      new Feature(
        'switchFile',
        'Người chuyển file',
        'Dùng trình quản lý file để chuyển qua lại giữa các file trong workspace.',
      ),
      new Feature(
        'createFolder',
        'Người tạo thư mục',
        'Dùng trình quản lý file để tạo thư mục mới trong workspace.',
      ),
      new Feature(
        'moveFile',
        'Người di chuyển file',
        'Kéo một file trong trình quản lý file để chuyển sang thư mục khác.',
      ),
      new Feature(
        'moveFolder',
        'Người di chuyển thư mục',
        'Kéo một thư mục trong trình quản lý file để chuyển sang thư mục khác.',
      ),
      new Feature(
        'renameFile',
        'Người đổi tên file',
        'Dùng trình quản lý file để đổi tên một file trong workspace.',
      ),
      new Feature(
        'renameFolder',
        'Người đổi tên thư mục',
        'Dùng trình quản lý file để đổi tên một thư mục trong workspace.',
      ),
      new Feature(
        'removeFile',
        'Người xoá file',
        'Dùng trình quản lý file để xoá một file trong workspace.',
      ),
      new Feature(
        'removeFolder',
        'Người xoá thư mục',
        'Dùng trình quản lý file để xoá một thư mục trong workspace.',
      ),
    ],
  ),
  new Feature(
    'buttonBar',
    'Chuyên gia thanh nút',
    'Dùng thanh nút để tuỳ biến bố cục editor và bật/tắt các tính năng.',
    [
      new Feature(
        'toggleNavigationBar',
        'Bật/tắt thanh điều hướng',
        'Dùng thanh nút để bật/tắt thanh điều hướng.',
      ),
      new Feature(
        'toggleSidePreview',
        'Bật/tắt xem trước',
        'Dùng thanh nút để bật/tắt khung xem trước bên cạnh.',
      ),
      new Feature(
        'toggleEditor',
        'Bật/tắt trình soạn thảo',
        'Dùng thanh nút để bật/tắt trình soạn thảo.',
      ),
      new Feature(
        'toggleFocusMode',
        'Tập trung',
        'Dùng thanh nút để bật/tắt chế độ tập trung. Ở chế độ này, con trỏ luôn được căn giữa theo chiều dọc khi bạn gõ.',
      ),
      new Feature(
        'toggleScrollSync',
        'Bật/tắt đồng bộ cuộn',
        'Dùng thanh nút để bật/tắt đồng bộ cuộn — tính năng này liên kết thanh cuộn của editor và phần xem trước.',
      ),
      new Feature(
        'toggleStatusBar',
        'Bật/tắt thanh trạng thái',
        'Dùng thanh nút để bật/tắt thanh trạng thái.',
      ),
    ],
  ),
  new Feature(
    'signIn',
    'Đã đăng nhập',
    'Đăng nhập bằng Google, đồng bộ workspace chính và mở khoá các tính năng.',
    [
      new Feature(
        'syncMainWorkspace',
        'Workspace chính đã đồng bộ',
        'Đăng nhập bằng Google để đồng bộ workspace chính với thư mục app data của Google Drive.',
      ),
      new Feature(
        'sponsor',
        'Người tài trợ',
        'Đăng nhập bằng Google và tài trợ Weha Markdown để mở khoá tính năng xuất PDF và Pandoc.',
      ),
    ],
  ),
  new Feature(
    'workspaces',
    'Chuyên gia workspace',
    'Dùng menu workspace để tạo và quản lý mọi loại workspace.',
    [
      new Feature(
        'addCouchdbWorkspace',
        'Tạo workspace CouchDB',
        'Dùng menu workspace để tạo một workspace CouchDB.',
      ),
      new Feature(
        'addGithubWorkspace',
        'Tạo workspace GitHub',
        'Dùng menu workspace để tạo một workspace GitHub.',
      ),
      new Feature(
        'addGitlabWorkspace',
        'Tạo workspace GitLab',
        'Dùng menu workspace để tạo một workspace GitLab.',
      ),
      new Feature(
        'addGoogleDriveWorkspace',
        'Tạo workspace Google Drive',
        'Dùng menu workspace để tạo một workspace Google Drive.',
      ),
      new Feature(
        'renameWorkspace',
        'Đổi tên workspace',
        'Dùng hộp thoại "Quản lý workspace" để đổi tên một workspace.',
      ),
      new Feature(
        'removeWorkspace',
        'Xoá workspace',
        'Dùng hộp thoại "Quản lý workspace" để xoá workspace khỏi máy cục bộ.',
      ),
    ],
  ),
  new Feature(
    'manageAccounts',
    'Quản lý tài khoản',
    'Liên kết mọi loại tài khoản ngoài và dùng hộp thoại "Tài khoản" để quản lý.',
    [
      new Feature(
        'addBloggerAccount',
        'Người dùng Blogger',
        'Liên kết tài khoản Blogger của bạn với Weha Markdown.',
      ),
      new Feature(
        'addDropboxAccount',
        'Người dùng Dropbox',
        'Liên kết tài khoản Dropbox của bạn với Weha Markdown.',
      ),
      new Feature(
        'addGitHubAccount',
        'Người dùng GitHub',
        'Liên kết tài khoản GitHub của bạn với Weha Markdown.',
      ),
      new Feature(
        'addGitLabAccount',
        'Người dùng GitLab',
        'Liên kết tài khoản GitLab của bạn với Weha Markdown.',
      ),
      new Feature(
        'addGoogleDriveAccount',
        'Người dùng Google Drive',
        'Liên kết tài khoản Google Drive của bạn với Weha Markdown.',
      ),
      new Feature(
        'addGooglePhotosAccount',
        'Người dùng Google Photos',
        'Liên kết tài khoản Google Photos của bạn với Weha Markdown.',
      ),
      new Feature(
        'addWordpressAccount',
        'Người dùng WordPress',
        'Liên kết tài khoản WordPress của bạn với Weha Markdown.',
      ),
      new Feature(
        'addZendeskAccount',
        'Người dùng Zendesk',
        'Liên kết tài khoản Zendesk của bạn với Weha Markdown.',
      ),
      new Feature(
        'removeAccount',
        'Người gỡ quyền',
        'Dùng hộp thoại "Tài khoản" để gỡ quyền truy cập của tài khoản ngoài.',
      ),
    ],
  ),
  new Feature(
    'syncFiles',
    'Đồng bộ file',
    'Làm chủ menu "Đồng bộ" bằng cách mở và lưu file với mọi loại tài khoản ngoài.',
    [
      new Feature(
        'openFromDropbox',
        'Đọc từ Dropbox',
        'Dùng menu "Đồng bộ" để mở file từ tài khoản Dropbox của bạn.',
      ),
      new Feature(
        'saveOnDropbox',
        'Ghi vào Dropbox',
        'Dùng menu "Đồng bộ" để lưu file vào tài khoản Dropbox của bạn.',
      ),
      new Feature(
        'openFromGithub',
        'Đọc từ GitHub',
        'Dùng menu "Đồng bộ" để mở file từ một repository GitHub.',
      ),
      new Feature(
        'saveOnGithub',
        'Ghi vào GitHub',
        'Dùng menu "Đồng bộ" để lưu file vào một repository GitHub.',
      ),
      new Feature(
        'saveOnGist',
        'Ghi vào Gist',
        'Dùng menu "Đồng bộ" để lưu file vào một Gist.',
      ),
      new Feature(
        'openFromGitlab',
        'Đọc từ GitLab',
        'Dùng menu "Đồng bộ" để mở file từ một repository GitLab.',
      ),
      new Feature(
        'saveOnGitlab',
        'Ghi vào GitLab',
        'Dùng menu "Đồng bộ" để lưu file vào một repository GitLab.',
      ),
      new Feature(
        'openFromGoogleDrive',
        'Đọc từ Google Drive',
        'Dùng menu "Đồng bộ" để mở file từ tài khoản Google Drive của bạn.',
      ),
      new Feature(
        'saveOnGoogleDrive',
        'Ghi vào Google Drive',
        'Dùng menu "Đồng bộ" để lưu file vào tài khoản Google Drive của bạn.',
      ),
      new Feature(
        'triggerSync',
        'Kích hoạt đồng bộ',
        'Dùng menu "Đồng bộ" hoặc thanh điều hướng để đồng bộ thủ công.',
      ),
      new Feature(
        'syncMultipleLocations',
        'Đa đồng bộ',
        'Dùng menu "Đồng bộ" để đồng bộ một file với nhiều vị trí ngoài.',
      ),
      new Feature(
        'removeSyncLocation',
        'Người gỡ đồng bộ',
        'Dùng hộp thoại "Đồng bộ file" để gỡ một vị trí đồng bộ.',
      ),
    ],
  ),
  new Feature(
    'publishFiles',
    'Xuất bản file',
    'Làm chủ menu "Xuất bản" bằng cách xuất bản file lên mọi loại tài khoản ngoài.',
    [
      new Feature(
        'publishToBlogger',
        'Xuất bản lên Blogger',
        'Dùng menu "Xuất bản" để xuất bản một bài Blogger.',
      ),
      new Feature(
        'publishToBloggerPage',
        'Xuất bản trang Blogger',
        'Dùng menu "Xuất bản" để xuất bản một trang Blogger.',
      ),
      new Feature(
        'publishToDropbox',
        'Xuất bản lên Dropbox',
        'Dùng menu "Xuất bản" để đăng file lên tài khoản Dropbox của bạn.',
      ),
      new Feature(
        'publishToGithub',
        'Xuất bản lên GitHub',
        'Dùng menu "Xuất bản" để đăng file lên một repository GitHub.',
      ),
      new Feature(
        'publishToGist',
        'Xuất bản lên Gist',
        'Dùng menu "Xuất bản" để đăng file lên một Gist.',
      ),
      new Feature(
        'publishToGitlab',
        'Xuất bản lên GitLab',
        'Dùng menu "Xuất bản" để đăng file lên một repository GitLab.',
      ),
      new Feature(
        'publishToGoogleDrive',
        'Xuất bản lên Google Drive',
        'Dùng menu "Xuất bản" để đăng file lên tài khoản Google Drive của bạn.',
      ),
      new Feature(
        'publishToWordPress',
        'Xuất bản lên WordPress',
        'Dùng menu "Xuất bản" để đăng một bài WordPress.',
      ),
      new Feature(
        'publishToZendesk',
        'Xuất bản lên Zendesk',
        'Dùng menu "Xuất bản" để đăng một bài Trung tâm trợ giúp Zendesk.',
      ),
      new Feature(
        'triggerPublish',
        'Người cập nhật xuất bản',
        'Dùng menu "Xuất bản" hoặc thanh điều hướng để cập nhật xuất bản thủ công.',
      ),
      new Feature(
        'publishMultipleLocations',
        'Đa xuất bản',
        'Dùng menu "Xuất bản" để đăng một file lên nhiều vị trí ngoài.',
      ),
      new Feature(
        'removePublishLocation',
        'Người huỷ xuất bản',
        'Dùng hộp thoại "Xuất bản file" để gỡ một vị trí xuất bản.',
      ),
    ],
  ),
  new Feature(
    'manageHistory',
    'Người lưu trữ',
    'Dùng menu "Lịch sử file" để xem lịch sử phiên bản và khôi phục phiên bản cũ của file hiện tại.',
    [
      new Feature(
        'restoreVersion',
        'Người khôi phục',
        'Dùng menu "Lịch sử file" để khôi phục một phiên bản cũ của file hiện tại.',
      ),
      new Feature(
        'chooseHistory',
        'Người chọn lịch sử',
        'Chọn một lịch sử khác cho file đang được đồng bộ với nhiều vị trí ngoài.',
      ),
    ],
  ),
  new Feature(
    'manageProperties',
    'Chuyên gia thuộc tính',
    'Dùng hộp thoại "Thuộc tính file" để thay đổi thuộc tính của file hiện tại.',
    [
      new Feature(
        'setMetadata',
        'Người đặt metadata',
        'Dùng hộp thoại "Thuộc tính file" để đặt metadata cho file hiện tại.',
      ),
      new Feature(
        'changePreset',
        'Người đổi preset',
        'Dùng hộp thoại "Thuộc tính file" để đổi preset của engine Markdown.',
      ),
      new Feature(
        'changeExtension',
        'Chuyên gia tiện ích mở rộng',
        'Dùng hộp thoại "Thuộc tính file" để bật, tắt hoặc cấu hình tiện ích mở rộng của engine Markdown.',
      ),
    ],
  ),
  new Feature(
    'comment',
    'Chuyên gia bình luận',
    'Bắt đầu và đóng thảo luận, thêm và gỡ bình luận.',
    [
      new Feature(
        'createDiscussion',
        'Người mở thảo luận',
        'Dùng nút "bình luận" để bắt đầu một thảo luận mới.',
      ),
      new Feature(
        'addComment',
        'Người bình luận',
        'Dùng máng thảo luận để thêm bình luận vào một thảo luận có sẵn.',
      ),
      new Feature(
        'removeComment',
        'Người kiểm duyệt',
        'Dùng máng thảo luận để gỡ một bình luận trong thảo luận.',
      ),
      new Feature(
        'removeDiscussion',
        'Người đóng thảo luận',
        'Dùng máng thảo luận để đóng một thảo luận.',
      ),
    ],
  ),
  new Feature(
    'importExport',
    'Nhập/xuất',
    'Dùng menu "Nhập/xuất" để nhập và xuất file.',
    [
      new Feature(
        'importMarkdown',
        'Người nhập Markdown',
        'Dùng menu "Nhập/xuất" để nhập một file Markdown từ đĩa.',
      ),
      new Feature(
        'exportMarkdown',
        'Người xuất Markdown',
        'Dùng menu "Nhập/xuất" để xuất một file Markdown ra đĩa.',
      ),
      new Feature(
        'importHtml',
        'Người nhập HTML',
        'Dùng menu "Nhập/xuất" để nhập một file HTML từ đĩa và chuyển thành Markdown.',
      ),
      new Feature(
        'exportHtml',
        'Người xuất HTML',
        'Dùng menu "Nhập/xuất" để xuất file ra đĩa dưới dạng HTML qua template Handlebars.',
      ),
      new Feature(
        'exportPdf',
        'Người xuất PDF',
        'Dùng menu "Nhập/xuất" để xuất file ra đĩa dưới dạng PDF.',
      ),
      new Feature(
        'exportPandoc',
        'Người xuất Pandoc',
        'Dùng menu "Nhập/xuất" để xuất file ra đĩa bằng Pandoc.',
      ),
    ],
  ),
  new Feature(
    'manageSettings',
    'Chuyên gia thiết lập',
    'Dùng hộp thoại "Thiết lập" để tinh chỉnh hành vi ứng dụng và đổi phím tắt.',
    [
      new Feature(
        'changeSettings',
        'Người tinh chỉnh',
        'Dùng hộp thoại "Thiết lập" để tinh chỉnh hành vi ứng dụng.',
      ),
      new Feature(
        'changeShortcuts',
        'Người đổi phím tắt',
        'Dùng hộp thoại "Thiết lập" để đổi phím tắt.',
      ),
    ],
  ),
  new Feature(
    'manageTemplates',
    'Chuyên gia template',
    'Dùng hộp thoại "Template" để tạo, xoá hoặc chỉnh sửa template Handlebars.',
    [
      new Feature(
        'addTemplate',
        'Người tạo template',
        'Dùng hộp thoại "Template" để tạo một template Handlebars.',
      ),
      new Feature(
        'removeTemplate',
        'Người xoá template',
        'Dùng hộp thoại "Template" để xoá một template Handlebars.',
      ),
    ],
  ),
];
