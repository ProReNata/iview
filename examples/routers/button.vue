<template>
  <div>
    <h1>Buttons</h1>

    <h2>Default</h2>
    <p>
      <i-button>Default</i-button>
      <i-button type="primary">
        Primary
      </i-button>
      <i-button type="text">
        Text
      </i-button>
    </p>

    <h2>Colors</h2>
    <i-button type="info">
      Info
    </i-button>
    <i-button type="success">
      Success
    </i-button>
    <i-button type="warning">
      Warning
    </i-button>
    <i-button type="error">
      Error
    </i-button>

    <h2>Icons</h2>
    <i-button
      type="primary"
      icon="search"
    >
      Search
    </i-button>
    <i-button icon="poop">
    </i-button>
    <br>
    <i-button
      icon="mug-marshmallows"
      icon-weight="solid"
      size="large"
    >
      Hot choclate
    </i-button>

    <h2>States</h2>
    <i-button>Default</i-button>
    <i-button disabled>
      Default(Disabled)
    </i-button>
    <br>
    <i-button type="primary">
      Primary
    </i-button>
    <i-button
      type="primary"
      disabled
    >
      Primary(Disabled)
    </i-button>
    <br>
    <i-button type="text">
      Text
    </i-button>
    <i-button
      type="text"
      disabled
    >
      Text(Disabled)
    </i-button>

    <h2>Groups</h2>
    <h4>Basic</h4>
    <button-group>
      <i-button>cancel</i-button>
      <i-button type="primary">
        determine
      </i-button>
    </button-group>
    <button-group>
      <i-button disabled>
        Yesterday
      </i-button>
      <i-button disabled>
        Today
      </i-button>
      <i-button disabled>
        Tomorrow
      </i-button>
    </button-group>
    <button-group>
      <i-button type="primary">
        L
      </i-button>
      <i-button>M</i-button>
    </button-group>

    <h4>Icons</h4>
    <button-group>
      <i-button type="primary">
        <icon type="chevron-left">
        </icon>
        Back
      </i-button>
      <i-button type="primary">
        Forward
        <icon type="chevron-right">
        </icon>
      </i-button>
    </button-group>
    <button-group>
      <i-button
        type="primary"
        icon="arrow-left"
      >
      </i-button>
      <i-button
        type="primary"
        icon="arrow-right"
      >
      </i-button>
    </button-group>

    <h4>Sizes</h4>
    <button-group size="large">
      <i-button>
        Large
      </i-button>
      <i-button>
        Large
      </i-button>
    </button-group>
    <button-group>
      <i-button>
        Default
      </i-button>
      <i-button>
        Default
      </i-button>
    </button-group>
    <button-group size="small">
      <i-button>
        Small
      </i-button>
      <i-button>
        Small
      </i-button>
    </button-group>
  </div>
</template>

<script>
export default {};
</script>
