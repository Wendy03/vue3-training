export default {
  template: ` 
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li
        class="page-item"
        :class="{'disabled': pages.current_page === 1}"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="changePage(pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="(page, index) in pages.total_pages"
        :key="page"
        class="page-item"
        :class="{'active': page === pages.current_page}"
      >
        <span
          class="page-link"
          v-if="page === pages.current_page"
        >{{ page }}</span>
        <a
          class="page-link"
          href="#"
          v-else
          @click.prevent="changePage(page)"
        >{{ page }}</a>
      </li>
      <li
        class="page-item"
        :class="{'disabled': pages.current_page === pages.total_pages}"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="changePage(pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`,
  props: ['pages'],
  methods: {
    changePage(page) {
      this.$emit('change-page', page);
    },
  },
};
