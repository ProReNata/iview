<template>
  <div>
    <Button>Default</Button>
    <Button type="primary">
      Primary
    </Button>
    <Button type="text">
      Text
    </Button>
    <br><br>
    <Button type="info">
      Info
    </Button>
    <Button type="success">
      Success
    </Button>
    <Button type="warning">
      Warning
    </Button>
    <Button type="error">
      Error
    </Button>
    <br><br>
    <Button
      type="primary"
      icon="search"
    >
      Search
    </Button>
    <br><br>
    <Button>Default</Button>
    <Button disabled>
      Default(Disabled)
    </Button>
    <br>
    <Button type="primary">
      Primary
    </Button>
    <Button
      type="primary"
      disabled
    >
      Primary(Disabled)
    </Button>
    <br>
    <Button type="text">
      Text
    </Button>
    <Button
      type="text"
      disabled
    >
      Text(Disabled)
    </Button>
    <br><br>

    <br><br>
    <h4>基本</h4>
    <br><br>
    <Button-group>
      <Button>取消</Button>
      <Button type="primary">
        确定
      </Button>
    </Button-group>
    <Button-group>
      <Button disabled>
        昨日
      </Button>
      <Button disabled>
        今日
      </Button>
      <Button disabled>
        明日
      </Button>
    </Button-group>
    <Button-group>
      <Button type="primary">
        L
      </Button>
      <Button>M</Button>
    </Button-group>
    <br><br>
    <h4>配合图标</h4>
    <br><br>
    <Button-group>
      <Button type="primary">
        <Icon type="chevron-left">
        </Icon>
        前进
      </Button>
      <Button type="primary">
        后退
        <Icon type="chevron-right">
        </Icon>
      </Button>
    </Button-group>
    <Button-group>
      <Button
        type="primary"
        icon="arrow-left"
      >
      </Button>
      <Button
        type="primary"
        icon="arrow-right"
      >
      </Button>
    </Button-group>
    <br><br>
    <h4>尺寸</h4>
    <br><br>
    <Button-group size="large">
      <Button>
        Large
      </Button>
      <Button>
        Large
      </Button>
    </Button-group>
    <Button-group>
      <Button>
        Default
      </Button>
      <Button>
        Default
      </Button>
    </Button-group>
    <Button-group size="small">
      <Button>
        Small
      </Button>
      <Button>
        Small
      </Button>
    </Button-group>
  </div>
</template>
<script>
export default {};
</script>
