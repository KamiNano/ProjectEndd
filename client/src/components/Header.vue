<template>
  <div>
    <div class="nv-navbar">
      <ul class="nav">
        <li class="logo-container icon-container header-icon">
          <img src="@/assets/logo.png" alt="Logo" class="logo-image" height="50px"/>
        </li>
      
      <ul class="nav" >
        <li><router-link :to="{ name: 'blogs' }">HomeToy</router-link></li>
        <li><router-link :to="{ name: 'users' }">Users</router-link></li>
        
        <!-- แสดง Logout เมื่อผู้ใช้ล็อกอิน -->
        <li v-if="isUserLoggedIn">
          <a v-if="isAdmin" href="#"  v-on:click="navigateTo('/blog/create')">AddToy</a>
          <a href="#" v-on:click.prevent="logout">Logout</a>
          
        </li>
        <!-- แสดง Login เมื่อยังไม่ล็อกอิน -->
        <li v-else>
          <router-link :to="{ name: 'login' }">Login</router-link>
        </li>

      </ul>
      </ul>
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
  computed: {
    // ใช้ computed เพื่อดึงค่าจาก store
    isUserLoggedIn() {
      return this.$store.state.user !== null;
    },

    isAdmin() {
      return this.$store.state.userType == "admin"
    },
    currentUser() {
      return this.$store.state.user;
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
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
  }
};
</script>

<style scoped>
.nv-navbar {
  background-color: #567dff;
  width: 100%;
  height: 40px;
  padding: 10px 0px 10px 0px;
}
.nv-navbar .nav {
  list-style: none;
  margin: 0;
  padding: 0;
  float: left;
}
.nv-navbar .nav li {
  float: left;
}
.nv-navbar .nav li a {
  padding: 10px;
  text-decoration: none;
  color: rgb(211, 211, 211);
  font-weight: bold;
}
.nv-navbar .nav li a:hover {
  padding: 10px;
  text-decoration: none;
  color: rgb(255, 255, 255);
}
.nv-navbar .nav li a.router-link-active {
  background-color: #6085ff;
  color: rgb(255, 255, 255);
  border-radius: 15px;
}
/* ทำให้ปุ่ม Logout ชิดขวา */
.nv-navbar .nav li:last-child {
  float: right;
}
.clearfix {
  clear: left;
}
/* จัดตำแหน่งไอคอนให้ไปอยู่ทางซ้ายสุด */
.icon-container {
  display: flex;
  align-items: center;
  margin-right: auto; /* จัดตำแหน่งไอคอนไปอยู่ทางซ้ายสุด */
}

.header-icon {
  width: 32px; /* ขนาดของไอคอนรูปภาพ */
  height: 32px;
  border-radius: 50%; /* ทำให้รูปภาพเป็นวงกลม */
  cursor: pointer;
}
.nv-navbar {
  background-color: #3f51b5;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* กระจายเนื้อหาให้อยู่คนละฝั่ง */
  border-radius: 15px;
}

.left-section {
  display: flex;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-image {
  width: 40px; /* ปรับขนาดโลโก้ */
  height: auto;
  margin-right: 10px; /* ระยะห่างระหว่างโลโก้กับเมนู */
}

.nav {
  list-style-type: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}

.nav li {
  margin-right: 15px; /* ระยะห่างระหว่างเมนู */
}
</style>
