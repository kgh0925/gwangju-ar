# 광주읍성 AR 체험 프로토타입

AR.js와 A-Frame으로 만든 웹 기반 마커 AR 프로토타입입니다.

## 파일 구조

```text
.
├─ index.html
├─ jinnammun.png
└─ README.md
```

## 실행 흐름

1. `index.html`을 웹 서버 또는 GitHub Pages/Netlify에 올립니다.
2. 휴대폰에서 배포된 링크 또는 QR 코드로 접속합니다.
3. 카메라 권한을 허용합니다.
4. Hiro 마커를 비추면 `jinnammun.png` 이미지가 나타납니다.

## 이미지 교체

현재 `jinnammun.png`는 확인용 자리 이미지입니다.
복원 이미지가 완성되면 파일명을 그대로 `jinnammun.png`로 저장해 교체하면 됩니다.

## 주의

카메라 권한 때문에 휴대폰에서는 HTTPS 환경이 필요합니다.
발표용 링크는 GitHub Pages 또는 Netlify로 배포하는 방식을 권장합니다.
