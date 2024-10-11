<template>
  <div><center>
    <h1>User Login</h1>
    <form v-on:submit.prevent="onLogin">
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" v-model="email" required />
      </div>
      <br>
      <div>
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          required
        />
      </div>
      <br>
      <button class="edit-button" type="submit">Login</button> <button class="back-button" v-on:click="navigateTo('/user/create')">สร้างผู้ใช้</button>
      
      <div class="error" v-if="error">{{ error }}</div>
    </form>
  </center></div>
</template>

<script>
import AuthenService from "../services/AuthenService";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async onLogin() {
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password,
        });

        // เก็บ token และข้อมูลผู้ใช้ใน store
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        
        // ตรวจสอบประเภทผู้ใช้และเก็บใน store
        const userType = response.data.user.type; // ดึงประเภทผู้ใช้จาก response
        this.$store.dispatch("setUserType", userType);

        // หากเป็นแอดมิน ให้ไปยังหน้าแอดมิน มิฉะนั้นไปที่หน้า users
        if (userType === 'admin') {
          this.$router.push({ name: "admin" }); // เปลี่ยนเส้นทางไปที่หน้าแอดมิน
        } else {
          this.$router.push({ name: "users" }); // เปลี่ยนเส้นทางไปที่หน้าผู้ใช้
        }
      } catch (error) {
        console.log(error);
        this.error = error.response.data.error;
        this.email = "";
        this.password = "";
      }
    },
  },
};
</script>

<style scoped>
.back-button {
  background-color: #f0ad4e;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button {
  background-color: #5cb85c;
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
