<template>
  <div class="container">      
    <div id="app">
      <h4>Names</h4>
      <div>
        <table class="table">
          <tr>
            <th>
              <input
                type="checkbox"
                v-model="checkAll" />
            </th>
            <th align="center">
              ID
            </th>
            <th align="center">
              Names
            </th>
          </tr>
          <tr
            v-for="(lang, index) in langs"
            :key="lang">
            <td>
              <input
                type="checkbox"
                v-model="checked"
                @click="this.lang[index].ichecked = true"
                :value="lang.id"
                number />
            </td>
            <td> {{ lang.id }}</td>
            <td> {{ lang.name }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      langs: [ 
        { "id": "1", "name": "Edward", "ichecked": false },
        { "id": "2", "name": "Lance", "ichecked": false },
        { "id": "3", "name": "Arellano", "ichecked": false },
        { "id": "4", "name": "Lorilla", "ichecked": false },
      ],
      checked: []      
    }
  },
  computed: {
    checkAll: {
      get: function () {
        return this.langs ? this.checked.length == this.langs.length : false;
      },
      set: function (value) {
        var checked = [];
        if (value) {
          this.langs.forEach(function (lang) {
            checked.push(lang.id);
          });
        }
        this.checked = checked;
        this.langs.ichecked = true
      }
    }
  }
}
</script>