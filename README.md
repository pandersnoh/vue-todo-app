# Vue.js를 활용한 ToDo 애플리케이션

Vue.js를 이용하여 제작한 ToDo 애플리케이션 입니다.<br/>
포트폴리오 및 학습 용도로 제작하였습니다.<br/>

구현결과 : https://frosty-lichterman-bf0c28.netlify.app/

# 작업개요
- 제작년도 : 2021년
- 사용언어 : Vue.js, HTML, SASS(SCSS), JavaScript, Git/GitHub<br/>
- 패키지 : Webpack
- UI 프레임워크 : Bootstrap
- 작업기여도 : 마크업 100% / 스크립트 100% / 디자인 100%

# 주요기능

- Header영역, Contents영역, Footer영역별로 컴포넌트 분리
- methods 단계에서 push를 이용하여 데이터 배열에 ToDo 내용 추가
- Computed 단계에서 filter를 활용하여 "전체/진행중/완료" 별로 리스트 필터링 기능 구현
- transition-group를 활용하여 모션 효과 구현
- ToDo별로 세부적인 메모를 기록할 수 있는 항목 구현
- 일부 CSS코드 중 재사용되는 부분은 SASS의 Mixin을 활용하여 정의

# Webpack 기본 템플릿 정리

__webpack__: 모듈(패키지) 번들러의 핵심 패키지<br>
__webpack-cli__: 터미널에서 Webpack 명령(CLI)을 사용할 수 있음<br>
__webpack-dev-server__: 개발용으로 Live Server를 실행(HMR)<br>

__html-webpack-plugin__: 최초 실행될 HTML 파일(템플릿)을 연결<br>
__copy-webpack-plugin__: 정적 파일(파비콘, 이미지 등)을 제품(`dist`) 폴더로 복사<br>

__sass-loader__: SCSS(Sass) 파일을 로드<br>
__postcss-loader__: PostCSS(Autoprefixer)로 스타일 파일을 처리<br>
__css-loader__: CSS 파일을 로드<br>
__style-loader__: 로드된 스타일(CSS)을 `<style>`로 `<head>`에 삽입<br>
__babel-loader__: JS 파일을 로드<br>

__@babel/core__: ES6 이상의 코드를 ES5 이하 버전으로 변환<br>
__@babel/preset-env__: Babel 지원 스펙을 지정<br>
__@babel/plugin-transform-runtime__: Async/Await 문법 지원<br>

__sass__: SCSS(Sass) 문법을 해석(스타일 전처리기)<br>
__postcss__: Autoprefixer 등의 다양한 스타일 후처리기 패키지<br>
__autoprefixer__: 스타일에 자동으로 공급 업체 접두사(Vendor prefix)를 적용하는 PostCSS의 플러그인<br> 

