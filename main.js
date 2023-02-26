import { getActiveTabURL } from "./utils.js"                                          //utols file to get current url
var total=0;
document.addEventListener("DOMContentLoaded",async (tab)=>{
  const activeTab = await getActiveTabURL();
  if(activeTab.url.includes("linkedin.com/search/")){                                 //check if url is linkedin search

  }
  else {
    const container = document.getElementsByClassName('container')[0];
    container.innerHTML = '<div class="title text-white">This is not a Linkedin Search Page</div>'
  }
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });                    //toggle for start stop button
  if(prevState === "ON")
  {
    startbtn.innerText='Stop';
  }
});
var startbtn = document.getElementById('linkedinautostart');
startbtn.addEventListener("click",async(tab)=>{
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const prevBut = startbtn.innerText;
  const nextState = prevState === 'ON' ? 'OFF' : 'ON'
  const nextBut = prevBut === 'Start' ? 'Stop' : 'Start'
  startbtn.innerText=nextBut;
  await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });
    if (nextState === "ON") {
      const activeTab = await getActiveTabURL();
      total= await chrome.tabs.sendMessage(activeTab.id,{                                      //communicating wuth script file to start connecting
        type:"Connect",
        value:"Start"
      })
  }
  if (nextState === "OFF") {                                                                  //communicating wuth script file to stop connecting
    const activeTab = await getActiveTabURL();
    chrome.tabs.sendMessage(activeTab.id,{
      type:"Connect",
      value:"Stop"
    })
}
});

  chrome.runtime.onMessage.addListener(async(obj, sender, response) => {                            //listening to connected numbers
    const { type, value}=obj;
    if(type==="Connected"){
    var connectednumber=document.getElementsByClassName("connectednumber")[0];
    connectednumber.innerText=value;
    setProgress(value,total);
    var status=document.getElementById('linkedinautostart').innerText;
    response(status);
  }
  if(type==="Connect"&&value==="Stop"){
    var startbtn = document.getElementById('linkedinautostart');
    startbtn.innerText="Start";
    await chrome.action.setBadgeText({
        text: "OFF",
      });
  }
  if(type==="checkstatus"){                                                                 //communicating status of start stop button
    var status = document.getElementById('linkedinautostart').innerText;
    var stat=0;
    if(status==="Start"){
      stat=0;
    }
    else{
      stat=1;
    }
    response(stat);
  }
  });
  var circle = document.querySelector('circle');                                            //progress ring
  var radius = circle.r.baseVal.value;
  var circumference = radius * 2 * Math.PI;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  function setProgress(percent,total) {
    const offset = circumference - percent / total * circumference;
    circle.style.strokeDashoffset = offset;
  }
