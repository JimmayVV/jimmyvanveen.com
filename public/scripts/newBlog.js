// Set the styles of the CKEditor
/*CKEDITOR.stylesSet.add( 'default',
[
  { name: 'Fluid Image', element: 'img', attributes: { 'class': 'ui fluid image' } },
  { name: 'Bordered Image', element: 'img', attributes: { 'class': 'ui bordered image' } },
  { name: 'Rounded Image', element: 'img', attributes: { 'class': 'ui rounded image' } },
  { name: 'Centered Image', element: 'img', attributes: { 'class': 'ui centered image' } }
]);*/


// Add the CKEditor to the page
CKEDITOR.replace('newBlogContent',
{
  //stylesSet: ['default', 'jimmys_styles'],
  customConfig: '/scripts/libraries/ckeditor/config.js',
  filebrowserImageBrowseUrl: '/images',
  filebrowserUploadUrl: '/images/upload'
});



// DEPRECATED
/*$("#newBlogContent").ckeditor(null, 
{
  stylesSet: 'jimmys_styles',
  filebrowserImageBrowseUrl: '/images'
});

function openImageWindow()
{
  window.open("/images", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=50,left=50,width=1000,height=650");
}*/