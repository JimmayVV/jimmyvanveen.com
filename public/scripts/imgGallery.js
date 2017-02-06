// Function to copy the contents of the image URL displayed in a text input
function copy(node)
{
  // Get the input element containing the URL
  var input = node.previousElementSibling;
  // Select the string
  input.select();
  // Try to copy it
  try
  {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  }
  catch (err)
  {
    console.log('Oops, unable to copy');
  }
}


// Helper function to get a parameter from the query string.
function getUrlParam( paramName )
{
  var reParam = new RegExp( '(?:[\?&]|&)' + paramName + '=([^&]+)', 'i' );
  var match = window.location.search.match( reParam );

  return ( match && match.length > 1 ) ? match[1] : null;
}


// Function to pass the filename of the selected image back to the CKEditor
function returnFileUrl(fileUrl)
{
  var funcNum = getUrlParam( 'CKEditorFuncNum' );
  
  if (funcNum !== null)
    window.opener.CKEDITOR.tools.callFunction( funcNum, fileUrl );
  else
    window.opener.setImageUrl(fileUrl);
  
  window.close();
}