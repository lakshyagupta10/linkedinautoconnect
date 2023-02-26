(()=> {
  function sleep(milliseconds) {                                  //sleep function to wait for set milliseconds
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
const startconnect = async (connections) =>{                     //function to send connection requests
  if(connections.length>1){
    var connected=0;
  for(var i=0;i<connections.length;i=i+1)
    {
      const stat = await chrome.runtime.sendMessage({           //checking status of entention
        type:"checkstatus"
      });
      if(stat==1){
        console.log(stat);
        sleep(2000);                                            //sleep time set to 2 secs
    con=connections[i].querySelector(
    '.artdeco-button--secondary');                              //searching for button on each search result
    text=con.querySelector(".artdeco-button__text");            //reading the text of the button
    if(text.innerText=='Message'||text.innerText=='Pending'||text.innerText=='Following'){
      continue;                                                 //skipping buttons with message option
    }
    connected+=1;                                               //counter to keep count of sent requests
    con.click();                                                //click action on the connect button
    modal=document.querySelector('.artdeco-modal.send-invite');
    if(modal!==null){
    pill=modal.querySelector('.artdeco-pill--choice');
    if(pill!==null){
      pill.click();
    }
    send=modal.querySelector('.artdeco-button--primary');
    send.click();
  }                                       //click action on popup button
    chrome.runtime.sendMessage({                                //communicating sent invites to the popup
      type:"Connected",
      value:connected
    });
  }}
    chrome.runtime.sendMessage({                                //stopping the extention after all invites are sent
      type:"Connect",
      value:"Stop"
    })
  }
}
chrome.runtime.onMessage.addListener((obj, sender, response) => {
  var connections = document
  .querySelectorAll(
  '.entity-result__actions');                                   //list of all serach results
  const { type, value}=obj;
  if(type==="Connect"){
    if(value==="Start"){
      stat=1;
      response(connections.length);
      startconnect(connections);
}
}
});
})();
