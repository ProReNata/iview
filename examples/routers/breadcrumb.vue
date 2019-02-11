<style>
.demo-breadcrumb-separator {
  color: #f50;
  padding: 0 5px;
}
</style>
<template>
  <div>
    <breadcrumb separator="<b class='demo-breadcrumb-separator'>=></b>">
      <breadcrumb-item to="/">
        Home4
      </breadcrumb-item>
      <breadcrumb-item :to="{name: 'user', params: { userId: 123 }}">
        Components
      </breadcrumb-item>
      <breadcrumb-item>Breadcrumb</breadcrumb-item>
    </breadcrumb>
    <breadcrumb separator="">
      <breadcrumb-item href="/">
        <template>Home</template>
        <template slot="separator">
          <b style="color: #f50;">
            ->
          </b>
        </template>
      </breadcrumb-item>
      <breadcrumb-item href="/components/page">
        <template>Breadcrumb</template>
        <template slot="separator">
          <b style="color: #f50;">
            ->
          </b>
        </template>
      </breadcrumb-item>
      <breadcrumb-item>Breadcrumb</breadcrumb-item>
    </breadcrumb>
  </div>
</template>
<script>
export default {};
</script>
