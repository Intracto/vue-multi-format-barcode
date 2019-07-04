<template>
    <div class="c-mfb-scanner">
        <video id="scanner"
               class="scanner"
               ref="scanner"
               :width="width"
               :height="height"
        ></video>
        <div class="laser"></div>
    </div>
</template>

<script>
  import {BrowserMultiFormatReader, BarcodeFormat, DecodeHintType} from '@zxing/library';

  export default {
    name: "MultiFormatBarcode",
    props: {
      width: {type: String, default: "1280"},
      height: {type: String, default: "720"},
      enableQrcode: {type: Boolean, default: true},
      enableBarcode: {type: Boolean, default: true}
    },
    data() {
      return {
        scanner: null,
        hints: null
      }
    },
    created() {
      if (!this.enableBarcode) {
        const formats = [BarcodeFormat.QR_CODE];
        this.hints = new Map();
        this.hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
      }
    },
    mounted() {
      this.initScanner();
    },
    methods: {
      // init default scanner with QR and Barcode
      // hints = null = instance loads all formats
      initScanner() {
        this.scanner = new BrowserMultiFormatReader(this.hints);
        this.scanner.decodeFromInputVideoDevice(undefined, this.$refs.scanner).then((result) => {
          this.getScannerResult(result);
        }).catch((e) => {
          console.error(e);
        });
      },

      // get result
      getScannerResult(result) {
        this.$emit('result', result);
      },

      resetScanner() {
        this.scanner.reset();
      }
    },
    beforeDestroy() {
      this.resetScanner();
    }
  }
</script>

<style lang="scss">
    .c-mfb-scanner {
        position: relative;
        height: auto;
        overflow: hidden;

        .scanner {
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

    .c-flashlight-icon {
        position: absolute;
        top: 0;
        right: 0;
        height: 44px;
    }

    .c-error-manual {
        padding-top: 1em;
        padding-bottom: 1em;
        border-top: 2px solid #efefef;
    }

    .btn-close {
        position: absolute;
        right: 10px;
        top: 20px;
    }

    .ex-images {
        max-width: 100%;
    }

    @keyframes scanning {
        50% {
            transform: translateY(240px);
        }
    }
</style>
