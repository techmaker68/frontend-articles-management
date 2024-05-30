<template>
  <div class="container mt-5">
    <div class="card p-4 shadow-lg w-100 mx-auto">
      <h2 class="text-center mb-4">
        {{ currentArticle ? "Edit" : "Add" }} Article
      </h2>
      <form @submit.prevent="submitArticle">
        <div class="mb-3">
          <label for="title" class="form-label">Title:</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="title"
            required
          />
        </div>
        <div class="mb-3">
          <label for="body" class="form-label">Body:</label>
          <textarea
            class="form-control"
            id="body"
            v-model="body"
            required
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="author" class="form-label">Author:</label>
          <input
            type="text"
            class="form-control"
            id="author"
            v-model="author"
            required
          />
        </div>
        <div class="mb-3">
          <label for="publication_date" class="form-label"
            >Publication Date:</label
          >
          <input
            type="date"
            class="form-control"
            id="publication_date"
            v-model="publication_date"
            required
          />
        </div>
        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-primary">
            {{ currentArticle ? "Update" : "Create" }}
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="$emit('close')"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { saveArticle, updateArticle } from "@/api/article";
import { formatDate } from "@/services/helper";
import { toast } from "vue3-toastify";
export default {
  props: ["currentArticle"],
  emits: ["submit", "close"],
  data() {
    return {
      id: this.currentArticle ? this.currentArticle.id : "",
      title: this.currentArticle ? this.currentArticle.title : "",
      body: this.currentArticle ? this.currentArticle.body : "",
      author: this.currentArticle ? this.currentArticle.author : "",
      publication_date: this.currentArticle
        ? formatDate(this.currentArticle.publication_date)
        : "",
    };
  },
  methods: {
    async submitArticle() {
      const articleData = {
        title: this.title,
        body: this.body,
        author: this.author,
        publication_date: this.publication_date,
      };

      try {
        if (this.currentArticle) {
          await updateArticle(this.id, articleData);
          toast.success("The Record Has been Updated");
        } else {
          await saveArticle(articleData);
          toast.success("The Record Has Been Added!.");
        }
        this.$emit("submit");
        this.$emit("close");
      } catch (error) {
        console.error("Failed to submit article:", error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
}
.card {
  border-radius: 10px;
}
</style>
