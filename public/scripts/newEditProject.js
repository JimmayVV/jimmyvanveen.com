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


function verifyDate()
{
  // If the project is current, return true, because the back-end will take care of making the start & end dates valid
  if ($('input[name="current"]').val() === "true")
    return true;
  
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
  
  //alert("" + startDate.getTime() + " <= " + endDate.getTime() + " = " + (startDate.getTime() <= endDate.getTime()));
  
  if (startDate.getTime() <= endDate.getTime())
    return true;
  
  alert("End date before start date - please choose valid dates");
  
  return false;
}