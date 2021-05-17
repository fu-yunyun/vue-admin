
 <template>
  <div id="layout" :class="isCollapse ? 'close' : 'open'">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>

<script>
import LayoutHeader from "./Component/Header";
import LayoutMain from "./Component/Main";
import LayoutNav from "./Component/Nav";
import { computed } from "@vue/composition-api";
export default {
  name: "layout",
  components: { LayoutHeader, LayoutMain, LayoutNav },
  setup(props, { root }) {
    const isCollapse = computed(() => {
      return root.$store.state.isCollapse;
    });
    return {
      isCollapse,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>