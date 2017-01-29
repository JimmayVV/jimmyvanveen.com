$('#upload-btn').on('click', function ()
{
    $('#upload-input').click();
    $('#uploadProgress .label').text('0%');
    $('#uploadProgress').progress({
      percent: 0
    });
});


// Process the image upload
$('#upload-input').on('change', function()
{
  var files = $(this).get(0).files;

  // We are not allowing multiple files, so make sure only 1 file was detected 
  if (files.length == 1)
  {
    // Make a FormData object, to be used with ajax
    var formData = new FormData();

    // Add the file to the formData object using the 1st element of the files array
    formData.append('file', files[0], files[0].name);

    // Upload the file using jquery ajax
    uploadFile(formData);

  } // End if files.length ==1
});


// This is the function that will be called to process the ajax request
var uploadFile = function(formData)
{
    $.ajax(
    {
      url: '/images/upload',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data)
      {
        console.log('upload successful!\n' + data);
      },
      error: function(data)
      {
        console.log("Error\n\n" + JSON.stringify(data));
      },
      xhr: function()
      {
        // create an XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // listen to the 'progress' event
        xhr.upload.addEventListener('progress', function(evt)
        {
          if (evt.lengthComputable)
          {
            // calculate the percentage of upload completed
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);

            // update the Bootstrap progress bar with the new percentage
            $('#uploadProgress').progress({
              percent: percentComplete
            });

            // once the upload reaches 100%, set the progress bar text to done
            if (percentComplete === 100)
            {
              $('#uploadProgress .label').text('Done');
            }

          }

        }, false);

        return xhr;
      }
    });
};


/*angular.module('fileUpload', ['ngFileUpload'])
    .controller('MyCtrl',['Upload','$window',function(Upload,$window){
        var vm = this;
        vm.submit = function(){ //function to call on form submit
            if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
                vm.upload(vm.file); //call upload function
            }
        };
        vm.upload = function (file) {
            Upload.upload({
                url: '/images/upload', //webAPI exposed to upload the file
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){ //validate success
                    $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                } else {
                    $window.alert('an error occured:' + JSON.stringify(resp.data.err_desc));
                }
            }, function (resp) { //catch error
                console.log('Error status: ' + resp.status);
                $window.alert('Error status: ' + resp.status);
            }, function (evt) { 
                //console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                vm.progress = progressPercentage; // capture upload progress
            });
        };
    }]);*/

/*
TODO: get this or something similar to work so that we can update the progress bar
I need to learn Angular better
function update()
{
  $('#uploadProgress').progress();
  console.log($('#uploadProgress').attr('data-value'));
  setTimeout(update, 200);
}*/