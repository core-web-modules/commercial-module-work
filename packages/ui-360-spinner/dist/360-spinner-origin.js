{% if section.settings.frame_1 != blank %}

{% assign total = 0 %}
{% for i in (1..36) %}
  {% assign key = 'frame_' | append: i %}
  {% if section.settings[key] != blank %}
    {% assign total = total | plus: 1 %}
  {% endif %}
{% endfor %}

<div class="k360-wrap">
  <div class="k360-stage" id="k360stage">
    <img
      id="k360img"
      class="k360-img"
      src="{{ section.settings.frame_1 | img_url: 'master' }}"
      alt="{{ section.settings.product_name }} 360° view"
      width="800"
      height="800"
      draggable="false"
    >
  </div>
  <div class="k360-hint" id="k360hint">
      <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="13" stroke="white" stroke-width="1.5" stroke-opacity="0.8"/>
        <path d="M9 14L7 12M9 14L7 16" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M19 14L21 12M19 14L21 16" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="7" y1="14" x2="21" y2="14" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <span>{{ section.settings.hint_text }}</span>
  </div>
</div>

<style>
.k360-wrap{width:100%;max-width:{{ section.settings.max_width }}px;margin:{{ section.settings.margin_top }}px auto {{ section.settings.margin_bottom }}px;user-select:none;-webkit-user-select:none}
.k360-stage{position:relative;width:100%;background:transparent;cursor:grab}
.k360-stage:active{cursor:grabbing}
.k360-img{width:100%;height:auto;display:block;pointer-events:none;-webkit-user-drag:none}
.k360-hint{position:relative;display:flex;align-items:center;justify-content:center;gap:8px;background:rgba(0,0,0,0.45);color:#fff;font-size:13px;font-family:-apple-system,sans-serif;padding:8px 18px;border-radius:20px;pointer-events:none;white-space:nowrap;width:fit-content;margin:12px auto 0}
@media(max-width:480px){.k360-hint{font-size:11px;padding:6px 14px;gap:6px}.k360-hint svg{width:15px;height:15px}}
</style>

<script>
(function(){
  var FRAMES=[];
  {% for i in (1..36) %}
    {% assign key = 'frame_' | append: i %}
    {% assign img = section.settings[key] %}
    {% if img != blank %}
      FRAMES.push("{{ img | img_url: 'master' }}");
    {% endif %}
  {% endfor %}
  var TOTAL=FRAMES.length;
  if(TOTAL===0) return;
  var SENS=Math.max(20,Math.round(220/TOTAL));
  FRAMES.forEach(function(s){new Image().src=s;});
  var imgEl=document.getElementById('k360img');
  var stage=document.getElementById('k360stage');
  if(!imgEl) return;
  var cur=0,drag=false,sx=0,lf=0;
  function go(i){i=((i%TOTAL)+TOTAL)%TOTAL;if(i===cur)return;cur=i;imgEl.src=FRAMES[i];}
  stage.addEventListener('mousedown',function(e){e.preventDefault();drag=true;sx=e.clientX;lf=cur;});
  window.addEventListener('mousemove',function(e){if(!drag)return;go(lf+Math.round((e.clientX-sx)/SENS));});
  window.addEventListener('mouseup',function(){drag=false;});
  stage.addEventListener('touchstart',function(e){drag=true;sx=e.touches[0].clientX;lf=cur;},{passive:true});
  stage.addEventListener('touchmove',function(e){if(!drag)return;e.preventDefault();go(lf+Math.round((e.touches[0].clientX-sx)/SENS));},{passive:false});
  stage.addEventListener('touchend',function(){drag=false;});
})();
</script>

{% endif %}

{% schema %}
{
  "name": "360° Product Spinner",
  "settings": [
    {
      "type": "text",
      "id": "product_name",
      "label": "Product name",
      "default": "Product"
    },
    {
      "type": "text",
      "id": "hint_text",
      "label": "Hint text",
      "default": "Drag to explore 360°"
    },
    {
      "type": "header",
      "content": "Frame images — upload in shooting order"
    },
    { "type": "image_picker", "id": "frame_1",  "label": "Frame 1" },
    { "type": "image_picker", "id": "frame_2",  "label": "Frame 2" },
    { "type": "image_picker", "id": "frame_3",  "label": "Frame 3" },
    { "type": "image_picker", "id": "frame_4",  "label": "Frame 4" },
    { "type": "image_picker", "id": "frame_5",  "label": "Frame 5" },
    { "type": "image_picker", "id": "frame_6",  "label": "Frame 6" },
    { "type": "image_picker", "id": "frame_7",  "label": "Frame 7" },
    { "type": "image_picker", "id": "frame_8",  "label": "Frame 8" },
    { "type": "image_picker", "id": "frame_9",  "label": "Frame 9" },
    { "type": "image_picker", "id": "frame_10", "label": "Frame 10" },
    { "type": "image_picker", "id": "frame_11", "label": "Frame 11" },
    { "type": "image_picker", "id": "frame_12", "label": "Frame 12" },
    { "type": "image_picker", "id": "frame_13", "label": "Frame 13" },
    { "type": "image_picker", "id": "frame_14", "label": "Frame 14" },
    { "type": "image_picker", "id": "frame_15", "label": "Frame 15" },
    { "type": "image_picker", "id": "frame_16", "label": "Frame 16" },
    { "type": "image_picker", "id": "frame_17", "label": "Frame 17" },
    { "type": "image_picker", "id": "frame_18", "label": "Frame 18" },
    { "type": "image_picker", "id": "frame_19", "label": "Frame 19" },
    { "type": "image_picker", "id": "frame_20", "label": "Frame 20" },
    { "type": "image_picker", "id": "frame_21", "label": "Frame 21" },
    { "type": "image_picker", "id": "frame_22", "label": "Frame 22" },
    { "type": "image_picker", "id": "frame_23", "label": "Frame 23" },
    { "type": "image_picker", "id": "frame_24", "label": "Frame 24" },
    { "type": "image_picker", "id": "frame_25", "label": "Frame 25" },
    { "type": "image_picker", "id": "frame_26", "label": "Frame 26" },
    { "type": "image_picker", "id": "frame_27", "label": "Frame 27" },
    { "type": "image_picker", "id": "frame_28", "label": "Frame 28" },
    { "type": "image_picker", "id": "frame_29", "label": "Frame 29" },
    { "type": "image_picker", "id": "frame_30", "label": "Frame 30" },
    { "type": "image_picker", "id": "frame_31", "label": "Frame 31" },
    { "type": "image_picker", "id": "frame_32", "label": "Frame 32" },
    { "type": "image_picker", "id": "frame_33", "label": "Frame 33" },
    { "type": "image_picker", "id": "frame_34", "label": "Frame 34" },
    { "type": "image_picker", "id": "frame_35", "label": "Frame 35" },
    { "type": "image_picker", "id": "frame_36", "label": "Frame 36" },
    {
      "type": "header",
      "content": "Appearance"
    },
    { "type": "color", "id": "bg_color", "label": "Background colour", "default": "#f5f5f5" },
    { "type": "range", "id": "max_width", "label": "Max width (px)", "min": 300, "max": 1000, "step": 50, "default": 700 },
    { "type": "range", "id": "border_radius", "label": "Corner radius (px)", "min": 0, "max": 32, "step": 2, "default": 8 },
    { "type": "range", "id": "margin_top", "label": "Margin top (px)", "min": 0, "max": 80, "step": 4, "default": 0 },
    { "type": "range", "id": "margin_bottom", "label": "Margin bottom (px)", "min": 0, "max": 80, "step": 4, "default": 24 }
  ],
  "presets": [{ "name": "360° Product Spinner" }]
}
{% endschema %}
