<template>
  <footer>
    <dl>
      <dt>
        <img
          src="~/assets/vuejs_logo.png"
          alt="Vue.js Logo" />
      </dt>
      <dd>
        <p>
          이 프로젝트는 <strong>Vue.js</strong>를 기반으로 제작되었습니다.<br />
          (C){{ new Date().getFullYear() }} SEUNGMIN ROH all rights reserved.
        </p>
      </dd>
    </dl>
    <p style="margin-top: 40px;">
      GitHub 저장소 : <a
        href="https://github.com/pandersnoh/vue-todo-app"
        target="_blank">https://github.com/pandersnoh/vue-todo-app</a>
    </p>    
  </footer>
</template>

<style scoped lang="scss">
@import "~/scss/main.scss";

  footer {
    padding: 60px 0;
    color: #ffffff;
    text-align: center;
    @include txtshadow(2px, 2px, 1px, rgba(0,0,0,0.25));
    dl {
      @include flex(center, center);
      dt {
        display: flex;
      }
      dd {
        @include flex(left, center);
        flex-grow: 0;
        margin-left: 10px;
        p {
          text-align: center;
        }
      }
      &::after {
        content: '';
        display: block;
        clear: both;
      }
    }
    img {
      width: 100px;
    }
    p {
      margin-bottom: 0px;
    }
  }
  @media (max-width: 576px) {
    footer {      
      dl {
        display: block;
        dt {
          display: block;
          text-align: center;
          margin-bottom: 5px;
        }
        dd {
          display: block;
          margin: 0px;
        }
      }
      p {
        text-align: center;
        font-size: 0.855rem;
      }      
    }
  }
</style>