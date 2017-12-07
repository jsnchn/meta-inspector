function header1($) {
  const text = $('h1').text()
  return text
}
function anchors($) {
  const urls = []
  $('a').map(function() {
    if(urls.indexOf($(this).attr('href')) === -1){
      urls.push($(this).attr('href'));
    }
  })
  return urls
}

const RULES = {
  h1: header1,
  a: anchors
}

export default RULES