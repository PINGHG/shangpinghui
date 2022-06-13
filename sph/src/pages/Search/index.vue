<template>
  <div>
    搜索
    {{ $route.params.keyword }}
    {{ $route.query.k }}
    <!-- {{ keyword }}
    {{ k }} -->
  </div>
</template>

<script>
export default {
  name: 'search',
  // props: ['keyword', 'k']
}
</script>

<style>
</style>