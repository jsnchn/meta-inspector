import Metascraper from 'metascraper'
import RULES from './rules'

const allRules = Object.assign({},Metascraper.RULES,RULES)

Metascraper
  .scrapeUrl('http://www.bladeandsoul.com/en/news/dawn-of-the-lost-continent-patch-notes/',allRules)
  .then((metadata) => {
    console.log(metadata)  
  })