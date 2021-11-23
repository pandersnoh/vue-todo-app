<template>
  <div class="todo-contents-container">
    <div class="todo-date">
      <div class="date-left">
        <p>{{ getToday() }}<span>{{ currentHours }}:{{ minutes }}:{{ seconds }}</span></p>        
      </div>
      <div class="date-right">
        <button @click="deleteAll()">
          전체 삭제
        </button>
      </div>
    </div>
    <div class="todo-contents">
      <div class="todo-insert">
        <input
          type="text"
          placeholder="오늘 할일을 입력해주세요"
          @keyup.enter="addTodo(work)"
          v-model="work" />
        <button
          @click="addTodo(work)">
          <i class="bi bi-box-arrow-in-down-left"></i>
        </button>
      </div>
      <div class="todo-sorting">
        <div class="sorting-left">
          <label
            for="select-all"
            :class="[allSelected || workingTodos == 0 ? 'active': '']">
            <input
              type="checkbox"
              id="select-all"
              v-model="allSelected" />
            <i class="bi bi-check2-all"></i>
            <span v-if="allSelected || workingTodos == 0">전체완료 해제</span>
            <span v-else>전체완료 처리</span>
          </label>
        </div>
        <div class="sorting-right">
          <button
            @click="userFilterKey = 'filterAll'"
            class="filter-btn"
            :class="{ active: userFilterKey == 'filterAll' }">
            모두
          </button>
          <button
            @click="userFilterKey = 'filterWorking'"
            class="filter-btn"
            :class="{ active: userFilterKey == 'filterWorking' }">
            진행중
          </button>
          <button
            @click="userFilterKey = 'filterComp'"
            class="filter-btn"
            :class="{ active: userFilterKey == 'filterComp' }">
            완료
          </button>        
        </div>
      </div>
      <div class="todo-list-container">
        <transition-group
          name="list"
          tag="ul"
          class="todo-list"
          :class="{ hidden: workingTodos === 0 && userFilterKey == 'filterWorking' || compTodos === 0 && userFilterKey == 'filterComp' }">
          <li
            v-for="todo in filteredList"
            class="list-item"
            :class="{ on: todo.finished }"
            :key="todo.id">
            <dl>
              <dt>
                <div class="todo-title">
                  <input
                    type="checkbox"
                    class="todo-check"
                    :id="'todo-check' + todo.id"
                    :value="todo.id"
                    v-model="todo.finished" />                         
                  <label :for="'todo-check' + todo.id"></label>
                  <div class="todo-txtdate">
                    <strong
                      @dblclick="todo.titleHidden = true"
                      v-show="!todo.titleHidden">{{ todo.work }}</strong>
                    <input
                      type="text"
                      class="input-todoTitle"
                      v-if="todo.titleHidden"
                      @blur="todo.titleHidden = false"
                      @keyup.enter="todo.titleHidden = false"
                      @keyup.esc="todo.titleHidden = false"
                      v-model="todo.work" />
                    <span>{{ todo.date }}</span>
                  </div>
                </div>
                <div
                  class="todo-buttons">
                  <button
                    class="open-memo"
                    :class="{ on: todo.memoShow }"
                    @click="openMemo(todo)">
                    <i class="bi bi-chevron-double-down"></i>
                  </button>         
                  <button
                    class="del-todo"
                    @click="deleteTodo(todo)">
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </div>
              </dt>
              <dd :class="{ on: todo.memoShow }">
                <textarea v-model="todo.memo"></textarea>
                <div class="memo-buttons">
                  <button @click="delMemo(todo)">
                    메모삭제
                  </button>              
                </div>
              </dd>
            </dl>
          </li>
        </transition-group>
        <transition name="fade">
          <div
            class="txt-process"
            v-if="workingTodos === 0 && userFilterKey === 'filterWorking'">
            진행중인 일정이 없습니다
          </div>
        </transition> 
        <transition name="fade">       
          <div
            class="txt-process"
            v-if="compTodos === 0 && userFilterKey === 'filterComp'">
            완료된 일정이 없습니다
          </div>
        </transition>
      </div>
      <div class="todo-remains">
        <span v-if="workingTodos > 0">아직 할일이 <strong>{{ workingTodos }}</strong>개 남았습니다.</span>
        <span v-else>등록된 일정 없음</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [
        {
          "id": 1, 
          "work": "vue.js 포트폴리오 만들기",
          "date":"2021-10-08",
          "memo": "ToDo 프로젝트 완성하기\n리스트 Sorting 기능 및 전체 체크박스 처리 기능 구현",
          "memoShow": false,
          "finished": false,
          "titleHidden": false
        },
        {
          "id": 2,
          "work": "크리스마스 이벤트 기획",
          "date":"2021-10-07",
          "memo": "이벤트 시안 수집 및 미팅 후 시안 작업",
          "memoShow": false,
          "finished": false,
          "titleHidden": false
        },
        {
          "id": 3, 
          "work": "연말 최종결산 기획전 제안서 작성",
          "date":"2021-09-30",
          "memo": "기획전 상품 및 디자인 컨셉 관련 미팅 진행",
          "memoShow": false,
          "finished": false,
          "titleHidden": false
        },
        {
          "id": 4,
          "work": "라이즈레코드 노 이사님 점심식사",
          "date":"2021-10-01",
          "memo": "장소 : 하동관 여의도 1호점\n메뉴 : 곰탕",
          "memoShow": false,
          "finished": false,
          "titleHidden": false
        },
        {
          "id": 5,
          "work": "디자인팀 회의 자료준비",
          "date":"2021-09-10",
          "memo": "2022년 신년 위드코로나 이벤트 관련 자료수집",
          "memoShow": false,
          "finished": false,
          "titleHidden": false
        }  
      ],
      work: '',
      currentHours: '00',
      minutes: '00',
      seconds: '00',
      userFilterKey: 'filterAll',
      nextTodoId: 6,
    }
  },
  computed: {
    filteredList() {
      return this[this.userFilterKey]
    },
    filterAll() {
      return this.todos
    },
    filterWorking() {
      return this.todos.filter(todo => todo.finished === false)
    },
    filterComp() {
      return this.todos.filter(todo => todo.finished === true)
    },
    // finishedTodos() {
    //  return this.todos.filter(todo => todo.finished === true).length
      // todo의 finished가 true인 것만 return하고 이것의 길이를 반환한다
    // },
    workingTodos() {
      return this.todos.filter(todo => todo.finished === false).length
    },
    compTodos() {
      return this.todos.filter(todo => todo.finished === true).length
    },
    allSelected: {
      get: function() {
        return this.workingTodos === 0;
      },
      set: function(value) {
        this.todos.forEach(function(todo) {
          todo.finished = value;
        });
      }     
    }
  },
  methods: {
    addTodo(work) { // ToDo 추가
      if(!this.work) {
        alert('할 일을 입력해주세요')
      }
      else {
        const getDate = new Date();
        const thisToday = new Date(getDate.getTime() - (getDate.getTimezoneOffset() * 60000)).toISOString().substr(0, 10);

        this.todos.push( { 
          "id": this.nextTodoId++,
          "work": work,
          "date": thisToday,
          "memo": '',
          "memoShow": false, 
          "finished": false,
          "titleHidden": false          
        }) // 입력한 내용 삽입
      }
      this.work = "" // 텍스트박스 입력내용 제거
    },
    delMemo(index) { // 메모 삭제
      const item = this.todos.indexOf(index)
      this.todos[item].memo = ""
    },
    deleteTodo(index) { // 할일 삭제
      const item = this.todos.indexOf(index)
      this.todos.splice(item, 1)
    },
    openMemo(index) { // 메모 열기
      const item = this.todos.indexOf(index)
      if(this.todos[item].memoShow == false) {
        this.todos[item].memoShow = true
      }
      else {
        this.todos[item].memoShow = false
      }      
    },
    deleteAll() { // ToDo 전체 삭제
      if(this.todos == '') {
        alert('삭제할 내용이 없습니다.')
      } else {
      this.todos = []
      }
    },
    setTime() {
      setInterval(() => {
        const date = new Date()
        const hours = date.getHours()
        this.currentHours = ("0" + hours).slice(-2);
        this.minutes = this.checkSingleDigit(date.getMinutes())
        this.seconds = this.checkSingleDigit(date.getSeconds())
      }, 1000)
    },
    checkSingleDigit (digit) {
      return ('0' + digit).slice(-2)
    },    
    getToday(){
        const week = new Array(
          '일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'
        );

        const date = new Date();
        const year = date.getFullYear();
        const month = ("0" + (1 + date.getMonth())).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        const today = date.getDay();
        const todayLabel = week[today];

        return year + "년 " + month + "월 "  + day + "일 " + "(" + todayLabel + ")";
    }    
  },
  mounted() {
    this.setTime()
  }
}
</script>

<style scoped lang="scss">
@import "~/scss/main.scss";

@mixin flex($justify, $align) {
	display: flex;
	justify-content: $justify;
	align-items: $align;
}

  .todo-date {
    display: flex;
    width: 100%;
    margin-bottom: 10px;
    .date-left {
      @include flex(left, center);
      flex-grow: 1;
      text-shadow: 2px 2px 1px rgba(0,0,0,0.25);
      color: #fff;
      font-size: 18px;
      margin-left: 10px;
      line-height: 150%;
      p {
        margin-bottom: 0px;
        span {
          margin-left: 8px;
        }
      }
    }
    .date-right {
      button {
        border-radius: 5px;
        background-color: #222222;
        color: #fff;
        border: 0px;
        padding: 5px 20px;
        margin-right: 10px;
        letter-spacing: -0.03em;
        transition: background-color 0.3s;
        &:hover {
          background-color: #474747;
        }
      }
    }
  }
  .todo-contents-container {
    min-width: 220px;
    max-width: 550px;
    margin: auto;
  }
  .input-todoTitle {
    width: auto;
    height: 30px;
    border: 1px solid #ccc;    
  }
  .todo-contents {
    padding: 20px;
    background-color: #f4f7fc;
    border-radius: 10px;
    -webkit-box-shadow: 7px 7px 10px -5px rgba(0,0,0,0.38); 
    box-shadow: 7px 7px 10px -5px rgba(0,0,0,0.38);
  }
  .todo-list-container {
    position: relative;
  }
  .todo-list {
    padding: 0px;
    margin-bottom: 0px;
    transition: height 1s;
    min-height: 200px;
    &.hidden {
      transition: height 1s;
    }
    li {
      position: relative;
      &.on .todo-txtdate strong {
        color: #a5a5a5;
      }  
      &.on .todo-txtdate strong::after {
        width: 100%;
        background-color: #a5a5a5;
      }    
      &.on dl {
        background-color: #dddddd;
      }      
    }         
  }
  .txt-process {
    text-align: center;
    color: #bbbbbb;
    opacity: 1;
    position: absolute;
      top: 50%;
      left: 0;
      right: 0;
  }  
  .fade-enter-active {
    transition: opacity 0.5s ease;
    transition-delay: 0.4s;
    padding: 0px;
  }
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    height: 0;
  }
  .list-enter-active,
  .list-leave-active {
    transition: all 0.4s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }  
  .todo-txtdate {
    margin-left: 10px;
    overflow: hidden;
    max-width: 100%;
      strong {
        position: relative;
        display: block;
        font-weight: normal;
        font-size: 18px;
        letter-spacing: -0.03em;
        color: #444444;
        line-height: 180%;
        &::after {
          content: ' ';
          position: absolute;
          top: 47%;
          left: 0;
          width: 0;
          height: 1px;
          transition: width 0.2s;
        }   
      }           
      span {
        font-size: 12px;
        font-weight: normal;
        color: #b4bac5;
        line-height: 12px;
        display: block;
      }    
   }   
  .todo-insert {
    position: relative;
    padding-bottom: 20px;
    display: flex;
    input[type='text'] {
      display: flex;
      flex-grow: 1;
      height: 50px;
      padding-left: 43px;
      background-image: url('~/assets/input_bg.png');
      background-size: 30px;
      background-position: 7px 12px;
      background-repeat: no-repeat;
      border: 1px solid #dddddd;
      border-radius: 6px 0px 0px 6px;
    }
    button {
      border: 0px;
      border-radius:0 6px 6px 0;
      background-color: #555555;
      color: #ffffff;
      width: 60px;
      transition: background-color 0.3s;
      &:hover {
        background-color : #333333;
      }
      i {
        font-size: 22px;
      }
    }
    &::after {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: #ccc;
    }
  }
  .todo-sorting {
    display: flex;
    width: 100%;
    margin: 10px 0;
    .sorting-left {
      @include flex(left, center);
      flex-grow: 1;
      label {
        color: #000000;
        font-size: 13px;
        cursor: pointer;
        margin-left: 5px;
        position: relative; 
        transition: opacity 0.5s;
        opacity: 0.5;
        &::after {
          content: '';
          display: block;
          clear: both;
        }
        &:hover {
          opacity: 1;
        }        
        &.active {
          opacity: 1;
          transition: color 0.3s;
          &:hover {
            color: #da4242;
          }
        }
        input[id="select-all"] {
          display: none;
        }
        input[id="select-all"]:checked + i,
        input[id="select-all"]:checked + label {
          opacity: 1;
        }           
        i {
          font-size: 26px;
          display: inline-flex;
          float: left;
        }
        span {
          margin-left: 5px;
          font-weight: 300;
          float: left;
          line-height: 220%;
          font-size: 12px;
        }
      }
    }
    .sorting-right {
      @include flex(right, center);
      button {
        border: 0px;
        background: none;
        color: #000000;
        font-size: 14px;
        opacity: 0.4;
        transition: opacity 0.2s;
        &.active,
        &:hover {
          opacity: 1;
        }
      }
    }
  }
  dl {
    padding: 0 10px;
    margin-bottom: 0px;
    background-color: #e0e8f5;
    min-height: 70px;
    margin-top: 10px;
    padding: 14px 10px;
    border: 1px solid #e0e8f5;
    border-radius: 8px;
    transition: background-color 0.3s;
    &:hover {
      cursor: pointer;
      background-color: #ffffff;
      border:1px solid #ddd;
    }
    dt {
      position: relative;
      @include flex(center, center);
      height: 50px;
        .todo-title {
          @include flex(left, center);
          flex-grow: 1;
          min-width: 180px;
          input[type='checkbox'] {
            display: none;
          }
          input[type='checkbox'] + label {
            width: 30px;
            height: 30px;
            appearance: none;
            background-image: url('~/assets/checkbox_sprite.png');
            background-size: cover;
            background-position: -31px 0px;
            cursor: pointer;            
          }
          input[type='checkbox']:checked + label {
            background-position: 0px 0px;
          }                   
        }
        .todo-buttons {
          @include flex(center, center);
          button {
            width: 50px;
            height: 50px;
            border: 0px;
            border-radius: 6px;
            color: #ffffff;
            font-size: 28px;   
            transition: background-color 0.3s;    
            text-align: center;
            @include flex(center, center);
          }
          .open-memo {
            background-color: #bec7d4;
            margin-right: 5px;
            &:hover {
              background-color: #aab2be;
            }
            &.on i::before {
              transform: rotate(180deg);
            }
          }
          .del-todo {
            background-color: #da4242;
            &:hover {
              background-color: #ba3838;
            }
          }
        }
    }
    dd {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.25s ease-out;
      margin: 0px;
      &.on {
        height: auto;
        max-height:500px;
        transition: max-height 0.35s ease-in;   
      }
      textarea {
        width: 100%;
        height: 100px;
        max-height: 120px;
        margin-top: 5px;
        margin-bottom: 5px;
        border: 1px solid #dae2ee;
        background: #efefef;
        color: #777777;
        font-size: 14px;
        letter-spacing: -0.03em;
        padding: 10px;
        border-radius: 5px;
        resize: none;
      }
      .memo-buttons {
        text-align: center;
        button {
          background-color: #333333;
          border: 0px;
          color: #ffffff;
          padding: 6px 10px;
          border-radius: 5px;
          margin-right: 5px;
          transition: background-color 0.3s;
          &:hover {
            background-color: #474747
          }          
        }          
      }
    }
  }
  .filter-btn.active {
    background: blue;
    color: white;
  }
  .todo-remains {
    text-align: center;
    padding: 20px 0px 15px;
    margin-top: 20px;
    font-size: 16px;
    color: #666666;
    position: relative;
    &::before {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 1px;
        background: #ccc;
        top: 0;
        left: 0;
    }
    strong {
      color: #ff0000;
    }
  }



  @media (max-width: 576px) {
    .todo-date {
      .date-left p {
        font-size: 14px;
      }
      .date-right {
        button {
          font-size: 12px;
        }
      }
    }
    .todo-txtdate {
      strong {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
      }
      span {
        font-size: 10px;
      }
    }
    .todo-sorting {
      .sorting-right {
        button {
          font-size: 12px;
        }
      }
    }
    dl {
      padding: 5px 8px;
      min-height: auto;
      &:hover {
        background-color: #e0e8f5;
        border: none;
      }
      dt {
        .todo-title {
          input[type=checkbox] {
            width: 22px;
            height: 22px;
          }
        }
        .todo-buttons {
          button {
            width: 30px;
            height: 35px;
            font-size: 1.250rem;
          }
        }
      }
    }
  }   
</style>