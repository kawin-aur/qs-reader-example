<template>
  <div class="container">
    <table class="app-table">
      <thead>
        <tr>
          <th>บัตรด้านหน้า</th>
          <th>บัตรด้านหลัง</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <p>กรุณาสแกนบัตร</p>

            <img v-show="!isFrontImageHidden" class="image" ref="frontImage" />

            <button @click="handleScanFrontImage">Scan</button>
          </td>
          <td>
            <p>กรุณาสแกนบัตร</p>

            <img v-show="!isBackImageHidden" class="image" ref="backImage" />

            <button @click="handleScanBackImage">Scan</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <h2>Card Data (MRZ - Machine Readable Zone)</h2>

      <p>
        {{ mrzData || "No Response" }}
      </p>

      <button class="mrz-button" @click="handleClick">Scan Text (MRZ)</button>
    </div>

    <br />

    <div>
      <button class="mrz-button" @click="handleScanFrontCard">
        Scan Front Card (FrontImage)
      </button>
      <button class="mrz-button" @click="handleScanBackCard">
        Scan Back Card (MRZ + BackImage)
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      isFrontImageHidden: true,
      isBackImageHidden: true,
      mrzData: null
    };
  },
  methods: {
    handleClick() {
      return axios
        .post("http://localhost/QSReader/api/mrz")
        .then(({ data }) => {
          this.mrzData = data.data;
        })
        .catch(err => {
          const errorTitle =
            err && err.response ? err.response.statusText : null;
          const errorText = err && err.response ? err.response.data : null;

          this.$swal({
            icon: "error",
            title: errorTitle || "Oops...",
            text: errorText || "Something went wrong!"
          });
        });
    },
    handleScanFrontImage() {
      return axios
        .post("http://localhost/QSReader/api/image")
        .then(({ data }) => {
          this.$refs.frontImage.src = `data:image/png;base64,${data.data}`;
          this.isFrontImageHidden = false;
        })
        .catch(err => {
          const errorTitle =
            err && err.response ? err.response.statusText : null;
          const errorText = err && err.response ? err.response.data : null;

          this.$swal({
            icon: "error",
            title: errorTitle || "Oops...",
            text: errorText || "Something went wrong!"
          });
        });
    },
    handleScanBackImage() {
      return axios
        .post("http://localhost/QSReader/api/image")
        .then(({ data }) => {
          this.$refs.backImage.src = `data:image/png;base64,${data.data}`;
          this.isBackImageHidden = false;
        })
        .catch(err => {
          const errorTitle =
            err && err.response ? err.response.statusText : null;
          const errorText = err && err.response ? err.response.data : null;

          this.$swal({
            icon: "error",
            title: errorTitle || "Oops...",
            text: errorText || "Something went wrong!"
          });
        });
    },
    handleScanFrontCard() {
      return axios
        .post("http://localhost/QSReader/api/card/front")
        .then(({ data }) => {
          this.$refs.frontImage.src = `data:image/png;base64,${data.data}`;
          this.isFrontImageHidden = false;
        })
        .catch(err => {
          const errorTitle =
            err && err.response ? err.response.statusText : null;
          const errorText = err && err.response ? err.response.data : null;

          this.$swal({
            icon: "error",
            title: errorTitle || "Oops...",
            text: errorText || "Something went wrong!"
          });
        });
    },
    handleScanBackCard() {
      return axios
        .post("http://localhost/QSReader/api/card/back")
        .then(({ data }) => {
          this.$refs.backImage.src = `data:image/png;base64,${data.data}`;
          this.isBackImageHidden = false;
          this.mrzData = data.text;
        })
        .catch(err => {
          const errorTitle =
            err && err.response ? err.response.statusText : null;
          const errorText = err && err.response ? err.response.data : null;

          this.$swal({
            icon: "error",
            title: errorTitle || "Oops...",
            text: errorText || "Something went wrong!"
          });
        });
    }
  }
};
</script>

<style>
.container {
  padding: 15%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app-table {
  width: 100%;
  border: 1px solid #000;
  border-collapse: collapse;
}

.app-table button {
  border: 1px solid #3bafca;
  border-radius: 4px;
  padding: 4px 12px;
  font-size: 12px;
  color: #3bafca;
  margin-bottom: 16px;
  font-weight: bold;
  cursor: pointer;
}

.app-table th {
  border: 1px solid #000;
  background-color: #014282;
  color: #fff;
  padding: 8px;
}

.app-table td {
  border: 1px solid #000;
  width: 50%;
}

.image {
  display: block;
  width: 100%;
}

.mrz-button {
  border: 1px solid grey;
  padding: 8px 12px;
  font-weight: bold;
  cursor: pointer;
}
</style>
