import Vue from 'vue';

const PAGES_ENDPOINT = '/pages';

export default {
  async getList(pagination = {}) {
    return (await Vue.axios.get(PAGES_ENDPOINT, {
      params: {
        page: pagination.page,
        'per-page': pagination.rowsPerPage,
        sort: `${pagination.descending ? '-' : ''}${pagination.sortBy}`,
      },
    })).data;
  },

  async getPage(id) {
    return (await Vue.axios.get(`${PAGES_ENDPOINT}/${id}`)).data;
  },

  async create(data) {
    await Vue.axios.post(PAGES_ENDPOINT, data);
  },

  async update(id, data) {
    await Vue.axios.put(`${PAGES_ENDPOINT}/${id}`, data);
  },

  async delete(id) {
    await Vue.axios.delete(`${PAGES_ENDPOINT}/${id}`);
  },
};
