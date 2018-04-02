
# vue-svg-sprite-loader

Webpack loader that takes a sprite svg and return a Vue component with the svg inline as template that can be imported.


## Installation

```
npm install --save-dev vue-svg-sprite-loader
```

## Configuration

```js
// webpack.config.js
{
  test: /\.svg$/,
  loader: 'vue-svg-sprite-loader',
  options: {
    // Removes svg title, default is false when not passing any options
    removeTitle: true
  }
}
```

## Example code

```html
<template>
  <div id="my-component">
    <h1>Be aware! <alert-icon></alert-icon></h1>
    <span>Hey next to this text should be an heart icon <heart-icon></heart-icon></span>
  </div>
</template>

<script>
import HeartIcon from './assets/iconsSprite.svg?love';
import AlertIcon from './assets/iconsSprite.svg?alert';

export default {
  name: 'my-component',
  components: {
    'heart-icon': HeartIcon,
    'alert-icon': AlertIcon
  }
};
</script>
```
---
*The idea behind this was inspired by [vue-svg-loader](https://github.com/visualfanatic/vue-svg-loader)*.