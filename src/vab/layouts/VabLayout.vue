<template>
  <!-- 纵向布局 -->
  <div
    class="vab-layout-vertical"
    :class="{
      fixed: fixedHeader,
      'no-tabs-bar': !showTabs,
    }"
  >
    <!-- <vab-side-bar /> -->
    <sidebar />
    <div
      v-if="device === 'mobile' && !collapse"
      class="v-modal"
      @click="handleFoldSideBar"
    />
    <div
      class="vab-main"
      :class="{
        'is-collapse-main': collapse,
      }"
    >
      <div
        class="vab-layout-header"
        :class="{
          'fixed-header': fixedHeader,
        }"
      >
        <vab-nav />
        <!-- <vab-tabs v-show="showTabs" /> -->
        <!-- <tabs style="position: absolute; top: 50px; left: 266px" /> -->
      </div>
      <!-- <tabs style="position: absolute; top: 50px; margin-left: 266px" /> -->

      <vab-app-main />
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import sidebar from '@/components/sidebar.vue'

  export default {
    name: 'VabLayoutVertical',

    components: {
      sidebar,
    },

    props: {
      collapse: {
        type: Boolean,
        default() {
          return false
        },
      },
      fixedHeader: {
        type: Boolean,
        default() {
          return true
        },
      },
      showTabs: {
        type: Boolean,
        default() {
          return true
        },
      },
      device: {
        type: String,
        default() {
          return 'desktop'
        },
      },
    },
    created() {},
    methods: {
      ...mapActions({
        handleFoldSideBar: 'settings/foldSideBar',
      }),
    },
  }
</script>

<style lang="scss" scoped>
  .vab-layout-vertical {
    .fixed-header {
      left: $base-left-menu-width;
      width: $base-right-content-width;
    }
  }
  .vab-layout-vertical .fixed-header {
    position: absolute;
    top: 0;
    left: 266px;
  }
</style>
