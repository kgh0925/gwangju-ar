# Gwangju AR Image Viewer

마커 기반 웹 AR 프로토타입입니다. 브라우저에서 이미지를 선택하면 HIRO 마커 위에 해당 이미지가 비율에 맞게 표시됩니다.

## 실행

```bat
start-server.bat
```

브라우저에서 `http://127.0.0.1:8000/index.html`을 엽니다. 카메라 권한을 허용한 뒤 HIRO 마커를 비추면 이미지가 표시됩니다.

## 변경된 구조

- `index.html`: AR scene과 최소 UI 골격
- `styles.css`: 카메라 위에 얹히는 컨트롤 UI
- `app.js`: 이미지 업로드, AR 이미지 비율 보정, 마커/카메라 상태 처리

## 점검 포인트

- 로컬 파일 직접 열기보다 `http://127.0.0.1:8000`에서 실행해야 카메라 권한이 안정적으로 동작합니다.
- 모바일 브라우저에서는 카메라 권한과 HTTPS/localhost 정책의 영향을 받습니다.
- 기본 마커는 AR.js의 `hiro` preset입니다.
