<template>
    <div class="container m-auto p-3 h-screen md:max-w-96 sm:m-auto min-w-72 " >
        <div class="flex items-center justify-between mb-10" >
          <div class="flex items-center p-4 justify-between">
            <div class="flex gap-2.5 text-primary/50 text-xl">
             <img class="lazyLoad isLoaded" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xOS43NSAxNS40MUwxOC45IDE0LjU2QzE5LjM0IDEzLjg5IDE5LjYgMTMuMSAxOS42IDEyLjI0QzE5LjYgOS44OTk5OSAxNy43IDggMTUuMzYgOEMxMy4wMiA4IDExLjEyIDkuODk5OTkgMTEuMTIgMTIuMjRDMTEuMTIgMTQuNTggMTMuMDIgMTYuNDggMTUuMzYgMTYuNDhDMTYuMjIgMTYuNDggMTcuMDIgMTYuMjIgMTcuNjggMTUuNzhMMTguNTMgMTYuNjNDMTguNyAxNi44IDE4LjkyIDE2Ljg4IDE5LjE0IDE2Ljg4QzE5LjM2IDE2Ljg4IDE5LjU4IDE2LjggMTkuNzUgMTYuNjNDMjAuMDggMTYuMjkgMjAuMDggMTUuNzQgMTkuNzUgMTUuNDFaIiBmaWxsPSIjNUE0QkQyIi8+CiAgICA8cGF0aCBvcGFjaXR5PSIwLjQiIGQ9Ik01LjQwOTk3IDJIMTguNThDMTkuNjggMiAyMC41OCAyLjkwOTk5IDIwLjU4IDQuMDE5OTlWNi4yMzk5OUMyMC41OCA3LjA0OTk5IDIwLjA4IDguMDYgMTkuNTggOC41NkwxNS4yOSAxMi40QzE0LjY5IDEyLjkxIDE0LjI5IDEzLjkyIDE0LjI5IDE0LjcyVjE5LjA2QzE0LjI5IDE5LjY3IDEzLjg5IDIwLjQ3IDEzLjM5IDIwLjc4TDExLjk5IDIxLjY5QzEwLjY5IDIyLjUgOC45MDAwMiAyMS41OSA4LjkwMDAyIDE5Ljk3VjE0LjYyQzguOTAwMDIgMTMuOTEgOC40OTk5OCAxMyA4LjA5OTk4IDEyLjVMNC4zMSA4LjQ1OTk5QzMuODEgNy45NDk5OSAzLjQwOTk3IDcuMDUgMy40MDk5NyA2LjQ0VjQuMTJDMy40MTk5NyAyLjkxIDQuMzE5OTcgMiA1LjQwOTk3IDJaIiBmaWxsPSIjNUE0QkQyIi8+Cjwvc3ZnPgo=">
            انتخاب کوین
          </div>
        </div>
          
            <button class=" " >
                <Icon name="material-symbols:cancel-outline-rounded" class="scale-125" color="indigo" />
            </button>
        </div>
        <!---start of tabpanel-->
        <div class="bg-zinc-200 bg-opacity-60 grid grid-cols-2 items-center rounded-md container px-2 py-1 mb-10 " >
            <div @click="tabPaneHandeler = true" :class="{'bg-white':tabPaneHandeler}" class="  rounded-lg" ><h3 class=" m-auto text-center" >USDT</h3></div>
            <div @click="tabPaneHandeler = false" :class="{'bg-white':!tabPaneHandeler}" class=" rounded-lg" ><h3 class=" m-auto text-center" >IRT</h3></div>
        </div>
            <!---end of tabpanel-->

             <!---search bar-->
        <div class="*:bg-transparent bg-zinc-200 bg-opacity-80 mx-auto flex items-center justify-between rounded-md w-11/12 px-3 " >
        <div class="*:bg-transparent" >
            <Icon  name="ph:magnifying-glass-light" class="mx-3" color="gray" />
            <input class=" border-none border-transparent border-0 py-2" type="text" placeholder="جستجو ..." >
        </div>
            <Icon  name="tabler:letter-x-small" class="opacity-70" color="gray" />
        </div>
        
           <!---search bar-->
   
        <div class="h-5/6" >
          <!--- get observed coin on view port as viewPortCoinList ---->
          <!--- send subscribed coin to the component as recivedWebsocketData ---->
          <CoinList :isConected="isConected" :recivedWebsocketData="recivedWebsocketData" @viewPortCoinList="createCoinList" />
        </div>
    </div>
</template>

<script setup>
import CoinList from "~/components/CoinList.vue";
import { ref, onMounted } from 'vue';

// create a varibale to manage first call of websocket
let isConected = ref(false)
// create var to set the state of tabpanel variable
const tabPaneHandeler = ref(true)
// create websocket variable
const socketUrl = 'wss://wsg.ok-ex.io/ws';
const webSocket = ref(null);

/// create a variable for storing a aviable coin in the viewport 
let viewPortCoinList = ref([])

/// create a variable to send coin to the websocket 
let webSocketSubscribtionList = ref()
// create a reactive variable to store  websocket recived data
let recivedWebsocketData = ref([])
let recivedCoin = ref()
// create a function to handle emited data from coinlint component
function createCoinList(coinlist) {
  viewPortCoinList.value = coinlist
}
// create Object from a coin data which aviable in viewport to send on websocket
class createSubscribeCoinDataObject{
  constructor(channel, instId, op) {
   
    return{ channel, instId}
  }
  
}
/// create a fucntion to create array of coin object and send to the websocket to subscribe   
function subscribeCoinOnWebsocket() {
  // unsubscribe old coin
  webSocket.value.send(JSON.stringify({ args: webSocketSubscribtionList.value, op: 'unsubscribe' }));
  
  webSocketSubscribtionList.value = []
  viewPortCoinList.value.forEach(coinInstId => {
    const coinObj = new createSubscribeCoinDataObject("tickers", coinInstId+'-USDT', "subscribe")
    webSocketSubscribtionList.value.push(coinObj)
  });
 /// subscribe coin 
  webSocket.value.send(JSON.stringify({ args: webSocketSubscribtionList.value, op: 'subscribe' }));
  // create recivedWebsocketData empty to be ready get new coin list from web socket 
  recivedWebsocketData.value=[]
}


onMounted(()=>{
  try {
    webSocket.value = new WebSocket(socketUrl);
//// create a request to the websocket
    webSocket.value.onopen = (event) => {

      /// create a log event if websocket opend successful 
      console.log('WebSocket connection opened', event);
      //subscribeCoinOnWebsocket()

      webSocket.value.send(JSON.stringify({ args: [{ channel: "tickers", instId: 'BTC-USDT' }], op: 'subscribe' }));
      isConected.value = true
    };
/// handel websokcet  message
    webSocket.value.onmessage = (event) => {
      // create a var to check which coin is already exist in view port coin list
      let isrepeated = ref(false)
     // create a var to store recived coin data from websocket on message
      recivedCoin.value = JSON.parse(event.data)
       // check if recived coin list is not empty
      if (recivedWebsocketData.value[0]) {
      /// check coin is repeated or not
       recivedWebsocketData.value.map((x) =>
         x.arg.instId == recivedCoin.value.arg.instId ?
           isrepeated.value = true
           : null
       )
       //// if coin is repeated find coin index and set new value to the data of that object
           recivedWebsocketData.value.map((x) =>
         x.arg.instId == recivedCoin.value.arg.instId ?
         x.data = recivedCoin.value.data
           : null  
       )
    
            /// check coin is not repeated  push recived data to the coin list
       if (!isrepeated.value) {
         recivedWebsocketData.value.push(JSON.parse(event.data))
        } 
        console.log(recivedWebsocketData.value);
       //// if recived coin list is empty push recived data to the coin list
     } else {
      recivedWebsocketData.value.push(JSON.parse(event.data))
     }

    };
/// handel websokcet err msg
    webSocket.value.onerror = (error) => {
      console.error('WebSocket error:', error);
      toastr.error('WebSocket  connection faild')
    };

  } catch (error) {
    console.error('WebSocket connection error:', error);
  }

 // create a timer to update coin which is avaiable in the view port with websocket
  let timer = setInterval(() => {
    subscribeCoinOnWebsocket()
  }, 1000);

})
onBeforeRouteUpdate(() => {
  // closing websocket conction
    webSocket.value.close()
})
onUnmounted(() => {
  // clear the timer of update coin with with websocket
  clearInterval(timer);
  })
</script>

<style lang="scss" scoped>

</style>