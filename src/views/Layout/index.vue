
 <template>
  <div id="layout">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>

<script>
import LayoutHeader from "./Component/Header";
import LayoutMain from "./Component/Main";
import LayoutNav from "./Component/Nav";
export default {
  name: "layout",
  components: { LayoutHeader, LayoutMain, LayoutNav },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>