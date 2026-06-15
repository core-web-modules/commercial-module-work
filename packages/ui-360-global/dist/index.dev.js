{% comment %}
  360 Spinner — Global Initializer
  =================================
  安装：在 layout/theme.liquid 的 </body> 前加入：
  {% render '360-spinner-global' %}

  使用方法（在任何 HTML 字段，如 Collapsible tab Answer）：
  <div data-spinner
       data-frames="https://cdn.../frame1.jpg|https://cdn.../frame2.jpg|..."
       data-hint="Drag to explore 360°"
       data-width="700">
  </div>
{% endcomment %}

<style>
.k360g-wrap{width:100%;user-select:none;-webkit-user-select:none;margin:0 auto}
.k360g-stage{position:relative;width:100%;cursor:grab}
.k360g-stage:active{cursor:grabbing}
.k360g-img{width:100%;height:auto;display:block;pointer-events:none;-webkit-user-drag:none}
.k360g-hint{box-sizing:border-box;height:45px;display:flex;align-items:center;justify-content:center;gap:8px;background:rgba(0,0,0,0.45);color:#fff;font-size:13px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;padding:0 18px;border-radius:18px;pointer-events:none;white-space:nowrap;width:fit-content;margin:12px auto 0}
.k360g-hint svg{display:block;flex-shrink:0}
.k360g-hint span{display:flex;align-items:center;line-height:1;margin:0;padding:0;position:relative;top:-6px}
@media(max-width:480px){.k360g-hint{height:30px;font-size:11px;padding:0 14px;gap:6px}.k360g-hint svg{width:14px;height:14px}}
</style>

<script>
(function(){
  var HINT_SVG = '<svg width="16" height="16" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="13" stroke="white" stroke-width="1.5" stroke-opacity="0.8"/><path d="M9 14L7 12M9 14L7 16" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 14L21 12M19 14L21 16" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><line x1="7" y1="14" x2="21" y2="14" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>';

  function initSpinner(root) {
    var framesStr = root.getAttribute('data-frames');
    if (!framesStr) return;

    var FRAMES = framesStr.split('|').map(function(s){ return s.trim(); }).filter(Boolean);
    var TOTAL  = FRAMES.length;
    if (TOTAL === 0) return;

    var hint  = root.getAttribute('data-hint') || 'Drag to explore 360\u00b0';
    var width = root.getAttribute('data-width') || '700';
    var SENS  = Math.max(20, Math.round(220 / TOTAL));

    FRAMES.forEach(function(s){ new Image().src = s; });

    var wrap  = document.createElement('div');
    wrap.className = 'k360g-wrap';
    wrap.style.maxWidth = width + 'px';

    var stage = document.createElement('div');
    stage.className = 'k360g-stage';

    var img = document.createElement('img');
    img.className = 'k360g-img';
    img.src = FRAMES[0];
    img.alt = hint;
    img.width = 800;
    img.height = 800;
    img.draggable = false;

    var hintEl = document.createElement('div');
    hintEl.className = 'k360g-hint';
    hintEl.innerHTML = HINT_SVG + '<span>' + hint + '</span>';

    stage.appendChild(img);
    wrap.appendChild(stage);
    wrap.appendChild(hintEl);
    root.innerHTML = '';
    root.appendChild(wrap);

    var cur=0, drag=false, sx=0, lf=0;

    function go(i){
      i=((i%TOTAL)+TOTAL)%TOTAL;
      if(i===cur) return;
      cur=i;
      img.src=FRAMES[i];
    }

    stage.addEventListener('mousedown', function(e){
      e.preventDefault(); drag=true; sx=e.clientX; lf=cur;
    });
    window.addEventListener('mousemove', function(e){
      if(!drag) return;
      go(lf + Math.round((e.clientX - sx) / SENS));
    });
    window.addEventListener('mouseup', function(){ drag=false; });

    stage.addEventListener('touchstart', function(e){
      drag=true; sx=e.touches[0].clientX; lf=cur;
    },{ passive:true });
    stage.addEventListener('touchmove', function(e){
      if(!drag) return;
      e.preventDefault();
      go(lf + Math.round((e.touches[0].clientX - sx) / SENS));
    },{ passive:false });
    stage.addEventListener('touchend', function(){ drag=false; });

    root.setAttribute('data-spinner-ready', '1');
  }

  function initAll() {
    document.querySelectorAll('[data-spinner]:not([data-spinner-ready])').forEach(initSpinner);
  }

  var observer = new MutationObserver(function(mutations){
    mutations.forEach(function(m){
      m.addedNodes.forEach(function(node){
        if(node.nodeType !== 1) return;
        if(node.hasAttribute && node.hasAttribute('data-spinner') && !node.hasAttribute('data-spinner-ready')){
          initSpinner(node);
        }
        node.querySelectorAll && node.querySelectorAll('[data-spinner]:not([data-spinner-ready])').forEach(initSpinner);
      });
    });
    initAll();
  });

  observer.observe(document.body, { childList:true, subtree:true, attributes:true, attributeFilter:['style','class','hidden','aria-hidden'] });

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
</script>
