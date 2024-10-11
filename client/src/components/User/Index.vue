<template>
  <div>
    <h1>Get All Users</h1>
    <div>
      <!-- <button v-on:click="navigateTo('/user/create')">สร้างผู้ใช้</button> -->
    </div>
    <hr>
    <div v-if="users.length">
      <div><b>จำนวนผู้ใช้งาน:</b> {{ users.length }}</div>
      <div v-for="userItem in users" v-bind:key="userItem.id">
        <div><b>id:</b> {{ userItem.id }}</div>
        <div><b>ชื่อผู้ใช้:</b> {{ userItem.name }} {{ userItem.lastname }}</div>
        <div><b>อีเมล:</b> {{ userItem.email }}</div>
        <div><b>status:</b> {{ userItem.status }}</div>
        <div><b>type:</b> {{ userItem.type }}</div>
        <div>
          <button class="btn back-button" v-on:click="navigateTo('/user/'+userItem.id)">ดูข้อมูล</button>
          <!-- แสดงปุ่มแก้ไข/ลบถ้าผู้ใช้เป็น admin -->
          <div v-if="user && user.type === 'admin'">
            <button class="btn edit-button" v-on:click="navigateTo('/user/edit/'+userItem.id)">แก้ไขข้อมูล</button>
            <button class="btn remove-button" v-on:click="deleteUser(userItem)">ลบข้อมูล</button>
          </div>
        </div>
        <hr>
      </div>
    </div>

    <!-- ปุ่ม Logout จะแสดงเมื่อมีการล็อกอิน -->
    <div v-if="user">
      <!-- <button v-on:click="logout">Logout</button> -->
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";

export default {
  data() {
    return {
      users: [],
      user: null // เก็บข้อมูลผู้ใช้ปัจจุบัน
    };
  },
  async created() {
    await this.refreshData(); // โหลดข้อมูลผู้ใช้
    this.user = this.$store.state.user; // ดึงข้อมูลผู้ใช้ปัจจุบันจาก store
  },
  methods: {
    async refreshData() {
      try {
        this.users = (await UsersService.index()).data;
        this.user = this.$store.state.user; // ดึงข้อมูลผู้ใช้จาก store ทุกครั้งที่ refresh
      } catch (err) {
        console.log(err);
      }
    },
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$router.push({ name: 'login' });
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteUser(userItem) {
      let result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?");
      if (result) {
        try {
          await UsersService.delete(userItem);
          await this.refreshData(); // refresh ข้อมูลหลังจากลบผู้ใช้สำเร็จ
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
};
</script>

<style scoped>
.back-button {
  background-color: #2558ff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}
  .edit-button {
  background-color: #e0ca00;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.remove-button {
  background-color: #e4523e;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
