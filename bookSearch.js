const key = "Yp44Rw2ZdofVJsshzCcpCQ";
var searchInfo = '';
var page = 1;

function bookhunt() 
{
	searchInfo = $("#search-bar").val();
	page = 1;
	if(searchInfo =='')
	{
		$(".result").replaceWith('<div class="result">Please Enter Something Before Searching<div class="list"></div></div>');
		document.getElementById("pageTurner").style.display = "none";
	}
	else
	{
		$(".result").replaceWith('<div class="result"><div class="list"></div></div>');
		$.get("https://cors-anywhere.herokuapp.com/" + "https://www.goodreads.com/search/index.xml?q=" 
			  + searchInfo + "&key=" + key + "&page=" + page,function(response)
		{ 
			var count = response.getElementsByTagName("results-end").item(0).textContent;// console.log(count);
			var totals = response.getElementsByTagName("total-results").item(0).textContent;// console.log(totals);
			var bookList = response.getElementsByTagName("best_book"); //console.log(bookList);
			
			for (i = 0; i < bookList.length; i++) 
			{
				var bookInfo = bookList.item(i).children;// console.log(bookInfo);
				var intiger = bookInfo.item(0).textContent;
				var title = bookInfo.item(1).textContent;
				var urlhook = "https://www.goodreads.com/book/show/" + intiger + "." + title; //console.log(urlhook);
				var author = "By: " + bookInfo.item(2).children.item(1).textContent;
				var image = '<img src="' + bookInfo.item(3).innerHTML + '">';
				var entry = '<div class="thisBook">' + image + "<br>" + 
							'<h3><a href="' + urlhook + '">' + title + '</a></h3>' + "<br>" + author + "</div>";
				$(".list").append(entry);
			}
			$("#pageTurner").replaceWith('<div id="pageTurner"><input type="button" class="navibtn" onClick="Prev()" value="<"> ' +
			count + ' out of ' + totals + ' results' + ' <input type="button" class="navibtn" onClick="Next()" value=">"></div>');
			document.getElementById("pageTurner").style.display = "inherit";
		});
	}
}

function Next()
{
	page += 1;
	$(".result").replaceWith('<div class="result"><div class="list"></div></div>');
	$.get("https://cors-anywhere.herokuapp.com/" + "https://www.goodreads.com/search/index.xml?q=" 
		  + searchInfo + "&key=" + key + "&page=" + page,function(response)
	{
		var count = response.getElementsByTagName("results-end").item(0).textContent;
		var totals = response.getElementsByTagName("total-results").item(0).textContent;
		var bookList = response.getElementsByTagName("best_book");
		
		for (i = 0; i < bookList.length; i++) 
		{
			var bookInfo = bookList.item(i).children;
			var intiger = bookInfo.item(0).textContent;
			var title = bookInfo.item(1).textContent;
			var urlhook = "https://www.goodreads.com/book/show/" + intiger + "." + title;
			var author = "By: " + bookInfo.item(2).children.item(1).textContent;
			var image = '<img src="' + bookInfo.item(3).innerHTML + '">';
			var entry = '<div class="thisBook">' + image + "<br>" + 
						'<h3><a href="' + urlhook + '">' + title + '</a></h3>' + "<br>" + author + "</div>";
			$(".list").append(entry);
		}
		$("#pageTurner").replaceWith('<div id="pageTurner"><input type="button" class="navibtn" onClick="Prev()" value="<"> ' +
		count + ' out of ' + totals + ' results' + ' <input type="button" class="navibtn" onClick="Next()" value=">"></div>');
		document.getElementById("pageTurner").style.display = "inherit";
	});
}

function Prev()
{
	if (page != 1)
	{
		page -= 1;
		$(".result").replaceWith('<div class="result"><div class="list"></div></div>');
		$.get("https://cors-anywhere.herokuapp.com/" + "https://www.goodreads.com/search/index.xml?q=" 
			  + searchInfo + "&key=" + key + "&page=" + page,function(response)
		{
			var count = response.getElementsByTagName("results-end").item(0).textContent;
			var totals = response.getElementsByTagName("total-results").item(0).textContent;
			var bookList = response.getElementsByTagName("best_book");
			
			for (i = 0; i < bookList.length; i++) 
			{
				var bookInfo = bookList.item(i).children;
				var intiger = bookInfo.item(0).textContent;
				var title = bookInfo.item(1).textContent;
				var urlhook = "https://www.goodreads.com/book/show/" + intiger + "." + title;
				var author = "By: " + bookInfo.item(2).children.item(1).textContent;
				var image = '<img src="' + bookInfo.item(3).innerHTML + '">';
				var entry = '<div class="thisBook">' + image + "<br>" + 
							'<h3><a href="' + urlhook + '">' + title + '</a></h3>' + "<br>" + author + "</div>";
				$(".list").append(entry);
			}
			$("#pageTurner").replaceWith('<div id="pageTurner"><input type="button" class="navibtn" onClick="Prev()" value="<"> ' +
			count + ' out of ' + totals + ' results' + ' <input type="button" class="navibtn" onClick="Next()" value=">"></div>');
			document.getElementById("pageTurner").style.display = "inherit";
		});
	}
}
