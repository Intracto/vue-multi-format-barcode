## MFB Scanner (vue-multi-format-barcode)
> Multi-format 1D/2D barcode image processing component in Vue 2+, based on zxing-js library.

### Demo
Demo: -

### Install

```bash
yarn add vue-multi-format-barcode
```

### How to

In main.js:

```javascript
import Vue from 'vue'
import MultiFormatBarcode from 'vue-multi-format-barcode'

Vue.use(MultiFormatBarcode)
```

In App.vue:

```vue
<multi-format-barcode />
```

### Props & Events

```html
  <multi-format-barcode width="1280" heigth="720" @onDecode="getResult" />
```

### FAQ

--

### Development / Contribution

You'll need vue cli globally to debug the component.

```bash
npm install -g @vue/cli
npm install -g @vue/cli-service-global
```

Start a development server for the component

```bash
vue serve MultiFormatBarcode.vue
```

