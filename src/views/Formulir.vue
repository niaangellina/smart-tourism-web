<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10">
        <v-card>
          <v-card-text>
            <center>
              <h1>Form Registrasi Kartu Pengunjung</h1>
            </center>
            <v-row>
              <v-col>
                <v-text-field label="Nama Lengkap"></v-text-field>
                <v-text-field label="ID Kartu"></v-text-field>
                <v-text-field label="Umur"></v-text-field>
                <v-text-field label="Jenis Kelamin"></v-text-field>
                <v-text-field label="Kota"></v-text-field>
                <center>
                  <v-btn rounded color="primary" dark>Submit</v-btn>
                </center>
              </v-col>
              <v-col>
                <v-img
                  src="https://picsum.photos/id/0/300/300"
                  max-width="500"
                  max-height="300"
                ></v-img>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Formulir",
};
</script>
