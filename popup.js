function onClicked(event) {
	
	chrome.tabs.query( {currentWindow:true},function(arr_tabs){

		//console.log(arr_tabs);
		var ProfileName = document.getElementById("tabProfile").value;	
		
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
          chrome.storage.sync.getBytesInUse(null, function (bytesInUse){
          		console.log(bytesInUse);
          });


          alert('Settings saved');});

 });
}
function showProfiles(event) {

	chrome.storage.sync.get(null, function(items) {
    //var allKeys = Object.keys(items);
    console.log(items);
	});
}
document.addEventListener('DOMContentLoaded', function () {


		chrome.storage.sync.clear(function() {
			console.log("cleared");
		});

		document.getElementById("tabProfile").value = Date();	
		document.getElementById("save_button").addEventListener("click", onClicked);

		 $("#show").click(showProfiles);
});
		
