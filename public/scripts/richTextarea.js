// Add the CKEditor to the page
CKEDITOR.replace('editContent',
{
  customConfig: '/scripts/libraries/ckeditor/config.js',
  filebrowserImageBrowseUrl: '/images',
  filebrowserUploadUrl: '/images/upload'
});