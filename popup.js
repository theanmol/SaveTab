function SaveProfile(event) {
	
	chrome.tabs.query( {currentWindow:true},function(arr_tabs){

		//console.log(arr_tabs);

		var ProfileName = document.getElementById("tabProfile").value;	
		if(!ProfileName){
			ProfileName = Date();
			ProfileName = ProfileName.slice(4,25);	
		}
		var tabs = [];

        for (var i = 0; i < arr_tabs.length ; i++) {		 //gettig the icon info ,url and name from tab
        		
        	var obj = { "url" : arr_tabs[i].url , "icon_url" :arr_tabs[i].favIconUrl , "title" : arr_tabs[i].title };

            tabs.push(obj);
        }
       
        console.log(tabs);

		var Profile = {};
		Profile[ProfileName] = tabs;						//storing the info  with key ProfileName
		chrome.storage.sync.set(Profile ,function() {
          // Notify that we saved.
		DisplayList();
		// alert('Settings saved');});
 		});
		StatusMessage.showMessage('Tabs Profile added', 1000);
	});		
}

function DisplayList() {

	$('#savedTabs #list li').remove();

	chrome.storage.sync.get(null, function(items) {
	    console.log("here");
	    var i=1;
	    $.each(items, function(key,item) {
	    	
			$('#savedTabs #list').append('<li> <span id="trash_'+i+'" class="glyphicon glyphicon-trash trash" ></span> <span id="item_'+i+'" >'+key+' </span> <span  id="arrow_'+i+'" class="glyphicon glyphicon-triangle-right arrow" ></span></li>')
			//console.log(item);
			
			$('#item_'+i).click(function (event){
				
				OpenWindow(event, item )
			});

			$('#trash_'+i).click(function (event){

				DeleteProfile(key);
			})

			$('#arrow_'+i).click(function (event){


				$('.subList').remove();
				

				$('.arrow').not(this).removeClass('glyphicon-triangle-bottom');
				$('.arrow').not(this).addClass('glyphicon-triangle-right');
				$(this).toggleClass('glyphicon-triangle-right glyphicon-triangle-bottom');

				if($(this).hasClass('glyphicon-triangle-right')){
					console.log("hello hey ");
					return;
				};
				
				$(this).parent().append('<ul class="subList"> </ul>');
				ShowTabList(event, item ,key)
			});			

			i++;

		});
	});
}

function DeleteProfile(key){

	chrome.storage.sync.remove(key, function() {

		 StatusMessage.showMessage('Profile deleted', 1000);
		 DisplayList();
    });


}

function ShowTabList(event , item ,key){

	console.log("pressing the arrow");
	console.log(item);

	
	$.each(item, function(i,tab) {


			$('.subList').append('<li class="subListLi" ><span class="cross" id="cross_'+i+'">X</span><img src="'+tab['icon_url']+'"></img>  <span class="href" val="'+tab['url']+'" >'+item[i]['title']+' </span></li>');

			$('#cross_'+i).click(function (event){
				//console.log(event);
				RemoveTab(event, item ,tab ,key);
			});
	});
	$('.href').click(function(){

		var newURL = $(this).attr("val");
		chrome.tabs.create({ url: newURL });
	})

}

function RemoveTab(event , item ,tab ,key){

	console.log(item);
	console.log(tab);

	for(var i=0; i<item.length; i++){
        if(item[i] === tab){
            item.splice(i, 1);  
            break;
        }
    }

    $('.subList li ').remove();
    ShowTabList(event, item ,key);
    console.log(item);

    if(item.length === 0)
    {
    	DeleteProfile(key);
    	return;
    }

    chrome.storage.sync.remove(key, function() {

    	var obj = {};
    	obj[key] = item;
    	chrome.storage.sync.set( obj, function() {
        

    	});

    });
	
    StatusMessage.showMessage('Tab removed', 1000);
}

function OpenWindow(event , item) {


	//console.log(item);
	var array_url = [];

	$.each(item, function(i,tab) {

		console.log(tab["url"]);
		array_url.push(tab["url"]);
	});

	chrome.windows.create({ url : array_url })




}

document.addEventListener('DOMContentLoaded', function () {


	/*	chrome.storage.sync.clear(function() {
			console.log("cleared");
		});
	*/
	//document.getElementById("tabProfile").value ;	
	document.getElementById("save_button").addEventListener("click", SaveProfile);
	$("#tabProfile").keydown(function(event){
        if (event.keyCode == '13') {
          SaveProfile();
        }
      });
	
	


	DisplayList();

	



	
	
});
	