function header1($) {
  const text = $('h1').text()
  return text
}
function anchors($) {
  const urls = []
  //regex for ftp,http,https,javascript,#,mailto
  //TODO: file extensions not working here
  const pattern = new RegExp('(((f|ht){1}tp[s]?:\/\/|javascript|#|mailto)[-a-zA-Z0-9@:%_\+.~#?&//=;]+)|#|(\.\w+$)','i')
  $('a').map(function() {
    var href = $(this).attr('href');
    //only unique
    if(urls.indexOf(href) === -1){
      //only relative urls
      //TODO: also check if url goes to base domain
      if (!pattern.test(href)){
        urls.push(href);
      }
    }
  })
  return urls
}

const RULES = {
  h1: header1,
  a: anchors
}

export default RULES