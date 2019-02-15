<template>
  <div>
    <h1>Alerts</h1>
    <h2>Feedback</h2>
    <alert
      type="success"
      :show-icon="true"
      size="large"
    >
      <template slot="header">
        You're all clear, kid.
      </template>
      Now let's blow this thing and go home!
    </alert>

    <alert
      type="warning"
      :show-icon="true"
      size="large"
    >
      <template slot="header">
        Traveling through hyperspace isn't like dusting crops, boy!
      </template>
      Without precise calculations we could fly right through a star or bounce too close to a supernova and that'd end your trip real quick, wouldn't it?
    </alert>

    <alert
      type="danger"
      :show-icon="true"
      size="large"
      closable
    >
      <template slot="header">
        Negative!
      </template>
      It didn't go in. It just impacted on the surface.
    </alert>

    <alert
      type="info"
      :show-icon="true"
      size="large"
    >
      <template slot="header">
        Rebel base, in range.
      </template>
      You may fire when ready.
      <i-button
        slot="action"
        icon="rocket"
        icon-weight="solid"
        size="small"
        type="text"
      >
        Fire
      </i-button>
    </alert>

    <alert
      type="update"
      :show-icon="true"
      size="large"
    >
      <template slot="header">
        I think my eyes are getting better.
      </template>
      Instead of a big dark blur, I see a big light blur.
    </alert>

    <alert
      type="tip"
      show-icon
      size="large"
    >
      <template slot="header">
        I sense something...
      </template>
      A presence I haven't felt since...
      <i-button
        slot="action"
        size="small"
        icon="check"
        icon-weight="solid"
      >
        Got it
      </i-button>
    </alert>

    <h2>Toasts</h2>
    <alert
      type="success"
      closable
    >
      Now let's blow this thing and go home!
    </alert>


    <alert
      type="danger"
      show-icon
    >
      It didn't go in. It just impacted on the surface.
    </alert>

    <alert
      type="tip"
      show-icon
      closable
    >
      I sense something...
    </alert>

    <alert
      show-icon
    >
      <icon
        slot="icon"
        type="sword"
        weight="regular"
        spin
      >
      </icon>
      Do. Or do not. There is no try.
      <i-button
        slot="action"
        size="small"
        type="text"
      >
        Try again
      </i-button>
    </alert>

    <h3>Condensed</h3>

    <!--Condensed Closable-->
    <alert
      type="success"
      closable
      condensed
    >
      Without precise calculations we could fly right through a star or bounce too close to a supernova and that'd end your trip real quick, wouldn't it?
    </alert>

    <!--Condensed Closable small width-->
    <div style="max-width: 15rem">
      <alert
        type="warning"
        closable
        condensed
      >
        Now let's go home!
      </alert>
    </div>

    <!--Condensed Icon Action-->
    <alert
      show-icon
      condensed
    >
      <icon
        slot="icon"
        type="sword"
        weight="regular"
        spin
      >
      </icon>
      Do. Or do not. There is no try.
      <i-button
        slot="action"
        size="small"
        type="text"
      >
        Try again
      </i-button>
    </alert>
  </div>
</template>

<script>
// import { Alert, Icon } from 'iview';
export default {
  // components: { Alert, Icon }
};
</script>
