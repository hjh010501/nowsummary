var cheerio = require('cheerio')
var request = require('request')
var Iconv1 = require('iconv').Iconv

var url = 'https://news.naver.com';
var title = new Array();
var link = new Array();
var description = new Array();

async function getlinks() {
    request({url, encoding: null}, function(error, response, html) {

        iconv = new Iconv1('euc-kr', 'UTF-8//IGNORE');
    
        var htmlDoc = iconv.convert(html).toString();
        var $ = cheerio.load(htmlDoc);
    
        for(var i = 0; i < 10; i++) {
            $('[class="nclicks(hom.headcont)"]').each(function(){
                var news = $(this);
                if(news.attr("href").indexOf("read.nhn") != -1 || news.attr("href") != undefined) {
                    var news_title = news.text();
                    var news_link = news.attr("href");
                    title[i] = news_title.trim();
                    link[i] = news_link;
                    i++;
                } else {
    
                }
            })
            
        }
        for(var i = 0; i < title.length; i++) {
            console.log("title : " + title[i] +"\nlink:" + link[i]);
        
            request({url: 'https://news.naver.com/main/read.nhn?oid=001&sid1=102&aid=0010417461&mid=shm&mode=LSD&nh=20181022152307', encoding: null}, function(error, response, html2) {
    
            iconv2 = new Iconv1('euc-kr', 'UTF-8//IGNORE');
            
            var htmlDoc = iconv2.convert(html2).toString();
            var $ = cheerio.load(htmlDoc);
 
                $('#articleBodyContents').each(function(){
                    var news = $(this);
                    var news_description = news.text().trim();
                    description[i] = news_description;
                    console.log(news_description)
                })
         
            })
         }
         document.getElementById('one').innerText = title[0]
         document.getElementById('two').innerText = title[1]
         document.getElementById('three').innerText = title[2]



    });
}

getlinks();

// console.log(title.length);
// for(var i = 0; i < title.length; i++) {
//     console.log("title : " + title[i] +"\nlink:" + link[i] + "\ndescription : " + description[i]);
//  }


