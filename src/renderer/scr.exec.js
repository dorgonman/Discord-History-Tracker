document.addEventListener("DOMContentLoaded", () => {
  DISCORD.setup();
  GUI.setup();
  
  GUI.onFileUploaded(files => {
    if (files.length === 1){
      UTILS.readJsonFile(files[0], (obj, file) => {
        if (SAVEFILE.isValid(obj)){
          STATE.uploadFile(new SAVEFILE(obj));
        }
        else{
          alert((obj ? "File '{}' has an invalid format." : "Could not parse '{}', see console for details.").replace("{}", file.name));
        }
      });
    }
    else{
      alert("Please, select only one file.");
    }
    
    return true;
  });
  
  GUI.onOptionMessagesPerPageChanged(() => {
    STATE.setMessagesPerPage(GUI.getOptionMessagesPerPage());
  });
  
  STATE.setMessagesPerPage(GUI.getOptionMessagesPerPage());
  
  GUI.onNavigationButtonClicked(action => {
    STATE.updateCurrentPage(action);
  });
  
  STATE.onChannelsRefreshed(channels => {
    GUI.updateChannelList(channels, STATE.selectChannel);
  });
  
  STATE.onMessagesRefreshed(messages => {
    GUI.updateNavigation(STATE.getCurrentPage(), STATE.getPageCount());
    GUI.updateMessageList(messages);
    GUI.scrollMessagesToTop();
  });


  //var xmlhttp = new XMLHttpRequest();
  //var url = 'http://horizon-studio.net/ue4/discord_history_tracker/dht.txt?name=1';
  var url = 'file:///C:/workspace/Discord-History-Tracker/bld/dht.txt'
  //var url = 'http://mathiasbynens.be/demo/ip';
  //var url = 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd';


  //var url = 'http://horizon-studio.net/ue4/discord_history_tracker/dht.json';
  //http://horizon-studio.net/ue4/discord_history_tracker/dht.json
  var xhr = new XMLHttpRequest();
  //xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.setRequestHeader("Access-Control-Allow-Origin","*")
  xhr.onreadystatechange = processRequest;
  xhr.open('GET', url);

  //xhr.setRequestHeader('Content-Type', 'text/plain');
  xhr.send(null);

 // xhr.addEventListener("readystatechange", processRequest, false);

  function processRequest(e) {
    alert('polling');
    if (xhr.readyState == 4) {
        // time to partay!!!
         if (xhr.status === 200 || xhr.status === 0) {
            alert("success:" + xhr.responseText);
          }
          
    }
  }



});
