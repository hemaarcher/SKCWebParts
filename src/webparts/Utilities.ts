
export const FormatDate = (date): string => {
    var date1 = new Date(date);
    var year = date1.getFullYear();
    var month = (1 + date1.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date1.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return month + '/' + day + '/' + year;
  };

 
  export const CleanString =(strInput: string) : string => {
    if( strInput !== null && strInput !== undefined ){  
     var htmlClear = strInput.replace('<p>','\n');
     htmlClear = htmlClear.replace('</p>',"\n");
     htmlClear = htmlClear.replace(/<[^>]+>/g, '');      
         htmlClear = htmlClear.replace(/&#58;/g,':');
         htmlClear = htmlClear.replace(/&#160;&#160;/g,'\n');
         htmlClear = htmlClear.replace(/&#160;/g,'-');         
     return  htmlClear;
    }
    else
    return null;
     
   };