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


  var xmlhttp = new XMLHttpRequest();
  //var url = 'http://horizon-studio.net/ue4/discord_history_tracker/dht.txt';
  //var url = 'http://mathiasbynens.be/demo/ip';
  var url = 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd';

  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  //var url = 'http://horizon-studio.net/ue4/discord_history_tracker/dht.json';
  //http://horizon-studio.net/ue4/discord_history_tracker/dht.json
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = processRequest;
  xhr.open('GET', url);
  xhr.send();
 // xhr.addEventListener("readystatechange", processRequest, false);

  function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        // time to partay!!!
          alert('xxxxxxxxxxx');
    }
  }
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
});
