<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Articles</h2>

      <div>
        <button @click="logout" class="btn btn-danger me-2">Logout</button>
        <button @click="showForm" class="btn btn-primary">
          Add New Article
        </button>
      </div>
    </div>
    <div class="align-items-end mb-3 d-flex">
      <input
        type="text"
        class="form-control"
        id="search"
        v-model="searchQuery"
        placeholder="Search Articles"
      />
      <button @click="searchArticles" class="ms-2 btn btn-primary">
        Clear
      </button>
    </div>

    <article-form
      v-if="showArticleForm"
      @close="hideForm"
      @submit="fetchArticles"
      :currentArticle="currentArticle"
    ></article-form>
    <ul class="list-group">
      <li v-for="article in filteredArticles" :key="article.id" class="list-group-item">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h3>Title: {{ article.title }}</h3>
            <p>{{ article.body }}</p>
            <p>Author: {{ article.author }}</p>
            <p>Published date: {{ new Date(article.publication_date) }}</p>
          </div>
          <div>
            <button @click="editArticle(article)" class="btn btn-warning me-2">
              Edit
            </button>
            <button @click="deleteArticle(article.id)" class="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ArticleForm from "./ArticleForm.vue";
import { getArticles, deleteArticle } from "@/api/article";
import { mapStores } from "pinia";
import { toast } from "vue3-toastify";
import { useAuthStore } from "@/stores/Index";
export default {
  components: {
    ArticleForm,
  },
  data() {
    return {
      articles: [],
      showArticleForm: false,
      currentArticle: null,
      searchQuery: '',
    };
  },
  methods: {
    async fetchArticles() {
      try {
        this.currentArticle = null;
        const response = await getArticles();
        this.articles = response.data.data;
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    },
    async deleteArticle(id) {
      try {
        const response = await deleteArticle(id);
        toast("Record Deleted Successfully");
        this.articles = response.data.data;
      } catch (error) {
        console.error("Failed to delete article:", error);
      }
    },
    showForm() {
      this.showArticleForm = true;
    },
    hideForm() {
      this.showArticleForm = false;
    },
    editArticle(article) {
      this.currentArticle = article;
      this.showForm();
    },
    logout() {
      this.authStore.logout();
      this.$router.push("/");
    },
    searchArticles(search) {
    this.searchQuery=''
    },
  },
  created() {
    this.fetchArticles();
  },
  computed: {
    ...mapStores(useAuthStore),
    filteredArticles() {
      return this.articles.filter(
        (article) =>
          article.title
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          article.author.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
.list-group-item {
  border: none;
  border-bottom: 1px solid #ddd;
}
</style>
