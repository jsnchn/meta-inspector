import Metascraper from 'metascraper'
import RULES from './rules'

const allRules = Object.assign({},Metascraper.RULES,RULES)
const catalog = [];

function scrape(domain, path){
  Metascraper
    .scrapeUrl(domain+path,allRules)
    .then((metadata) => {
      console.log('scraped: ',domain, path)
      console.log('title',metadata.title)
      var continueUrls = metadata.a.filter(function(el){
        if (catalog.indexOf(el) == -1){
          catalog.push(el);
          return true
        }
        return false
      });
      if (continueUrls.length != 0){
        console.log(continueUrls)
        // continueUrls.map(function(relPath){scrape(domain, relPath);});
      }
    })
}

function scrapeInit(url){
  var domain = url.match(/http(s?):\/\/([\w]+\.){1}([\w]+\.?)+/i)[0]
  var path = url.replace(domain,'')
  scrape(domain, path)
  //TODO: promise out the entire recursion of scrape() to get final catalog
}

scrapeInit('http://www.bladeandsoul.com/en/news/costume-design-contest-2017-winner-revealed/');