<template>
  <div>
    <h1>Buttons</h1>

    <h2>Default</h2>
    <p>
      <sr-button>Default</sr-button>
      <sr-button variant="primary">
        Primary
      </sr-button>
      <sr-button
        variant="secondary"
      >
        Secondary
      </sr-button>
      <sr-button
        type="danger"
        variant="danger"
      >
        Danger
      </sr-button>
    </p>

    <h2>Sizes</h2>
    <p>
      <sr-button
        size="large"
      >
        A large button
      </sr-button>
      <sr-button
        size="regular"
      >
        Regular
      </sr-button>
      <sr-button
        size="small"
      >
        Small
      </sr-button>
      <sr-button
        size="extra-small"
      >
        Extra Small
      </sr-button>
    </p>

    <h2>Icons</h2>
    <sr-button
      variant="primary"
      type="primary"
      icon-left="search"
    >
      Search
    </sr-button>
    <sr-button
      variant="primary"
      icon="poop"
      icon-weight="solid"
    >
    </sr-button>

    <sr-button
      icon="heart"
      weight="light"
    >
      Label
    </sr-button>

    <br>

    <sr-button
      variant="primary"
      icon-left="alicorn"
      icon-left-weight="solid"
      icon-right="mug-marshmallows"
      icon-right-weight="solid"
    >
      Hot chocolate
    </sr-button>

    <h2>States</h2>
    <sr-button disabled>
      Default(Disabled)
    </sr-button>
    <br>
    <sr-button
      type="primary"
      variant="primary"
      disabled
    >
      Primary(Disabled)
    </sr-button>
    <sr-button
      type="secondary"
      variant="secondary"
      disabled
    >
      Secondary(Disabled)
    </sr-button>
    <sr-button
      type="danger"
      variant="danger"
      disabled
    >
      Danger(Disabled)
    </sr-button>
    <br>

    <h2>Groups</h2>
    <h4>Basic</h4>
    <button-group>
      <sr-button>cancel</sr-button>
      <sr-button>
        determine
      </sr-button>
    </button-group>
    <button-group>
      <sr-button disabled>
        Yesterday
      </sr-button>
      <sr-button disabled>
        Today
      </sr-button>
      <sr-button disabled>
        Tomorrow
      </sr-button>
    </button-group>
    <button-group>
      <sr-button type="primary">
        L
      </sr-button>
      <sr-button>M</sr-button>
    </button-group>

    <h4>Icons</h4>
    <button-group>
      <sr-button
        icon-left="chevron-left"
      >
        Back
      </sr-button>
      <sr-button
        icon-right="chevron-right"
      >
        Forward
      </sr-button>
    </button-group>
    <button-group>
      <sr-button
        icon="arrow-left"
      >
      </sr-button>
      <sr-button
        variant="secondary"
        icon="arrow-right"
      >
      </sr-button>
    </button-group>

    <h4>Sizes</h4>
    <button-group
      size="large"
      variant="secondary"
    >
      <sr-button>
        A large button
      </sr-button>
      <sr-button>
        A large button
      </sr-button>
    </button-group>
    <button-group variant="secondary">
      <sr-button>
        Default
      </sr-button>
      <sr-button>
        Default
      </sr-button>
    </button-group>
    <button-group
      size="small"
      variant="secondary"
    >
      <sr-button>
        Small
      </sr-button>
      <sr-button>
        Small
      </sr-button>
    </button-group>
    <button-group
      size="extra-small"
      variant="secondary"
    >
      <sr-button>
        Extra Small
      </sr-button>
      <sr-button>
        Extra Small
      </sr-button>
    </button-group>
  </div>
</template>

<script>
import SrButton from 'Components/button';

export default {
  components: {SrButton},
};
</script>
