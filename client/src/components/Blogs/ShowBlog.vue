<!-- 2.5 -->

<template>
  <div class="show-blog-container">
    <!-- <h1 class="show-blog-title">Show Blog</h1> -->
    <div class="show-blog-content">
      <img :src="BASE_URL + blog.thumbnail" alt="Blog Thumbnail" class="blog-thumbnail" />
      <div class="blog-details">
        <p><strong>ชื่อ :</strong> {{ blog.title }}</p>
        <p><strong>ประเภท:</strong> {{ blog.category }}</p>
        <p><strong>บริษัทที่ผลิต:</strong> {{ blog.status }}</p>
        <p><strong>รายละเอียด:</strong></p>
        <p v-html="blog.content"></p>
        <div class="button-container">
          <button @click="navigateTo('/blogs')" class="back-button">กลับหน้าหลัก   </button>
          <div v-if="isUserLoggedIn && isAdmin">
            <button @click="navigateTo('/blog/edit/' + blog.id)" class="edit-button">แก้ไข</button>
            <button @click="deleteBlog(blog)" class="remove-button">ลบข้อมูล</button>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogsService from '@/services/BlogsService';

export default {
  data() {
    return {
      blog: {},
      BASE_URL: 'http://localhost:8081/assets/uploads/',
    };
  },
  async created() {
    try {
      let blogId = this.$route.params.blogId;
      this.blog = (await BlogsService.show(blogId)).data;
    } catch (error) {
      console.log(error);
    }
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
    async deleteBlog (blog) {
            let result = confirm("Want to delete?")
            if (result) {
                try {
                    await BlogsService.delete(blog)
                    this.refreshData()
                    this.$router.push({ name: 'blogs' });
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async refreshData() {
            this.blogs = (await BlogsService.index()).data
        }
  },
};
</script>

<style scoped>
.show-blog-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.show-blog-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.show-blog-content {
  display: flex;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.blog-thumbnail {
  width: 250px;
  height: auto;
  margin-right: 20px;
  border-radius: 8px;
}

.blog-details {
  display: flex;
  flex-direction: column;
}

.button-container {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.back-button {
  background-color: #2558ff;
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

.blog-thumbnail {
  width: 250px;
  height: 250px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 10px;
}
</style>
