import{S as f,i as d}from"./assets/vendor-5ObWk2rO.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();function m(i){return i.map(({webformatURL:t,largeImageURL:s,tags:o,likes:e,views:r,comments:c,downloads:u})=>`
    <li class="gallery-card">
        <a class="gallery-link" href="${s}">
          <img
            class="gallery-image"
            src="${t}" 
            alt="${o}" 
            width="360"
            height="152" 
          />
        </a>
        <div class="discribe-box">
          <ul class="discribe-list">
            <li class="discribe-item">
              <h2 class="discribe-title">Likes</h2>
              <p class="discribe-text">${e}</p>
            </li>
            <li class="discribe-item">
              <h2 class="discribe-title">Views</h2>
              <p class="discribe-text">${r}</p>
            </li>
            <li class="discribe-item">
              <h2 class="discribe-title">Comments</h2>
              <p class="discribe-text">${c}</p>
            </li>
            <li class="discribe-item">
              <h2 class="discribe-title">Downloads</h2>
              <p class="discribe-text">${u}</p>
            </li>
          </ul>
        </div>
      </li>
    `).join("")}const l={key:"47286025-dcd3f7c6d98bacb5edade47ee",q:"",imageType:"photo",orientation:"horizontal",safesearch:!0};function h(i){return l.q=i,`https://pixabay.com/api/?${new URLSearchParams(l).toString()}`}function p(i){return fetch(i).then(t=>{if(!t.ok)throw new Error(t.status);return t.json()})}const g=new f(".gallery a",{captionDelay:250,captionPosition:"bottom",captionsData:"alt"}),a={searchForm:document.querySelector("#search-form"),gallery:document.querySelector(".js-gallery"),loader:document.querySelector(".js-loader")};a.searchForm.addEventListener("submit",y);function y(i){i.preventDefault();const s=i.currentTarget.elements.searchtext.value.toLowerCase().trim();if(console.log("Form Value: ",s),!s){d.error({title:"Error",message:"Search field cannot be empty. Please enter a search query!"});return}a.gallery.innerHTML="",a.loader.classList.add("loader"),p(h(s)).then(o=>{a.loader.classList.remove("loader");const e=o.hits;e.length===0?n():(a.gallery.insertAdjacentHTML("beforeend",m(e)),g.refresh())}).catch(n).finally(()=>{a.searchForm.reset()})}function n(){d.error({position:"topRight",backgroundColor:"#ef4040",messageColor:"#fafafb",titleColor:"#fafafb",iconColor:"#fafafb",title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"})}
//# sourceMappingURL=index.js.map
