<template>
  <div>
    <h1 class="q-headline">{{ title }}</h1>
    <form @submit.prevent="submit">
      <q-field :error="errors.has('slug')" :error-label="errors.first('slug')">
        <q-input v-validate="'required'" v-model.trim="form.slug" type="text" name="slug" float-label="Slug" />
      </q-field>
      <q-field :error="errors.has('title')" :error-label="errors.first('title')">
        <q-input v-validate="'required'" v-model.trim="form.title" type="text" name="title" float-label="Заголовок" />
      </q-field>
      <q-field :error="errors.has('text')" :error-label="errors.first('text')">
        <ckeditor v-validate="'required'" v-model.trim="form.text" name="text" />
      </q-field>
      <q-btn :label="button" :loading="$wait.is(loader.submit)" color="primary" type="submit" />
    </form>
    <q-inner-loading :visible="$wait.is(loader.data)">
      <q-spinner-mat :size="50" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script>
import api from '@/api/pages';
import Ckeditor from '@/components/Ckeditor.vue';

export default {
  components: {
    Ckeditor,
  },
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      loader: {
        data: 'data',
        submit: 'submit',
      },
      form: {
        slug: '',
        title: '',
        text: '',
      },
    };
  },
  computed: {
    isNew() {
      return this.id === null;
    },
    title() {
      return this.isNew ? 'Новая страница' : 'Редактирование страницы';
    },
    button() {
      return this.isNew ? 'Создать' : 'Отредактировать';
    },
  },
  watch: {
    id(val) {
      if (val) {
        this.fetch(val);
      }
    },
  },
  async created() {
    this.$validator.localize('ru', {
      attributes: {
        slug: 'Slug',
        title: 'Заголовок',
        text: 'Содержимое',
      },
    });

    if (!this.isNew) {
      this.fetch(this.id);
    }
  },
  methods: {
    async fetch(id) {
      try {
        this.$wait.start(this.loader.data);
        this.form = await api.getPage(id);
        this.$wait.end(this.loader.data);
      } catch (error) {
        this.$wait.end(this.loader.data);
        this.$router.push('/404');
      }
    },
    async submit() {
      await this.$validator.validateAll();
      if (this.errors.any()) {
        return;
      }

      try {
        this.$wait.start(this.loader.submit);
        if (this.isNew) {
          await api.create(this.form);
          this.$q.notify({ message: 'Страница создана', type: 'positive', icon: 'fas fa-check' });
        } else {
          await api.update(this.id, this.form);
          this.$q.notify({ message: 'Страница отредактирована', type: 'positive', icon: 'fas fa-check' });
        }
        this.$router.push('/pages/list');
        this.$wait.end(this.loader.submit);
      } catch (error) {
        if (error.response.status === 422) {
          error.response.data.forEach((err) => {
            this.errors.add(err.field, err.message);
          });
        }

        this.$wait.end(this.loader.submit);
      }
    },
  },
};
</script>
