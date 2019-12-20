const stringToDate =(date)=>{
  var str = date.split("-");
  return new Date(str[2], str[1] - 1, str[0]);
  }
  const toDateString =(date)=>{
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    } 
    if (mm < 10) {
      mm = '0' + mm;
    } 
    return `${yyyy}-${mm}-${dd}`;
  }
const curTimeToString = () =>{
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;  
  var day = date.getDate();
  var hour = date.getHours();
  var minutes = date.getMinutes();
  var secconds = date.getSeconds()
  
  return `${month}${day}${year}${hour}${minutes}${secconds}`; 
}

  export {toDateString, stringToDate,curTimeToString};
