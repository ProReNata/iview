<template>
  <div>
    <h1>Buttons</h1>

    <h2>Default</h2>
    <p>
      <Button>Default</Button>
      <Button type="primary">
        Primary
      </Button>
      <Button type="text">
        Text
      </Button>
    </p>

    <h2>Colors</h2>
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

    <h2>Icons</h2>
    <Button
      type="primary"
      icon="search"
    >
      Search
    </Button>
    <Button icon="poop">
    </Button>
    <br>
    <Button
      icon="mug-marshmallows"
      icon-weight="solid"
      size="large"
    >
      Hot choclate
    </Button>

    <h2>States</h2>
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

    <h2>Groups</h2>
    <h4>Basic</h4>
    <Button-group>
      <Button>cancel</Button>
      <Button type="primary">
        determine
      </Button>
    </Button-group>
    <Button-group>
      <Button disabled>
        Yesterday
      </Button>
      <Button disabled>
        Today
      </Button>
      <Button disabled>
        Tomorrow
      </Button>
    </Button-group>
    <Button-group>
      <Button type="primary">
        L
      </Button>
      <Button>M</Button>
    </Button-group>

    <h4>Icons</h4>
    <Button-group>
      <Button type="primary">
        <Icon type="chevron-left">
        </Icon>
        Back
      </Button>
      <Button type="primary">
        Forward
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

    <h4>Sizes</h4>
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
