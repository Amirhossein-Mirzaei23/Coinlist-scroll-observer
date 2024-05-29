<template>
  <div class="w-full mt-10 h-full container m-auto min-w-72 md:max-w-96">
    <!---table header---->
    <table class="m-auto">
      <div ref="observerRef" class="observed-element"><p>observer</p></div>
      <thead class="grid grid-cols-3 text-nowrap text-center">
        <div class="w-full text-center"><span>قیمت</span></div>
        <div class="w-full text-center"><span>تغییر 24 ساعته</span></div>
        <div class="w-full text-center"><span>جفت</span></div>
      </thead>
      <!---table header---->
      {{
        isConected
      }}
      <tbody>
        <tr
          class="grid grid-cols-3 text-center"
          v-for="coinData in data"
          :key="coinData"
        >
          <!----use update price function to upadate coin price with websocket data----->
          <!----use update price function to upadate coin percent with websocket data the open_24 value of api fetch is same with websocjet----->
          <td class="flex flex-row-reverse gap-2 justify-end">
            <span>
              <span>{{ updatePrice(coinData) == 0 ? coinData.last : coinData.last=updatePrice(coinData) }}</span>
             
            </span>
            <span v-if="coinData.symbol.search('USDT') > 0">USDT</span>
            <span v-else>IR</span>
          </td>
          <td
            class="w-6/12 m-auto flex flex-row-reverse gap-1 justify-center badge bg-green-600 bg-opacity-10 text-green-500"
            :class="{
              'bg-red-700': coinData.last < coinData.open_24h,
              'text-red-600': coinData.last < coinData.open_24h,
            }"
          >
            <!-----{{ Math.abs(Math.round(((coinData.last - coinData.open_24h) / coinData.open_24h) * 1000) / 100 ) }}--->
            <span></span><span>%</span>
            {{
              updatePercent(coinData) == 0
                ? coinData.percent
                : (coinData.percent = updatePercent(coinData))
            }}
          </td>
          <td>
            <div class="flex flex-row gap-2 justify-end">
              <figure class="text-lg">
                {{ coinData.symbol.slice(0, -5) }}
              </figure>
              <img
                class="w-8 h-8 rounded-full"
                src="~/assets/image/btc.png"
                alt=""
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import axios, { isCancel, AxiosError } from "axios";
import { ref, onMounted, watch } from "vue";
import { NumberFormat } from "~/utils/helper";

const emit = defineEmits(["viewPortCoinList"]);
const props = defineProps(["recivedWebsocketData", "isConected"]);
// create a var to store fetch data
let data = ref([]);
let viewPortCoinList = ref(["BTC"]);
// fetch coin list data
async function getData() {
  try {
    const response = await axios.get(
      "https://azapi.ok-ex.io/oapi/v1/market/tickers"
    );

    data.value = response.data.tickers;
  } catch (error) {
    console.error(error);
    // create toastr is fetch going to catch to dispaly error msg
    toastr.error(error.message);
  }
}
// call function to send fetch data reqeust to the server

getData();

emit("viewPortCoinList", viewPortCoinList.value);

/// create a function to observe coin and update  observed coin array
function observerHandeler(observedCoins) {
  // observed coin array
  viewPortCoinList.value = [];

  for (const element of observedCoins) {
    const item = element.getBoundingClientRect();
    if (
      item.top >= 0 &&
      item.left >= 0 &&
      item.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      item.right <= (window.innerWidth || document.documentElement.clientWidth)
    ) {
      //  add oserved coin from viewport to observed coin array
      viewPortCoinList.value.push(element.innerText);
    }
  }
}

onMounted(() => {
  // target of intraction observer
  const observerdViewportCoinList = document.getElementsByTagName("figure");
  // call observerHandeler to sync target coin with intraction observer
  window.addEventListener("scroll", () => {
    observerHandeler(observerdViewportCoinList);
    emit("viewPortCoinList", viewPortCoinList.value);
  });
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  ///
  async function callWebsocket() {
    console.log("call");
    observerHandeler(observerdViewportCoinList);
    emit("viewPortCoinList", viewPortCoinList.value);
  }
  /// create two watcher to check if websocket is conectd and webservice data from server is loaded create call
  ///  to interaction observer to send coinlist to the websocket
  watch(
    () => props.isConected,
    async (newQuestion, oldQuestion) => {
      if (data.value) {
        console.log("watch");
        callWebsocket();
      }
    }
  );
  watch(
    () => data.value,
    async (newQuestion, oldQuestion) => {
      if (props.isConected) {
        console.log(props.isConected);
        console.log("watch");
        callWebsocket();
      }
    }
  );
});

/// create a function to match recived data with coinlist data in viewport

function updatePrice(coin) {
  let coinLastPrice = 0;
  if (coin) {
    if (props.recivedWebsocketData) {
      //match target coin with recived data props
      props.recivedWebsocketData.forEach((x) => {
        // check if coin in recivedWebsocketData match with coin from viewport and return new price
        if (x.arg.instId == coin.symbol) {
          coinLastPrice = x.data[0].last
           
        }
      })

      return coinLastPrice
    }
  }
}
/// create a function to match recived data with coinlist data in viewport
function updatePercent(coin) {
  let coinLastPercent = 0;

  if (coin) {
    // store the percent of coin in coinLastPercent
    if (props.recivedWebsocketData) {
      //match target coin with recived data props
      props.recivedWebsocketData.forEach((x) => {
        // check if coin in recivedWebsocketData match with coin from viewport and return new percent
        if (x.arg.instId == coin.symbol) {
          coinLastPercent = Math.abs(
            Math.round(
              ((x.data[0].last - x.data[0].open24h) / x.data[0].open24h) * 10000
            ) / 100
          );
        }
      });
      return coinLastPercent;
    } else {
      // return percent which recived data from the request
      // return coinLastPercent;
    }
  }
}
</script>

<style scoped>
.badge {
  padding: 0.325rem 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 0.425rem;
  display: inline-block;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
}
.observed-element {
  transition: opacity 0.5s;
  opacity: 0;
}
</style>
