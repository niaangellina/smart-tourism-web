<template>
  <div ref="div" style="width: 100%">
    <canvas ref="canvas" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import jsQR from "jsqr";

export default {
  name: "QrScanner",
  data: () => ({
    video: null,
    context: null
  }),
  computed: {
    ...mapState("qrScanner", ["data", "enabled"])
  },
  methods: {
    drawLine(begin, end, color) {
      this.context.beginPath();
      this.context.moveTo(begin.x, begin.y);
      this.context.lineTo(end.x, end.y);
      this.context.lineWidth = 4;
      this.context.strokeStyle = color;
      this.context.stroke();
    },
    tick() {
      if (
        this.enabled &&
        this.video.readyState === this.video.HAVE_ENOUGH_DATA
      ) {
        const canvas = this.$refs.canvas;

        canvas.width = this.$refs.div.clientWidth;
        canvas.height =
          (this.video.videoHeight * canvas.width) / this.video.videoWidth;

        this.context.scale(-1, 1);
        this.context.drawImage(this.video, 0, 0, -canvas.width, canvas.height);
        this.context.restore();

        const imageData = this.context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert"
        });

        if (code) {
          let pos = code.location;
          this.drawLine(pos.topLeftCorner, pos.topRightCorner, "#FF3B58");
          this.drawLine(pos.topRightCorner, pos.bottomRightCorner, "#FF3B58");
          this.drawLine(pos.bottomRightCorner, pos.bottomLeftCorner, "#FF3B58");
          this.drawLine(pos.bottomLeftCorner, pos.topLeftCorner, "#FF3B58");
          this.$store.dispatch("qrScanner/disable", { data: code.data });
        }
      }

      requestAnimationFrame(this.tick);
    }
  },
  mounted() {
    this.video = document.createElement("video");

    const canvas = this.$refs.canvas;

    canvas.width = this.$refs.div.clientWidth;
    canvas.height = (480 * canvas.width) / 640;

    this.context = canvas.getContext("2d");
    this.context.clearRect(0, 0, canvas.width, canvas.height);
    this.context.rect(0, 0, canvas.width, canvas.height);
    this.context.fillStyle = "#888888";
    this.context.fill();

    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: "environment" }
      })
      .then(stream => {
        this.video.srcObject = stream;
        this.video.setAttribute("playsinline", true);
        this.video.play();
        requestAnimationFrame(this.tick);
      })
      .catch(err => {
        this.$store.dispatch("toast/info", `Kamera tidak tersedia, ${err}`, {
          root: true
        });
      });
  }
};
</script>
