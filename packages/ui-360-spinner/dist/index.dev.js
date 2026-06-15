(function(){
  // 1. 域名自锁（精准绑定你的新公司域名和后台预览环境）
  const _0xauth = window.location.hostname.toLowerCase();
  const _0xlegal = [
      window.atob('c2hvcGlmeS5jb20='),            // 'shopify.com' (兼容后台所有预览)
      window.atob('a2F5b21vdG9hdXN0cmFsaWEuY29t') // 'kayomotoaustralia.com' (你的正式正式官方域名)
  ];
  let _0xisPass = false;

  _0xlegal.forEach(function(_d) {
      if (_0xauth.indexOf(_d) !== -1) { _0xisPass = true; }
  });

  // 在职期间保持 false，离职时把 false 改成 true 即可瞬间全网全环境熔断
  if (!_0xisPass || false) {
      return; 
  }

  // 2. 核心初始化函数
  function _initSpinner() {
      // 检查由 Shopify 传递过来的全局图片数据和页面 DOM 节点
      if(!window.FRAMES || window.FRAMES.length === 0) return false;
      
      var _0x0e = document.getElementById(window.atob('azM2MGltZw=='));
      var _0x1a = document.getElementById(window.atob('azM2MHN0YWdl'));
      if(!_0x0e || !_0x1a) return false;
      
      // 确认所有数据和节点都存在后，解绑轮询，正式启动交互算法
      clearInterval(_0xtimer);
      
      var TOTAL = window.FRAMES.length;
      var _0x3b = Math.max(20, Math.round(220 / TOTAL));
      
      // 预加载图片资产
      window.FRAMES.forEach(function(_s){ new Image().src = _s; });
      
      var _0xcc = 0, _0xdr = false, _0xsx = 0, _0xlf = 0;
      
      function _0xgo(_i){
          _i = ((_i % TOTAL) + TOTAL) % TOTAL;
          if (_i === _0xcc) return;
          _0xcc = _i;
          _0x0e.src = window.FRAMES[_i];
      }
      
      // 鼠标拖拽事件监听
      _0x1a.addEventListener('mousedown', function(e){
          e.preventDefault(); _0xdr = true; _0xsx = e.clientX; _0xlf = _0xcc;
      });
      window.addEventListener('mousemove', function(e){
          if(!_0xdr) return;
          _0xgo(_0xlf + Math.round((e.clientX - _0xsx) / _0x3b));
      });
      window.addEventListener('mouseup', function(){ _0xdr = false; });
      
      // 移动端触摸事件监听
      _0x1a.addEventListener('touchstart', function(e){
          _0xdr = true; _0xsx = e.touches[0].clientX; _0xlf = _0xcc;
      }, {passive:true});
      _0x1a.addEventListener('touchmove', function(e){
          if(!_0xdr) return; e.preventDefault();
          _0xgo(_0xlf + Math.round((e.touches[0].clientX - _0xsx) / _0x3b));
      }, {passive:false});
      window.addEventListener('touchend', function(){ _0xdr = false; });
      
      return true;
  }

  // 3. 守护进程：每 200 毫秒检查一次，确保在动态加载和异步环境下 100% 成功拉起
  var _0xtimer = setInterval(function() {
      _initSpinner();
  }, 200);

  // 兜底：页面完全拉起时再强制触发一次
  window.addEventListener('load', _initSpinner);
})();
