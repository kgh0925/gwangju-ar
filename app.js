(function () {
  "use strict";

  var DEFAULT_IMAGE = "jinnammun.png";
  var MAX_OBJECT_URLS = 4;
  var objectUrls = [];

  var imageInput = document.getElementById("imageInput");
  var resetButton = document.getElementById("resetButton");
  var statusText = document.getElementById("statusText");
  var notice = document.getElementById("notice");
  var marker = document.getElementById("hiroMarker");
  var texture = document.getElementById("arTexture");
  var arImage = document.getElementById("arImage");
  var scene = document.getElementById("arScene");

  function setStatus(text) {
    statusText.textContent = text;
  }

  function setNoticeVisible(visible) {
    notice.classList.toggle("is-hidden", !visible);
  }

  function rememberObjectUrl(url) {
    objectUrls.push(url);

    while (objectUrls.length > MAX_OBJECT_URLS) {
      URL.revokeObjectURL(objectUrls.shift());
    }
  }

  function revokeObjectUrls() {
    objectUrls.forEach(function (url) {
      URL.revokeObjectURL(url);
    });
    objectUrls = [];
  }

  function fitImageToMarker(image) {
    var markerWidth = 2.25;
    var maxHeight = 1.65;
    var aspect = image.naturalWidth / image.naturalHeight;
    var width = markerWidth;
    var height = markerWidth / aspect;

    if (height > maxHeight) {
      height = maxHeight;
      width = maxHeight * aspect;
    }

    arImage.setAttribute("width", width.toFixed(3));
    arImage.setAttribute("height", height.toFixed(3));
  }

  function loadArImage(src, label) {
    var probe = new Image();

    probe.onload = function () {
      fitImageToMarker(probe);
      texture.setAttribute("src", src);
      arImage.setAttribute("src", src);
      arImage.flushToDOM();
      setStatus(label);
    };

    probe.onerror = function () {
      setStatus("이미지를 불러오지 못했습니다");
    };

    probe.src = src;
  }

  function handleFileChange(event) {
    var file = event.target.files && event.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type || file.type.indexOf("image/") !== 0) {
      setStatus("이미지 파일만 선택할 수 있습니다");
      return;
    }

    var url = URL.createObjectURL(file);
    rememberObjectUrl(url);
    loadArImage(url, file.name);
  }

  function resetImage() {
    imageInput.value = "";
    loadArImage(DEFAULT_IMAGE, "기본 이미지");
  }

  function bindArEvents() {
    marker.addEventListener("markerFound", function () {
      setStatus("마커 인식됨");
      setNoticeVisible(false);
    });

    marker.addEventListener("markerLost", function () {
      setStatus("마커를 찾는 중");
      setNoticeVisible(true);
    });

    scene.addEventListener("loaded", function () {
      setStatus("카메라 준비 완료");
    });

    scene.addEventListener("camera-init", function () {
      setStatus("카메라 연결됨");
    });

    scene.addEventListener("camera-error", function () {
      setStatus("카메라 권한 또는 연결 오류");
      setNoticeVisible(true);
    });
  }

  function tuneRuntime() {
    if (!window.AFRAME || !window.AFRAME.THREE) {
      return;
    }

    window.AFRAME.THREE.Cache.enabled = true;
  }

  function init() {
    tuneRuntime();
    bindArEvents();
    imageInput.addEventListener("change", handleFileChange);
    resetButton.addEventListener("click", resetImage);
    window.addEventListener("beforeunload", revokeObjectUrls);
    loadArImage(DEFAULT_IMAGE, "기본 이미지");
  }

  init();
})();
