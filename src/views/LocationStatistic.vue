<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="locationId"
                  label="Lokasi"
                  :items="locations"
                  item-text="name"
                  item-value="id"
                  hide-details
                ></v-select>
              </v-col>
              <v-col v-show="locationId">
                <canvas ref="canvas" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import Chart from "chart.js";
import "../plugins/utility";

export default {
  name: "LocationStatistic",
  data: () => ({
    locationId: null,
    chart: null
  }),
  computed: {
    ...mapState("location", ["locations"]),
    ...mapState("visitor", ["visitors"]),
    ...mapState("card", ["cards"]),
    ...mapState("visitation", ["visitations"]),
    ...mapState("gate", ["gates"])
  },
  watch: {
    locationId(newData) {
      if (newData) {
        const dictionary = {};
        for (let i = 0; i < 7; ++i) {
          const date = new Date();
          date.setDate(date.getDate() - i);

          const dateInput = date.toDateInput();
          for (const visitor of this.visitors) {
            const card = this.cards.find(o => o.id === visitor.cardId) || {};
            if (card.validityDate === dateInput) {
              const visitorVisitations = [];
              for (const visitation of this.visitations) {
                if (visitation.visitorId === visitor.id) {
                  const gate =
                    this.gates.find(o => o.id === visitation.gateId) || {};
                  if (gate.locationId === this.locationId) {
                    visitation.type = gate.type;
                    visitorVisitations.push(visitation);
                  }
                }
              }

              visitorVisitations.sort((a, b) => {
                if (a.timestamp < b.timestamp) {
                  return -1;
                } else if (a.timestamp > b.timestamp) {
                  return 1;
                } else {
                  return 0;
                }
              });

              const calculateVisitation = (start, end) => {
                let time = new Date(start.timestamp);
                time.setMinutes(0);

                const endTime = new Date(end.timestamp);
                while (time.getHours() <= endTime.getHours()) {
                  const key = time.toDateTimeInput();
                  if (key in dictionary) {
                    dictionary[key] += 1;
                  } else {
                    dictionary[key] = 1;
                  }

                  time.setHours(time.getHours() + 1);
                }
              };

              let prevVisitation = null;
              for (const visitation of visitorVisitations) {
                if (visitation.type === "enter") {
                  if (prevVisitation) {
                    calculateVisitation(prevVisitation, visitation);
                    prevVisitation = visitation;
                  } else {
                    prevVisitation = visitation;
                  }
                } else {
                  if (prevVisitation) {
                    if (prevVisitation.type === "enter") {
                      calculateVisitation(prevVisitation, visitation);
                    }
                  }

                  prevVisitation = null;
                }
              }
            }
          }
        }

        let dictionaryKeys = [];
        for (const key in dictionary) {
          dictionaryKeys.push(key);
        }
        dictionaryKeys.sort();

        let labels = [];
        let data = [];
        for (const key of dictionaryKeys) {
          labels.push(new Date(key));
          data.push(dictionary[key]);
        }

        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = data;
        this.chart.update();
      }
    }
  },
  mounted() {
    this.$store.dispatch("location/findAll", { info: true }).then(() => {
      this.$store.dispatch("visitor/findAll");
      this.$store.dispatch("card/findAll");
      this.$store.dispatch("visitation/findAll");
      this.$store.dispatch("gate/findAll");
    });

    let context = this.$refs.canvas.getContext("2d");
    this.chart = new Chart(context, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Jumlah Pengunjung",
            data: []
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              type: "time",
              distribution: "series"
            }
          ]
        }
      }
    });
  }
};
</script>
