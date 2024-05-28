<template>
 
    <div>
  <!---lading page----->
      <div class="w-screen h-screen bg-white flex items-center justify-center" v-if="loading">
        <div class="w-1/12 m-auto" >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 150'><path fill='none' stroke='#BF19FF' stroke-width='15' stroke-linecap='round' stroke-dasharray='300 385' stroke-dashoffset='0' d='M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z'><animate attributeName='stroke-dashoffset' calcMode='spline' dur='2' values='685;-685' keySplines='0 0 1 1' repeatCount='indefinite'></animate></path></svg>
        </div>
    <!---lading page----->
      </div>
     
        <div  v-else class=" bg-white py-3 min-w-80 md:w-10/12 lg:w-9/12 mx-auto rounded-md relative">
            <h3 class="font-serif my-6 text-2xl md:text-3xl font-extrabold">جستجوی پیشرفته سوالات متداول</h3>
            <div class="flex flex-col gap-2 relative w-full">
            <div class="w-full flex items-center justify-between px-3 rounded bg-zinc-50">
            <img class="right-label w-5 h-5" alt="" src="data:image/svg+xml;base64,PHN2ZyBpZD0idnVlc2F4X2xpbmVhcl9zZWFyY2gtbm9ybWFsIiBkYXRhLW5hbWU9InZ1ZXNheC9saW5lYXIvc2VhcmNoLW5vcm1hbCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTguMjM1IiBoZWlnaHQ9IjE4LjIzNSIgdmlld0JveD0iMCAwIDE4LjIzNSAxOC4yMzUiPgogICAgPGcgaWQ9InNlYXJjaC1ub3JtYWwiPgogICAgICAgIDxwYXRoIGlkPSJWZWN0b3IiIGQ9Ik0xNC40MzYsNy4yMThBNy4yMTgsNy4yMTgsMCwxLDEsNy4yMTgsMCw3LjIxOCw3LjIxOCwwLDAsMSwxNC40MzYsNy4yMThaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxLjUyIDEuNTIpIiBmaWxsPSJub25lIiBzdHJva2U9IiNhYWEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgICAgICAgPHBhdGggaWQ9IlZlY3Rvci0yIiBkYXRhLW5hbWU9IlZlY3RvciIgZD0iTTEuNTIsMS41MiwwLDAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1LjE5NiAxNS4xOTYpIiBmaWxsPSJub25lIiBzdHJva2U9IiNhYWEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgICAgICAgPHBhdGggaWQ9IlZlY3Rvci0zIiBkYXRhLW5hbWU9IlZlY3RvciIgZD0iTTAsMEgxOC4yMzVWMTguMjM1SDBaIiBmaWxsPSJub25lIiBvcGFjaXR5PSIwIi8+CiAgICA8L2c+Cjwvc3ZnPgoK">
            <div class="w-full py-3">
            <input placeholder="" id="search" oninput="" type="text" class="w-full outline-none focus:outline-none flex-grow bg-transparent px-2 appearance-none text-right" style="direction: rtl; padding-right: 20px;">
            </div>
            </div>
            <div class="w-full border-b h-8 border-gray-200"></div>
            </div>
             <!---faq list container start----->
            <div class="flex flex-col" id="dataContainer">
               <!----create all issue title of the list---->
                <div v-for="faqMother in suportPageData " :key="faqMother" class="flex flex-col">
                     <div class="flex gap-4 pt-8 pb-2 items-center">
                         <img src="https://cdn.ok-ex.io/asset/svg/okex.svg" class="w-8 h-8" :alt="faqMother.category">
                         <h2 class=" font-extrabold text-xl md:text-2xl ">{{ faqMother.category}}</h2>
                     </div >
                     <!----create all title of each issue ---->
                     <div  v-for="faqChild in faqMother.children " :key="faqChild" class="flex flex-col ">
                        <h3 class="font-bolder  text-lg md:text-xl py-6">{{ faqChild.category }}</h3>
                       
                         <!----create qusetionlist of each title---->
                           <div  v-for="faqGrandChild in faqChild.rows " :key="faqGrandChild" class="overflow-hidden flex flex-col transition-all    ">
                            <div  @click="expandAnswer" class=" bg-slate-100 flex items-center justify-between text-indigo-500 justify-items-center  bg-opacity-80 py-2 px-5 border-b border-gray-100 cursor-pointer duration-300 ">
                            
                              <h4  class="  leading-12 ">{{ faqGrandChild.question }}</h4>
                               
                                <img  :alt="faqGrandChild.question" src="https://cdn.ok-ex.io/asset/svg/arrowPrimary.svg" class=" transition-all duration-1000">
                            </div>
                             
                           <div class="overflow-hidden " >
                           <div :ref="faqGrandChild.id"   class="mb-3 text-xs sm:text-sm mt-5 animate__animated animate__fadeInUp  duration-700 hidden transition-all  " >
                            {{ faqGrandChild.answer }}
                            </div>
                          </div>
                           <!----end of answer---->
                          </div>
                           <!---- end of qusetionlist of each title----->
                    </div>
                     <!---- end of all title of each issue element---->
                </div>
               
            </div>
             <!---faq container end----->
          </div>
        
      </div>
      
   
  </template>
  
  <script setup>
  import { useAsyncData } from 'nuxt/app'
  import { ref } from 'vue'
  import axios from "axios";

  
  // Define a reactive loading value
  const loading = ref(true)
   // Define a reactive store data variable
  let suportPageData = ref([])
  let error = ref()
 //  create a function to handele expand text as answer of each qeustion
  function expandAnswer(e){
    /// create a var to store the target element
    let ClickedElement
    
 if (e.target.tagName === "H4" || e.target.tagName === "IMG" ) {
  // redirt target element if user click on title or icon in DOM 
   ClickedElement = e.target.parentNode
  
 }else{
  // define the target witch is a div element
   ClickedElement = e.target
 }
 /// check if element has hidden class
   if (ClickedElement.parentNode.childNodes[1].childNodes[0].className.includes('hidden')  ) {
    
     ClickedElement.parentNode.childNodes[1].childNodes[0].classList.remove('hidden');
  /// add a rotate class to icon whitch created as img Element
     ClickedElement.childNodes[1].classList.add('rotate-90')
   } else {
  /// check if element has NOT hidden class
     ClickedElement.parentNode.childNodes[1].childNodes[0].classList.add('hidden');
  /// remove the rotate class of icon 
     ClickedElement.childNodes[1].classList.remove('rotate-90')
   }


  }

///// fetch FAQ data from server
async function getData() {
  try {
    const response = await axios.get(
      "https://azapi.ok-ex.io/server/api/support/faq"
    );
    suportPageData.value= response.data.data
  
  } catch (err) {
    console.error(err);
    error.value = err
    /// create a toastr if its going to catch to show err msg
    toastr.error(err.message);
  }
}
// call function to request server to fetch FAQ data
getData()

// Watch the data to set the loading state value
  watch(() => suportPageData.value,()=>{
    loading.value = false
})

  
  </script>
  
  <style scoped>
  /* Add some styles for the loading text */

  </style>
  