<script setup lang="ts">
/* THIS PAGE IS NOT WORKING CORRECTLY, IT'S A TEST, IT HAS ERRORS IT WILL BE FIXED SOON IF REQUIRED */
import { addStaticPageData, forceDatalistComponent } from '@/common';
import Actions from '@/components/actions/Actions.vue';
import FaunaInfobox from '@/components/infoboxes/FaunaInfobox.vue';
import DiscovererInputs from '@/components/inputs/DiscovererInputs.vue';
import GlyphInput from '@/components/inputs/GlyphInput.vue';
import InfoboxImageInput from '@/components/inputs/InfoboxImageInput.vue';
import ReleaseInput from '@/components/inputs/ReleaseInput.vue';
import ResearchteamInput from '@/components/inputs/ResearchteamInput.vue';
import SimpleInput from '@/components/inputs/SimpleInput.vue';
import creatureBehavioursInput from '@/components/inputs/creatureBehavioursInput.vue';
import creatureNotesInput from '@/components/inputs/creatureNotesInput.vue';
import Explanation from '@/components/structure/Explanation.vue';
import ExplanationError from '@/components/structure/ExplanationError.vue';
import InputColumn from '@/components/structure/InputColumn.vue';
import InputRow from '@/components/structure/InputRow.vue';
import OutputColumn from '@/components/structure/OutputColumn.vue';
import Subgrid from '@/components/structure/Subgrid.vue';
import WikiTemplate from '@/components/structure/WikiTemplate.vue';
import { useMarker } from '@/composables/useMarker';
import floraageDatalist from '@/datalists/floraDatalists';
import floranutSourceDatalist from '@/datalists/floraDatalists3';
import floraNotesDatalist from '@/datalists/floraDatalists4';
import florarootDatalist from '@/datalists/floraDatalists5';
import { useDataValidationStore } from '@/stores/dataValidation';
import { usePageDataStore, useStaticPageDataStore } from '@/stores/pageData';
import { watchDebounced } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watchEffect } from 'vue';

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
  galaxy,
  hub,
  orgName,
  image,
  discovered,
  discoveredlink,
  system,
  planet,
  moon,
  glyphs,
  hemisphere,
  activity,
  rarity,
  type,
  behaviours,
  age,
  gender,
  gender2,
  roots,
  region,
  nutrients,
  notes,
  elements,
  polymorphic,
  discDate,
  docBy,
  researchteam,
  appearance,
  ecosystem,
  sanitisedName: creatureName,
  discoveredName,
  discoveredlinkName,
  systemName,
  planetName,
  moonName,
  originalName,
  docBySentence,
} = storeToRefs(pageData);

const isAgeInvalid = ref('');
const isRootsInvalid = ref('');
const isNutrientsInvalid = ref('');
const isNotesInvalid = ref('');


watchDebounced(age, () => (isAgeInvalid.value = forceDatalistComponent(age.value, Object.keys(floraageDatalist))), {
  debounce: 500,
});
watchDebounced(roots, () => (isRootsInvalid.value = forceDatalistComponent(roots.value, Object.keys(florarootDatalist))), {
  debounce: 500,
});
watchDebounced(
  nutrients,
  () => (isNutrientsInvalid.value = forceDatalistComponent(nutrients.value, Object.keys(floranutSourceDatalist))),
  {
    debounce: 500,
  }
);

watchDebounced(
  notes,
  () => (isNotesInvalid.value = forceDatalistComponent(notes.value, Object.keys(floraNotesDatalist))),
  {
    debounce: 500,
  }
);

watchEffect(() => {
  if (elements.value[0] === elements.value[1]) elements.value[1] = '';
});

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
    <form class="table" @submit.prevent>
      <ReleaseInput />
      <SimpleInput label="Nombre de la criatura:" identifier="nameInput" v-model="name" img="creature/creatureName">
        Introduzca exactamente como se ve en el juego. Cuidado con 0 (cero) y O (o).
        <template #heading>Nombre de la Planta</template>
        <template #content>Introduzca exactamente como se ve en el juego. Cuidado con 0 (cero) y O (o).</template>
      </SimpleInput>
    <!--  <SimpleInput label="Nombre del Hub:" identifier="hubInput" v-model="hub" />-->
      <SimpleInput label="Nombre original antes de registrar (si está disponible):" identifier="orgNameInput"
        v-model="orgName" />
      <SimpleInput label="Nombre de la Galaxia:" identifier="galaxyInput" v-model="galaxy" />
      <SimpleInput label="Nombre de la region:" identifier="regionInput" v-model="region" />
      <InfoboxImageInput />
      <SimpleInput label="Nombre del sistema:" identifier="systemInput" v-model="system" />
      <SimpleInput label="Nombre del planeta:" identifier="planetInput" v-model="planet">
        Nombre del planeta O el planeta rodeado por la luna donde se puede encontrar la planta.
      </SimpleInput>
      <SimpleInput label="Nombre de la luna (si la planta está en la luna):" identifier="moonInput" v-model="moon">
        Si la planta está ubicada en una luna. Déjelo en blanco si la planta está en un planeta.
      </SimpleInput>
      <GlyphInput />
      <InputRow>
        <template #label>
          <label for="genus">Genuses:</label>
          <Explanation img="creature/creatureHemisphere">
            Consulte la wiki para obtener una lista de géneros.
            <template #heading>Hemisferio</template>
            <template #content>
              Consulte la wiki para obtener una lista de géneros.
              El género se define por la apariencia general de una criatura.<br>
              Consulte la wiki para obtener una <a href="Genus#Genus_List" data-wiki>lista de los genuses</a>
            </template>
          </Explanation>
        </template>
        <template #input>
          <select v-model="hemisphere" id="genusInput">
          </select>
        </template>
      </InputRow>
      <InputRow>
        <p>La siguiente información se puede encontrar en el menú de descubrimiento de criaturas.</p>
      </InputRow>
      <InputRow>
        <template #label>
          <label for="hemisphere">Hemisferio:</label>
          <Explanation img="creature/creatureHemisphere">
            Encontrado en el menú de descubrimiento de criaturas.
            <template #heading>Hemisferio</template>
            <template #content>
              Encontrado en el menú de descubrimiento de criaturas.
              <br />
              Si no se proporciona ningún hemisferio, deje la entrada vacía.
            </template>
          </Explanation>
        </template>
        <template #input>
          <select v-model="hemisphere" id="hemisphere">
            <option value=""></option>
            <option value="North">Norte</option>
            <option value="South">Sur</option>
          </select>
        </template>
      </InputRow>
      <InputRow>
        <template #label>
          <label for="rarity">Rareza:</label>
          <Explanation img="creature/creatureRarity">
            Encontrado en el menú de descubrimiento de criaturas.
            <template #heading>Hemisferio</template>
            <template #content>
              Encontrado en el menú de descubrimiento de criaturas.
              <br />
              Si no se proporciona ningún hemisferio, deje la entrada vacía.
            </template>
          </Explanation>
        </template>
        <template #input>
          <select v-model="rarity" id="rarity">
            <option value="Common">Común</option>
            <option value="Uncommon">No común</option>
            <option value="Rare">Raro</option>
          </select>
        </template>
      </InputRow>
      <InputRow>
        <template #label>
          <label for="ecosystem">Ecosistema:</label>
          <Explanation img="creature/creatureEcosystem">
            Encontrado en el menú de descubrimiento de criaturas.
            <template #heading>Ecosistema</template>
            <template #content>
              Encontrado en el menú de descubrimiento de criaturas.
            </template>
          </Explanation>
        </template>
        <template #input>
          <select v-model="ecosystem" id="ecosystem">
            <option value="Ground">Terrestre</option>
            <option value="Flying">Voladora</option>
            <option value="Underwater">Submarina</option>
            <option value="Underground">Subterreánea</option>
          </select>
        </template>
      </InputRow>
      <InputRow>
        <template #label>
          <label for="activity">Actividad:</label>
          <Explanation img="creature/creatureActivity">
            Encontrado en el menú de descubrimiento de criaturas.
            <template #heading>Actividad</template>
            <template #content>
              Encontrado en el menú de descubrimiento de criaturas.
            </template>
          </Explanation>
        </template>
        <template #input>
          <select v-model="activity" id="activity">
            <option value="Always Active">Siempre activa</option>
            <option value="Diurnal">Diurna</option>
            <option value="Nocturnal">Nocturna</option>
            <option value="Mostly Diurnal">Generalmente Diurna</option>
            <option value="Mostly Nocturnal">Generalmente Nocturna</option>
          </select>
        </template>
      </InputRow>
      <div class="tableHeader text">
        <p>La siguiente información se puede encontrar en el escaneo de criaturas.</p>
      </div>
      <InputRow>
        <template #label>
          <label for="gender">Genero:</label>
          <Explanation img="creature/creatureGender">
            Encontrado en el menú de descubrimiento de criaturas.
            <template #heading>Género</template>
            <template #content>
              Encontrado en el menú de descubrimiento de criaturas.
            </template>
          </Explanation>
        </template>
        <template #input>
          <select v-model="gender" id="gender1">
            <option value="Asynchronous">Asíncrono</option>
            <option value="Circular">Circular</option>
            <option value="Electronic">Electrónico</option>
            <option value="Mutable">Mutable</option>
            <option value="Non-boolean">No booleano</option>
            <option value="Non-Euclidean">No euclidiano</option>
            <option value="Uninitialised">No inicializado</option>
            <option value="Unmeasurable">Inmensurable</option>
            <option value="Virtual">Virtual</option>
            <option value="Alpha">Alfa</option>
            <option value="Asymmetric">Asimétrico</option>
            <option value="Asymptotic">Asintótico</option>
            <option value="Exotic">Exótico</option>
            <option value="Female">Hembra</option>
            <option value="Non-uniform">No uniforme</option>
            <option value="None">Ninguno</option>
            <option value="Orthogonal">Ortogonal</option>
            <option value="Prime">Principal</option>
            <option value="Radical">Radical</option>
            <option value="Rational">Racional</option>
            <option value="Symmetric">Simétrico</option>
            <option value="Unknown">Desconocido</option>
            <option value="Vectorised">Vectorizado</option>
          </select>
        </template>
      </InputRow>
      <InputRow>
        <template #label>
          <label for="gender">Segundo Género:</label>
          <Explanation img="">
            Sólo se aplica a ciertos géneros. Se puede encontrar en el escaneo de criaturas.
            <template #heading>Segundo Género</template>
            <template #content>
              Algunos géneros tienen dos géneros, mientras que otros tienen un solo género.<br>
              Las aves, los peces y la fauna rara/anómala, por ejemplo, tienen un solo género.<br>
              Pueden aparecer como dos géneros, pero tendrán exactamente la misma apariencia.
            </template>
          </Explanation>
        </template>
        <template #input>
          <select v-model="gender2" id="gender2">
            <option value="- None">Ninguno</option>
            <option value="- Asynchronous">Asíncrono</option>
            <option value="- Circular">Circular</option>
            <option value="- Electronic">Electrónico</option>
            <option value="- Mutable">Mutable</option>
            <option value="- Non-boolean">No booleano</option>
            <option value="- Non-Euclidean">No euclidiano</option>
            <option value="- Uninitialised">No inicializado</option>
            <option value="- Unmeasurable">Inmensurable</option>
            <option value="- Virtual">Virtual</option>
            <option value="- Alpha">Alfa</option>
            <option value="- Asymmetric">Asimétrico</option>
            <option value="- Asymptotic">Asintótico</option>
            <option value="- Exotic">Exótico</option>
            <option value="- Female">Hembra</option>
            <option value="- Non-uniform">No uniforme</option>
            <option value="- Orthogonal">Ortogonal</option>
            <option value="- Prime">Principal</option>
            <option value="- Radical">Radical</option>
            <option value="- Rational">Racional</option>
            <option value="- Symmetric">Simétrico</option>
            <option value="- Unknown">Desconocido</option>
            <option value="- Vectorised">Vectorizado</option>
          </select>
        </template>
      </InputRow>
      <creatureBehavioursInput />
      <creatureDietsInput />
      <SimpleInput v-model="hemisphere" identifier="weight" label="Peso:" maxlength="5">
        <Explanation img="creature/creatureWeight">
          Encontrado en el escaneo de criaturas. No se necesitan "kg".
          <template #heading>Peso</template>
          <template #content>
            Encontrado en el escaneo de criaturas. No se necesitan "kg".
          </template>
        </Explanation>
      </SimpleInput>
      <SimpleInput v-model="hemisphere" identifier="height" label="Altura:" maxlength="3">
        <Explanation img="creature/creatureWeight">
          Encontrado en el escaneo de criaturas. No se necesitan "m".
          <template #heading>Altura</template>
          <template #content>
            Encontrado en el escaneo de criaturas. No se necesitan "m".
          </template>
        </Explanation>
      </SimpleInput>
      <SimpleInput v-model="hemisphere" identifier="weight2" label="Peso del genero 2: (si hay)" maxlength="5">
        <Explanation img="creature/creatureWeight">
          Encontrado en el escaneo de criaturas. No se necesitan "kg".
          <template #heading>Peso</template>
          <template #content>
            Encontrado en el escaneo de criaturas. No se necesitan "kg".
          </template>
        </Explanation>
      </SimpleInput>
      <SimpleInput v-model="hemisphere" identifier="height2" label="Altura del genero 2: (si hay)" maxlength="3">
        <Explanation img="creature/creatureWeight">
          Encontrado en el escaneo de criaturas. No se necesitan "m".
          <template #heading>Altura</template>
          <template #content>
            Encontrado en el escaneo de criaturas. No se necesitan "m".
          </template>
        </Explanation>
      </SimpleInput>
      <creatureNotesInput />
      <creatureProducesInput />
  <Subgrid>
        <DiscovererInputs />
        <SimpleInput label="Nombre del documentador si no es el descubridor:" identifier="docBy" v-model="docBy" />
        <ResearchteamInput />
      </Subgrid>
      <InputRow>
        <label for="appearance">Apariencia:</label>
        <textarea v-model="appearance" id="appearance" placeholder="Esta flora es una <size> <colour> <type>."></textarea>
      </InputRow>
    </form>

    <div id="galleryInput"></div>
    <div id="galleryItems" class="gallery-items-wrapper"></div>

    <Actions />
  </InputColumn>

  <ExplanationError v-model:open="openErrorModal" :error-message="errorMessage" />

  <OutputColumn @mousedown="markCopy">
    <div ref="wikiText" class="wikiText" id="fullArticle" @mouseup="dataValidationStore.getSelectedText"
      @touchend="dataValidationStore.getSelectedText">
      <div>
        <WikiTemplate template-name="Version">{{ release }}</WikiTemplate>
      </div>
      <FaunaInfobox :creatureName="creatureName" :image="image" :hub="hub" :galaxy="galaxy" :region="region"
        :system-name="systemName" :planet-name="planetName" :moon-name="moonName" :type="type" :glyphs="glyphs"
        :behaviours="behaviours" :polymorphic="polymorphic" :age="age" :gender="gender" :gender2="gender2" :roots="roots"
        :nutrients="nutrients" :notes="notes" :rarity="rarity" :ecosystem="ecosystem" :activity="activity"
        :hemisphere="hemisphere" :elem-primary="elements[0]" :elem-secondary="elements[1]"
        :disc-date="discDate.replaceAll('-', '/')" :discovered-name="discoveredName"
        :discoveredlink-name="discoveredlinkName" :researchteam="researchteam" :release="release" />
      <div>'''{{ creatureName }}''' is a species of flora.</div>
      <br />

      <div>==Summary==</div>
      <div>'''{{ creatureName }}''' is a [[creature]], a member of the {{ hemisphere }} [[genus]]. </div>
      <br />
      <div>==Appearance==</div>
      {{ appearance }}
      <br />
      <div>==Discovery Menu==</div>
      <div>'''Additional Observations''': {{ notes }}</div>
      <br />
      <div>==Alias Names==</div>
      <div v-if="orgName">
        <WikiTemplate template-name="aliasc">text=Original|name={{ originalName }}</WikiTemplate>
      </div>
      <div>
        <WikiTemplate template-name="aliasc">text=Current|name={{ creatureName }}</WikiTemplate>
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
      <div>==Additional Information==</div>
      <div v-if="docBy && docBy !== discoveredlink && docBy !== discovered">Documented by {{ docBySentence }}</div>
      <br />

      <div id="gallery"></div>
    </div>
  </OutputColumn>
</template>
