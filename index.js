import{a as b,S as v,i as n}from"./assets/vendor-DvfmeZXB.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const q="53479678-bd84db524e397b690847497a1",P="https://pixabay.com/api/",$=15;async function B(r,t){const i={key:q,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:$,page:t};return(await b.get(P,{params:i})).data}const g=document.querySelector(".gallery"),f=document.querySelector(".loader"),d=document.querySelector(".load-more"),E=new v(".gallery a",{captionsData:"alt",captionDelay:250});function M(r){const t=r.map(({webformatURL:i,largeImageURL:s,tags:e,likes:o,views:a,comments:w,downloads:S})=>`
<li class="gallery-item">
  <a class="gallery-link" href="${s}">
    <img class="gallery-image" src="${i}" alt="${e}" loading="lazy" />
  </a>
  <ul class="gallery-info">
    <li class="gallery-info-item">
      <p class="gallery-info-title">Likes</p>
      <p class="gallery-info-value">${o}</p>
    </li>
    <li class="gallery-info-item">
      <p class="gallery-info-title">Views</p>
      <p class="gallery-info-value">${a}</p>
    </li>
    <li class="gallery-info-item">
      <p class="gallery-info-title">Comments</p>
      <p class="gallery-info-value">${w}</p>
    </li>
    <li class="gallery-info-item">
      <p class="gallery-info-title">Downloads</p>
      <p class="gallery-info-value">${S}</p>
    </li>
  </ul>
</li>`).join("");g.insertAdjacentHTML("beforeend",t),E.refresh()}function p(){g.innerHTML=""}function R(){f&&f.classList.remove("is-hidden")}function H(){f&&f.classList.add("is-hidden")}function O(){d&&d.classList.remove("is-hidden")}function l(){d&&d.classList.add("is-hidden")}const m=document.querySelector(".search-form"),A=m.querySelector('input[name="searchQuery"]'),_=document.querySelector(".load-more"),x=document.querySelector(".gallery");let h="",c=1,u=0,y=0;l();m.addEventListener("submit",C);_.addEventListener("click",D);async function C(r){r.preventDefault();const t=A.value.trim();if(!t){n.warning({message:"Please enter a search query!",position:"topRight"});return}h=t,c=1,u=0,y=0,l(),p(),await L()}async function D(){c+=1,await L(!0)}async function L(r=!1){try{R(),l();const t=await B(h,c),{hits:i,totalHits:s}=t;if(!i||i.length===0){c===1&&(n.info({message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"}),p(),l());return}c===1&&(u=s,n.success({message:`Hooray! We found ${u} images.`,position:"topRight"})),M(i),y+=i.length,r&&I(),y>=u?(l(),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):O()}catch(t){console.error(t),n.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{H()}}function I(){const r=x.firstElementChild;if(!r)return;const{height:t}=r.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
