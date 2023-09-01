/*
    Javascript isn't my main language and drives me crazy each time I try to understand the modern way, so chill out
    and be prepared for unconventional vanilla stuff.
*/
const { BskyAgent } = require("@atproto/api");

var agent = new BskyAgent({ service: "https://bsky.social" });
var socket = undefined;

const accounts = {}

// Waiting that all is ready
document.addEventListener('readystatechange', event => { 
    if (event.target.readyState === "complete") {
        async function crawl(actor) { // The function that fetch followers and followings
            {  // getFollowers
                var params = {'actor':actor,'limit':100}
                var result = undefined;
                do {

                    result = await agent.getFollowers(params);
    
                    const  subject = result['data']['subject'];

                    addToList(subject['handle'],subject['did'])
                    const target_did = subject["did"];
                    socket.send(JSON.stringify({'an':{[target_did] :{'label':subject['handle'],'r':0.5,'g':0.5,'b':0.5 }}}));

                    result['data']['followers'].forEach((element) => {
                        addToList(element['handle'],element['did'])
                        const source_did = element['did'];
                        socket.send(JSON.stringify({'an':{[source_did] :{'label':element['handle'],'r':0.5,'g':0.5,'b':0.5}}}));

                        const edge_id = `${source_did}-->${target_did}`;
                        socket.send(JSON.stringify({'ae':{ [edge_id]: {'source':source_did,'target':target_did,'directed':true}}}));
            
                    });
                    params["cursor"]=result['data']['cursor']
                } while( result['data']['cursor']!==undefined);
            }
            {  // getFollows
                var params = {'actor':actor,'limit':100}
                var result = undefined;
                do {

                    result = await agent.getFollows(params);
    
                    const  subject = result['data']['subject'];
                    addToList(subject['handle'],subject['did'])
                    const source_did = subject["did"];
                    socket.send(JSON.stringify({'an':{[source_did] :{'label':subject['handle'],'r':0.5,'g':0.5,'b':0.5 }}}));

                    result['data']['follows'].forEach((element) => {
                        addToList(element['handle'],element['did'])
                        const target_did = element['did'];
                        socket.send(JSON.stringify({'an':{[target_did] :{'label':element['handle'],'r':0.5,'g':0.5,'b':0.5}}}));

                        const edge_id = `${target_did}-->${source_did}`;
                        socket.send(JSON.stringify({'ae':{ [edge_id]: {'target':target_did,'source':source_did,'directed':true}}}));
            
                    });
                    params["cursor"]=result['data']['cursor']
                } while( result['data']['cursor']!==undefined);
            }
        }

        // List of accounts, no difference between visited, to visit etc....
        const accountsList = document.getElementById("accountsList");
        function addToList(handle,did) {
            if(accounts[did]===undefined) {
                // Generating a new div with a link and action on click to directly crawl
                accounts[did] = document.createElement("div")
                
                accounts[did].id = did;
                accounts[did].innerHTML = `<a href="#_${did}">${handle}</a>`;
                accounts[did].addEventListener("click",async function(){
                        await crawl(did);
                });

                // Bisect insert inside the list of children directly
                // Feels weird, but at least I don't care about re-rendering the list
                var maxBound = accountsList.childElementCount
                var minBound = 0 
         
                if(accountsList.childElementCount===0) {
                    accountsList.appendChild(accounts[did]);
                    return;
                }
                do{
                    var p = minBound+Math.floor((maxBound-minBound)/2);

                    if(handle < accountsList.children[p].firstChild.innerHTML) {
                            maxBound = p; 
                    } else {
                        minBound = p+1;
                        p=minBound;
                    }
                }while(minBound<maxBound);
                if(p===accountsList.childElementCount) {
                    accountsList.insertAdjacentElement("beforeend",accounts[did]);
                    return;
                }
                accountsList.insertBefore(accounts[did],accountsList.children[p]);
          
            }
        }

        // Connect to Bluesky api
        const connectBtn = document.getElementById('connectBsky');
        connectBtn.addEventListener("click",async function(){
            connectBtn.classList.remove(...connectBtn.classList);
            const handle = document.getElementById('handle').value;
            const password = document.getElementById('password').value;
            const resp = await agent.login({
                identifier: handle,
                password: password
                });
            if(resp.success === true) {
                getFollowerBtn.disabled=false;
                connectBtn.classList.add("connected");
            } else {
                connectBtn.classList.add("error");
            }
        });

        // Connect to websocket server
        const connectWs = document.getElementById('connectWs');
        connectWs.addEventListener("click",async function(){
            connectWs.classList.remove(...connectWs.classList);
            const url = new URL(document.getElementById('urlWs').value);
            socket = new WebSocket(`${url.protocol}//${url.host}/workspace1?operation=updateGraph`);

            const err = (event) => {
                connectWs.classList.remove(...connectWs.classList);
                connectWs.classList.add("error");
            };
            socket.addEventListener("close",err );
            socket.addEventListener("error", err);
            socket.addEventListener("message", (event) => {});
            socket.addEventListener("open", (event) => {
            connectWs.classList.add("connected");
            });
        });
        // Crawl from input
        const getFollowerBtn = document.getElementById('getFollowerBtn');
        getFollowerBtn.disabled=true;
        getFollowerBtn.addEventListener("click",async function(e){
            e.stopPropagation();
            e.preventDefault();
            const actors = document.getElementById('actor').value.split('\n').map((e)=>e.trim());
            actors.forEach(async (actor)=>{
            await crawl(actor)
        });
        });
    }
});