import _ from "lodash";

export default {
  data(): any {
    return {
      //@ts-ignore
      page: +this.$route.query.page || 1,
      pageSize: 5,
      pageCount: 0,
      allItem: [],
      items: []
    };
  },
  methods: {
    changePage(page: number) {
      //@ts-ignore
      this.$router.push(`${this.$route.path}?page=${page}`);
      //@ts-ignore
      this.items = this.allItems[page - 1] || this.allItem[0];
    },
    setupPagination(allItems: any[]) {
      //@ts-ignore
      this.allItems = _.chunk(allItems, this.pageSize);
      //@ts-ignore
      this.pageCount = _.size(this.allItems);
      //@ts-ignore
      this.items = this.allItems[this.page - 1] || this.allItem[0];
    }
  }
};
