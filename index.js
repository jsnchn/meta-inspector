import Metascraper from 'metascraper'
import RULES from './rules'


var urlLog = [];
var catalog = [];

function scrape(domain, path, rules){
  Metascraper
    .scrapeUrl(domain+path,rules)
    .then((metadata) => {
      console.log('scraped: ',domain, path)
      console.log('data: ',metadata)
      catalog.push(metadata)
      var continueUrls = metadata.a.filter(function(el){
        if (urlLog.indexOf(el) == -1){
          urlLog.push(el);
          return true
        }
        return false
      });
      if (continueUrls.length != 0){
        // console.log(continueUrls)
        continueUrls.map(function(relPath){scrape(domain, relPath, rules);});
      }
    })
}

function omitRules(){
  const omitRules = ['publisher','type','author','date']
  omitRules.map(function(key){
    delete Metascraper.RULES[key]
  })
}

function scrapeInit(url){
  
  omitRules()
  const allRules = Object.assign({},Metascraper.RULES,RULES)

  var domain = url.match(/http(s?):\/\/([\w]+\.){1}([\w]+\.?)+/i)[0]
  var path = url.replace(domain,'')
  scrape(domain, path, allRules)
  //TODO: promise out the entire recursion of scrape() to get final catalog
}

scrapeInit('http://www.bladeandsoul.com/en/news/costume-design-contest-2017-winner-revealed/');