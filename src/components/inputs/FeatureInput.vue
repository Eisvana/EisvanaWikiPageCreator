<script setup lang="ts">
// import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import '../../scss/components/vue3-multiselect.scss'
import { ref, watchEffect } from 'vue';
import Multiselect from '@suadelabs/vue3-multiselect';

type Option = { english: string; spanish: string };

const value = ref<Option[]>([]);
const options: Option[] = [
  { english: 'Pilgrim Geobay', spanish: 'Geobahía para Peregrina' },
  { english: 'Nomad Geobay', spanish: 'Geobahía para Nómada' },
  { english: 'Roamer Geobay', spanish: 'Geobahía para Vagabundo' },
  { english: 'Colossus Geobay', spanish: 'Geobahía para Coloso' },
  { english: 'Message Module', spanish: 'Módulo de mensajes' },
  { english: 'Signal Booster', spanish: 'Intensificador de señal' },
  { english: 'Save Beacon', spanish: 'Baliza de guardado' },
  { english: 'Save Point', spanish: 'Punto de guardado' },
  { english: 'Communications Station', spanish: 'Estación de comunicación' },
  { english: 'Atmosphere Harvester', spanish: 'Recolector de atmósfera' },
  { english: 'Autonomous Mining Unit', spanish: 'Unidad de Extracción Autónoma' },
  { english: 'Portable Refiner', spanish: 'Refinería portátil' },
  // { english: 'Base Computer', spanish: 'Ordenador de base' },
  { english: 'Oxygen Harvester', spanish: 'Recolector de oxígeno' },
  { english: 'Blueprint Analyser', spanish: 'Analizador de planos' },
  { english: 'Marine Shelter', spanish: 'Refugio marino' },
  { english: 'Landing Pad', spanish: 'Plataforma de aterrizaje' },
  { english: 'Base Teleport Module', spanish: 'Módulo de teletransporte de base' },
  { english: 'Base Salvage Capsule', spanish: 'Cápsula de recuperación de base' },
  { english: 'Galactic Trade Terminal', spanish: 'Terminal de Comercio Galáctico' },
  { english: 'Health Station', spanish: 'Estación de salud' },
  { english: 'Hazard Protection Unit', spanish: 'Unidad de protección frente a peligros' },
  { english: 'Medium Refiner', spanish: 'Refinería mediana' },
  { english: 'Large Refiner', spanish: 'Refinería grande' },
  { english: 'Appearance Modifier', spanish: 'Modificador de apariencia' },
  { english: 'Albumen Pearl Orb', spanish: 'Orbe de perla albuminosa' },
  { english: 'Albumen Pearl', spanish: 'Perla albuminosa' },
  { english: 'Echinocactus', spanish: 'Equinocactus' },
  { english: 'Cactus Flesh', spanish: 'Carne de cactus' },
  { english: 'Gutrot Flower', spanish: 'Flor de pudretripas' },
  { english: 'Faecium', spanish: 'Hecesio' },
  { english: 'Frostwort', spanish: 'Heliantemo' },
  { english: 'Frost Crystal', spanish: 'Cristal de escarcha' },
  { english: 'Fungal Cluster', spanish: 'Grupo fúngico' },
  { english: 'Fungal Mould', spanish: 'Moho fúngico' },
  { english: 'Gamma Weed', spanish: 'Hierba gamma' },
  { english: 'Gamma Root', spanish: 'Raíz de gamma' },
  { english: 'Gravitino Host', spanish: 'Huésped de gravitino' },
  { english: 'Gravitino Ball', spanish: 'Bola de gravitino' },
  { english: 'Mordite Root', spanish: 'Raíz de mordita' },
  { english: 'Mordite', spanish: 'Mordita' },
  { english: 'NipNip', spanish: 'NipNip' },
  { english: 'NipNip Buds', spanish: 'Brotes de NipNip' },
  { english: 'Solar Vine', spanish: 'Vid solar' },
  { english: 'Solanium', spanish: 'Solanio' },
  { english: 'Star Bramble', spanish: 'Zarza estelar' },
  { english: 'Star Bulb', spanish: 'Bulbo estelar' },
  { english: 'Venom Urchin', spanish: 'Erizo de mar venenoso' },
  { english: 'Sac Venom', spanish: 'Saco de veneno' },
  { english: 'Weapons Terminal', spanish: 'Terminal de Armas' },
  { english: 'Science Terminal', spanish: 'Terminal Científica' },
  { english: 'Exocraft Terminal', spanish: 'Terminal de exonaves' },
  { english: 'Construction Terminal', spanish: 'Terminal de construcción' },
  { english: 'Agricultural Terminal', spanish: 'Terminal Agrícola' },
];

const element = document.getElementById('features');

watchEffect(() => {
  if (element)
    element.innerText = value.value
      .map((item) => `* [[${item.english}]]`)
      .join('\n');
});
</script>

<template>
  <Multiselect
    v-model="value"
    :options="options"
    :multiple="true"
    :close-on-select="false"
    :label="'spanish'"
    :track-by="'english'"
    :selectedLabel="'Seleccionado'"
    :select-label="'Presiona enter para seleccionar'"
    :deselect-label="'Presiona enter para eliminar'"
    placeholder="Seleccionar"
  ></Multiselect>
</template>




<!-- <script setup lang="ts">
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import { ref, watchEffect } from 'vue';
import Multiselect from '@suadelabs/vue3-multiselect';

const value = ref('');
const options = ['Exocraft Summoning Station',
  'Pilgrim Geobay',
  'Nomad Geobay',
  'Roamer Geobay',
  'Colossus Geobay',
  'Message Module',
  'Signal Booster',
  'Save Beacon',
  'Save Point',
  'Communications Station',
  'Atmosphere Harvester',
  'Autonomous Mining Unit',
  'Portable Refiner',
  'Base Computer',
  'Oxygen Harvester',
  'Blueprint Analyser',
  'Marine Shelter',
  'Landing Pad',
  'Base Teleport Module',
  'Base Salvage Capsule',
  'Galactic Trade Terminal',
  'Health Station',
  'Hazard Protection Unit',
  'Medium Refiner',
  'Large Refiner',
  'Appearance Modifier',
  'Albumen Pearl Orb',
  'Albumen Pearl',
  'Echinocactus',
  'Cactus Flesh',
  'Gutrot Flower',
  'Faecium',
  'Frostwort',
  'Frost Crystal',
  'Fungal Cluster',
  'Fungal Mould',
  'Gamma Weed',
  'Gamma Root',
  'Gravitino Host',
  'Gravitino Ball',
  'Mordite Root',
  'Mordite',
  'NipNip',
  'NipNip Buds',
  'Solar Vine',
  'Solanium',
  'Star Bramble',
  'Star Bulb',
  'Venom Urchin',
  'Sac Venom',
  'Weapons Terminal',
  'Science Terminal',
  'Exocraft Terminal',
  'Construction Terminal',
  'Agricultural Terminal'
];

const element = document.getElementById('features');

watchEffect(() => {
  if (element)
    element.innerText = [value.value]
      .flat()
      .map((item) => `* [[${item}]]`)
      .join('\n');
});
</script>

<template>
  <Multiselect
    class="select-multi"
    v-model="value"
    :options="options"
    :multiple="true"
    :close-on-select="false"
  ></Multiselect>
</template> -->
