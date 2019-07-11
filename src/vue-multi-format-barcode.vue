<template>
    <div class="c-mfb-scanner__wrapper">
        <video id="mfb-scanner"
               class="mfb-scanner"
               ref="mfb-scanner"
               :width="width"
               :height="height"
        ></video>
        <div class="laser"></div>
    </div>
</template>

<script>
  // TODO BarcodeFormat, DecodeHintType should be loaded, when implementing hints with custom formats
  import {BrowserMultiFormatReader} from '@zxing/library';

  export default {
    name: "VueMultiFormatBarcode",
    props: {
      width: {type: String, default: "1280"},
      height: {type: String, default: "720"}
    },
    data() {
      return {
        scanner: null
      }
    },
    mounted() {
      this.initScanner();
    },
    methods: {
      // init default scanner with all possible formats
      initScanner() {
        this.scanner = new BrowserMultiFormatReader();
        this.scanner.decodeFromInputVideoDevice(undefined, this.$refs['mfb-scanner']).then((result) => {
          // Send the full results with all values
          this.$emit('onDecode', result);
        }).catch((e) => {
          console.error(e);
        });
      }
    },
    beforeDestroy() {
      this.scanner.reset();
    }
  }
</script>

<style lang="scss">
    .c-mfb-scanner__wrapper {
        position: relative;
        height: auto;
        overflow: hidden;

        .mfb-scanner {
            max-width: 100%;
            object-fit: cover;
            border-radius: 4px;
        }

        video {
            min-width: 100%;
            min-height: 100%;
        }

        .laser {
            width: 90%;
            margin-left: 5%;
            background-color: red;
            height: 1px;
            position: absolute;
            top: 10%;
            z-index: 3;
            animation: scanning 3s infinite;
        }
    }

    @keyframes scanning {
        50% {
            transform: translateY(240px);
        }
    }
</style>