$('#currentProject').checkbox(
{
  onChecked: function()
  {
    // Hide the end date
    $('#endDate').hide();
    $('#currentVal').val('true');
  },
  onUnchecked: function()
  {
    $('#endDate').show();
    $('#currentVal').val('false');
  }
});


function openImageSelector()
{
  window.open('/images','mywindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600');
  return false;
}

function setImageUrl(fileUrl)
{
  $("input[name='image']").val(fileUrl);
}


function verifyDate()
{
  // If the project is current, return true, because the back-end will take care of making the start & end dates valid
  if ($('input[name="current"]').val() === "true")
    return true;
  
  // Make Date objects to be compared with
  var startDate = new Date(
    document.querySelector("select[name='startDate[year]']").value,
    document.querySelector("select[name='startDate[month]']").value,
    document.querySelector("select[name='startDate[day]']").value
  );
  
  var endDate = new Date(
    document.querySelector("select[name='endDate[year]']").value,
    document.querySelector("select[name='endDate[month]']").value,
    document.querySelector("select[name='endDate[day]']").value
  );
  
  // Verify that the start is less than or equal to the end date, if so return true
  if (startDate.getTime() <= endDate.getTime())
    return true;
  
  // At this point, we know the dates are invalid, finish the function with an alert then return false
  alert("End date before start date - please choose valid dates");
  
  return false;
}