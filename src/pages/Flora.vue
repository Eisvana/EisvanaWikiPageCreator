<script setup lang="ts">
import InputColumn from '@/components/structure/InputColumn.vue';
import OutputColumn from '@/components/structure/OutputColumn.vue';
import ReleaseInput from '@/components/inputs/ReleaseInput.vue';
import SimpleInput from '@/components/inputs/SimpleInput.vue';
import InfoboxImageInput from '@/components/inputs/InfoboxImageInput.vue';
import DiscovererInputs from '@/components/inputs/DiscovererInputs.vue';
import GlyphInput from '@/components/inputs/GlyphInput.vue';
import BiomeInput from '@/components/inputs/BiomeInput.vue';
import DatalistWrapper from '@/components/inputs/DatalistWrapper.vue';
import ResourceInput from '@/components/inputs/ResourceInput.vue';
import ResearchteamInput from '@/components/inputs/ResearchteamInput.vue';
import InputRow from '@/components/structure/InputRow.vue';
import Subgrid from '@/components/structure/Subgrid.vue';
import Actions from '@/components/actions/Actions.vue';
import FloraInfobox from '@/components/infoboxes/FloraInfobox.vue';
import WikiTemplate from '@/components/structure/WikiTemplate.vue';
import ExplanationError from '@/components/structure/ExplanationError.vue';
import { addStaticPageData, forceDatalistComponent, numberErrorComponent } from '@/common';
import floraDatalists from '@/datalists/floraDatalists';
import { usePageDataStore, useStaticPageDataStore } from '@/stores/pageData';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useDataValidationStore } from '@/stores/dataValidation';
import { useMarker } from '@/composables/useMarker';
import Explanation from '@/components/structure/Explanation.vue';
import { watchDebounced } from '@vueuse/core';

const staticPageData = useStaticPageDataStore();
const { fullArticleElement } = storeToRefs(staticPageData);

const dataValidationStore = useDataValidationStore();

const wikiText = ref<HTMLDivElement | null>(null);

onMounted(() => {
  fullArticleElement.value = wikiText.value;
  // TODO: gallery should be integrated natively, not as separate Vue app
  addStaticPageData('galleryArray', ['', 'Scanner view', 'Discovery Menu']);
  addStaticPageData(
    'galleryExplanationExternal',
    `
    Hay un orden preferido de imágenes de la galería:
	<div class='dialog-center'>
		<ol class='dialog-list'>
			<li>Vista de escáner</li>
			<li>Menú de descubrimiento</li>
		</ol>
 	</div>`
  );
  import('../startup/gallery');
});

const pageData = usePageDataStore();
const {
  release,
  name,
  orgName,
  image,
  discovered,
  discoveredlink,
  system,
  planet,
  moon,
  glyphs,
  type,
  biome,
  age,
  roots,
  nutrients,
  notes,
  elements,
  polymorphic,
  discDate,
  docBy,
  researchteam,
  appearance,
  region,
  sanitisedName: plantName,
  discoveredName,
  discoveredlinkName,
  systemName,
  planetName,
  moonName,
  originalName,
  docBySentence,
} = storeToRefs(pageData);

const isPolymorphicInvalid = computed(() => numberErrorComponent(polymorphic.value));

const isAgeInvalid = ref('');
const isRootsInvalid = ref('');
const isNutrientsInvalid = ref('');
const isNotesInvalid = ref('');

watchDebounced(age, () => (isAgeInvalid.value = forceDatalistComponent(age.value, floraDatalists.ageData)), {
  debounce: 500,
});
watchDebounced(roots, () => (isRootsInvalid.value = forceDatalistComponent(roots.value, floraDatalists.rootData)), {
  debounce: 500,
});
watchDebounced(
  nutrients,
  () => (isNutrientsInvalid.value = forceDatalistComponent(nutrients.value, floraDatalists.nutSourceData)),
  {
    debounce: 500,
  }
);
watchDebounced(
  notes,
  () => (isNotesInvalid.value = forceDatalistComponent(notes.value, floraDatalists.floraNotesData)),
  {
    debounce: 500,
  }
);

watchEffect(() => {
  if (elements.value[0] === elements.value[1]) elements.value[1] = '';
});

const filledElements = computed(() => elements.value.filter((el) => el));

const errorMessage = ref('');
const openErrorModal = ref(false);

function markCopy() {
  const { isValidData, message } = useMarker();
  errorMessage.value = message.value;
  openErrorModal.value = !isValidData.value;
}
</script>

<template>
  <InputColumn>
    <form
      class="table"
      @submit.prevent
    >
      <ReleaseInput />
      <SimpleInput
        label="Nombre de la Planta:"
        identifier="nameInput"
        v-model="name"
        img="flora/floraName"
      >
      Introduzca exactamente como se ve en el juego. Cuidado con 0 (cero) y O (o).
        <template #heading>Plant Name</template>
        <template #content>Introduzca exactamente como se ve en el juego. Cuidado con 0 (cero) y O (o).</template>
      </SimpleInput>
      <SimpleInput
        label="Nombre original antes de registrar (si está disponible):"
        identifier="orgNameInput"
        v-model="orgName"
      />
      <InfoboxImageInput />
      <SimpleInput
        label="Nombre del sistema:"
        identifier="systemInput"
        v-model="system"
      />
      <SimpleInput
        label="Nombre del planeta:"
        identifier="planetInput"
        v-model="planet"
      >
      Nombre del planeta O el planeta rodeado por la luna donde se puede encontrar la planta.
      </SimpleInput>
      <SimpleInput
        label="Nombre de la luna (si la planta está en la luna):"
        identifier="moonInput"
        v-model="moon"
      >
      Si la planta está ubicada en una luna. Déjelo en blanco si la planta está en un planeta.
      </SimpleInput>
      <GlyphInput />
      <BiomeInput />
      <SimpleInput
        v-model="age"
        :error="isAgeInvalid"
        label="Edad:"
        identifier="age"
        list="ageData"
        img="flora/age"
      >
      Encontrado en el escaneo de flora.
        <template #heading>Edad</template>
        <template #content>Encontrado en el escaneo de flora.</template>
      </SimpleInput>
      <SimpleInput
        v-model="roots"
        :error="isRootsInvalid"
        label="Estructura radical:"
        identifier="roots"
        list="rootData"
        img="flora/roots"
      >
      Encontrado en el escaneo de flora.
        <template #heading>Estructura radical</template>
        <template #content>Encontrado en el escaneo de flora.</template>
      </SimpleInput>
      <SimpleInput
        v-model="nutrients"
        :error="isNutrientsInvalid"
        label="Fuente de nutrientes:"
        identifier="nutSource"
        list="nutSourceData"
        img="flora/nutSource"
      >
      Encontrado en el escaneo de flora.
        <template #heading>Fuente de nutrientes</template>
        <template #content>Encontrado en el escaneo de flora.</template>
      </SimpleInput>
      <SimpleInput
        v-model="notes"
        :error="isNotesInvalid"
        label="Notes:"
        identifier="notes"
        list="floraNotesData"
        img="flora/notes"
      >
      Encontrado en el escaneo de flora.
        <template #heading>Notas</template>
        <template #content>Encontrado en el escaneo de flora.</template>
      </SimpleInput>
      <SimpleInput
        v-model="polymorphic"
        :error="isPolymorphicInvalid"
        identifier="polymorphic"
        label="Polimórfico (number of instances):"
        maxlength="2"
      >
      ¿Cuántos modelos diferentes de esta flora se descubrieron?
        <template #heading>Polimórfico</template>
        <template #content>
          A veces, varios modelos de flora tienen el mismo nombre. Esto se llama "polimorfismo". Introduzca el número de
          cuantos modelos de flora diferentes tenían este nombre.
        </template>
      </SimpleInput>
      <ResourceInput
        :index="0"
        :resources="floraDatalists.floraResources"
        item="flora"
      />
      <ResourceInput
        :index="1"
        :resources="floraDatalists.floraResources"
        item="flora"
      />
      <InputRow>
        <template #label>
          <label for="discDate">Fecha del descubrimiento:</label>
          <Explanation img="flora/discDate">
            Encontrado en el escaneo de flora.
            <template #heading>Fecha del descubrimiento</template>
            <template #content>
              Encontrado en el escaneo de flora.
              <br />
              La marca de tiempo exacta del descubrimiento se muestra en la parte superior izquierda..
            </template>
          </Explanation>
        </template>

        <template #input>
          <input
            v-model="discDate"
            id="discDate"
            type="date"
          />
        </template>
      </InputRow>
      <Subgrid>
        <InputRow>
          <p>Información sobre el jugador.</p>
        </InputRow>
        <DiscovererInputs />
        <SimpleInput
          label="Nombre del documentador si no es el descubridor:"
          identifier="docBy"
          v-model="docBy"
        />
        <ResearchteamInput />
      </Subgrid>
      <InputRow>
        <label for="appearance">Apariencia:</label>
        <textarea
          v-model="appearance"
          id="appearance"
          placeholder="Esta flora es una <size> <colour> <type>."
        ></textarea>
      </InputRow>
    </form>

    <div id="galleryInput"></div>
    <div
      id="galleryItems"
      class="gallery-items-wrapper"
    ></div>

    <Actions />
  </InputColumn>

  <ExplanationError
    v-model:open="openErrorModal"
    :error-message="errorMessage"
  />

  <OutputColumn @mousedown="markCopy">
    <div
      ref="wikiText"
      class="wikiText"
      id="fullArticle"
      @mouseup="dataValidationStore.getSelectedText"
      @touchend="dataValidationStore.getSelectedText"
    >
      <div>
        <WikiTemplate template-name="Version">{{ release }}</WikiTemplate>
      </div>
      <FloraInfobox
        :plant-name="plantName"
        :image="image"
        :region="region"
        :system-name="systemName"
        :planet-name="planetName"
        :moon-name="moonName"
        :type="type"
        :biome="biome"
        :polymorphic="polymorphic"
        :age="age"
        :roots="roots"
        :nutrients="nutrients"
        :notes="notes"
        :elem-primary="elements[0]"
        :elem-secondary="elements[1]"
        :disc-date="discDate.replaceAll('-', '/')"
        :discovered-name="discoveredName"
        :discoveredlink-name="discoveredlinkName"
        :researchteam="researchteam"
        :release="release"
      />
      <div>'''{{ plantName }}''' is a species of flora.</div>
      <br />

      <div>==Summary==</div>
      <div>'''{{ plantName }}''' is a [[species]] of [[flora]]. {{ appearance }}</div>
      <br />
      <template v-if="polymorphic">
        <div>
          <WikiTemplate template-name="Polymorphic">{{ polymorphic }}</WikiTemplate>
        </div>
        <br />
      </template>

      <div>==Alias Names==</div>
      <div v-if="orgName">
        <WikiTemplate template-name="aliasc">text=Original|name={{ originalName }}</WikiTemplate>
      </div>
      <div>
        <WikiTemplate template-name="aliasc">text=Current|name={{ plantName }}</WikiTemplate>
      </div>
      <br />

      <div>==Location==</div>
      <div>
        It can be found on the
        <span v-if="moon">[[moon]] [[{{ moonName }}]] of the</span> [[planet]] [[{{ planetName }}]] in the [[{{
          systemName
        }}]] [[star system]].
      </div>
      <div>
        <WikiTemplate template-name="CoordGlyphConvert">{{ glyphs }}</WikiTemplate>
      </div>
      <br />

      <div>==Usage==</div>
      <div v-if="filledElements.length">
        This flora provides the
        {{ filledElements.length > 1 ? 'resources' : 'resource' }}
        {{ filledElements.map((el) => `[[${el}]]`).join(' and ') }}
        when harvested.
      </div>
      <div v-else>This flora provides no harvestable resources.</div>
      <br />

      <div>==Additional Information==</div>
      <div v-if="docBy && docBy !== discoveredlink && docBy !== discovered">Documented by {{ docBySentence }}</div>
      <br />

      <div id="gallery"></div>
    </div>
  </OutputColumn>
  <DatalistWrapper
    v-for="(list, id) in floraDatalists"
    :identifier="id"
    :data="list"
  />
</template>
