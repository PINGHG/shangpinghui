<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend />
    <Rank></Rank>
    <Like></Like>
    <Floor />
    <Floor />
    <Brand />
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer"
import Recommend from "@/pages/Home/Recommend"
import Rank from "@/pages/Home/Rank"
import Like from "@/pages/Home/Like"
import Brand from "@/pages/Home/Brand"
import Floor from "@/pages/Home/Floor"

export default {
  name: 'Home',
  components: {
    ListContainer, Recommend, Rank, Like, Brand,Floor
  }
}
</script>

<style>
</style>