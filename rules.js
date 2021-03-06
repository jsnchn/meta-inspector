//selectors using https://cheerio.js.org/

//get text from the first h1 tag
function header1($) {
  const text = $('h1').first().text()
  return text
}

//extract an array of relative urls
function anchors($) {
  const urls = []
  //regex for ftp,http,https,javascript,#,mailto, file extensions (this will pass on file extensions with query params)
  const pattern = new RegExp('(((f|ht){1}tp[s]?:\/\/|javascript|#|mailto)[-a-zA-Z0-9@:%_\+.~#?&//=;]+)|#|\.(gif|jpg|jpeg|tiff|png|pdf)$','i')
  $('a').map(function() {
    var href = $(this).attr('href');
    //only unique
    if(urls.indexOf(href) === -1){
      //only relative urls
      if (href && !pattern.test(href)){
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