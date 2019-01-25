<template>
  <div>
    <h1>Alerts</h1>
    <h2>Large alerts</h2>
    <Alert
      type="success"
      show-icon="true"
      size="large"
    >
      <template slot="header">
        You're all clear, kid.
      </template>
      Now let's blow this thing and go home!
    </Alert>

    <Alert
      type="warning"
      show-icon="true"
      size="large"
    >
      <template slot="header">
        Traveling through hyperspace isn't like dusting crops, boy!
      </template>
      Without precise calculations we could fly right through a star or bounce too close to a supernova and that'd end your trip real quick, wouldn't it?
    </Alert>

    <Alert
      type="danger"
      show-icon="true"
      size="large"
      closable
    >
      <template slot="header">
        Negative!
      </template>
      It didn't go in. It just impacted on the surface.
    </Alert>

    <Alert
      type="info"
      show-icon="true"
      size="large"
    >
      <template slot="header">
        Rebel base, in range.
      </template>
      You may fire when ready.
      <Button
        slot="action"
        icon="rocket"
        icon-weight="solid"
        size="small"
        type="text"
      >
        Fire
      </Button>
    </Alert>

    <Alert
      type="update"
      show-icon="true"
      size="large"
    >
      <template slot="header">
        I think my eyes are getting better.
      </template>
      Instead of a big dark blur, I see a big light blur.
    </Alert>

    <Alert
      type="tip"
      show-icon
      size="large"
    >
      <template slot="header">
        I sense something...
      </template>
      A presence I haven't felt since...
      <Button
        slot="action"
        size="small"
        type="text"
        icon="check"
        icon-weight="solid"
      >
        Got it
      </Button>
    </Alert>

    <h2>Small alerts</h2>
    <Alert
      type="success"
      closable
    >
      Now let's blow this thing and go home!
    </Alert>

    <Alert
      type="danger"
      show-icon
    >
      It didn't go in. It just impacted on the surface.
    </Alert>

    <Alert
      type="tip"
      show-icon
      closable
    >
      I sense something...
    </Alert>

    <Alert
      show-icon
    >
      <Icon
        slot="icon"
        type="sword"
        weight="regular"
      >
      </Icon>
      Do. Or do not. There is no try.
      <Button
        slot="action"
        size="small"
        type="text"
      >
        Try again
      </Button>
    </Alert>
  </div>
</template>
<script>
// import { Alert, Icon } from 'iview';
export default {
  // components: { Alert, Icon }
};
</script>
