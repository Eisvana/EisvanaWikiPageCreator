<script setup lang="ts">
import { storeToRefs } from "pinia";
import {
	useGalleryStore,
	type FileItem,
} from "./stores/gallery";
import { watchEffect, type Ref, onMounted, ref } from "vue";
import Sortable, { type SortableEvent } from "sortablejs";
import GalleryItem from "./components/GalleryItem.vue";
import { pageData, staticBooleans } from "../../variables/objects";
import { errorMessage } from "../../common";
import { explanation } from "../tooltip";

const galleryUpload = ref<HTMLInputElement | null>(null);
const filePreview = ref<HTMLDivElement | null>(null);

const isPreviewHidden = ref(false);

onMounted(() => {
	if (window.matchMedia("(pointer: coarse)").matches || !filePreview.value)
		return;
	new Sortable(filePreview.value, {		// NoSonar (used by a library, not useless!)
		handle: ".handle", // handle's class
		animation: 250,
		onUpdate: function (evt: SortableEvent) {
			dragItem(evt);
		},
	});
});

const galleryStore = useGalleryStore();
const { galleryFiles, locationFiles } = storeToRefs(galleryStore);

function dragItem(evt: SortableEvent) {
	const oldIndex = evt.oldIndex;
	const newIndex = evt.newIndex;
	if (!(typeof oldIndex === "number" && typeof newIndex === "number")) return;
	const extractedItem = galleryFiles.value.splice(oldIndex, 1);
	galleryFiles.value.splice(newIndex, 0, extractedItem[0]);
}

let id = 0;

function addFilesToStoreGallery(e: Event) {
	if (!(e.target instanceof HTMLInputElement)) return;
	const files = e.target.files;
	if (!files) return;
	const fileArray = Array.from(files);

	const errors: string[] = [];
	const uploadSizeLimit = 10000000;

	const largeFiles = fileArray.filter(file => file.size > uploadSizeLimit)
	for (const file of largeFiles) {
		const div = document.createElement('div');
		div.innerText = file.name;
		errors.push(div.outerHTML);
	}

	const validFiles = fileArray.filter(file => !largeFiles.includes(file))

	buildFileItem(Array.from(validFiles), galleryFiles);

	// If errors exist, show error message. Otherwise, clear error message
	if (galleryUpload.value) errorMessage(galleryUpload.value, errors.length ? `The following file(s) exceed the 10MB upload limit and couldn't be added:${errors.join('')}` : undefined);

	// If galleryUploadShown is true, exit the function. Otherwise, show gallery explanation popup
	if (staticBooleans.galleryUploadShown) return;

	// the galleryExplanationExternal() function should return string with the popup text. HTML is supported.
	if (pageData.galleryExplanationExternal) {
		explanation('Gallery',
			`${pageData.galleryExplanationExternal}
	<div class="mt-3"><span class="has-text-weight-bold">NOTE</span>: You can access this popup at any time by clicking on the "?" next to the gallery upload button.</div>`);
	}
	staticBooleans.galleryUploadShown = true;
}

watchEffect(() => {
	const galleryFileCount = galleryFiles.value.length;
	const locationGalleryFileCount = locationFiles.value.length;

	const totalFiles = galleryFileCount + locationGalleryFileCount;

	const maxFiles = 5;

	if (
		totalFiles > maxFiles &&
		(pageData.pageType === "fauna" || pageData.pageType === "sandworm")
	) {
		const locationDescs = ['Moon Page', 'Planet Page', 'System Page', 'Galaxy Map'];
		const lowercaseDescs = locationDescs.map((item) => item.toLowerCase());
		const locationItems = galleryFiles.value.filter((item) =>
			lowercaseDescs.includes(item.desc.toLowerCase())
		);

		for (let i = locationItems.length - 1; i >= 0; i--) {
			const fileItem = locationItems[i];
			const locIndex = lowercaseDescs.indexOf(fileItem.desc.toLowerCase());
			fileItem.desc = locationDescs[locIndex];

			locationFiles.value.push(fileItem);
			const index = galleryFiles.value.indexOf(fileItem);
			galleryFiles.value.splice(index, 1);
		}

		for (let i = locationFiles.value.length - 1; i >= 0; i--) {
			const fileItem = locationFiles.value[i];
			if (lowercaseDescs.includes(fileItem.desc.toLowerCase())) continue;
			moveToGalleryArray(fileItem);
		}

		locationFiles.value = locationDescs.flatMap((desc) =>
			locationFiles.value.filter((item) => item.desc === desc)
		);
	} else {
		for (let i = locationFiles.value.length - 1; i >= 0; i--) {
			moveToGalleryArray(locationFiles.value[i]);
		}
	}
});

function moveToGalleryArray(fileItem: FileItem) {
	galleryFiles.value.push(fileItem);
	const index = locationFiles.value.indexOf(fileItem);
	locationFiles.value.splice(index, 1);
}

function buildFileItem(files: File | File[], storeLoc: Ref<FileItem[]>) {
	for (const file of [files].flat()) {
		storeLoc.value.unshift({
			id: id++,
			desc: "",
			file,
		});
	}
}

function galleryFileItem(fileItem: FileItem) {
	return fileItem.file.name + (fileItem.desc ? "|" + fileItem.desc : "");
}

function togglePreview() {
	isPreviewHidden.value = !isPreviewHidden.value;
}
</script>

<template>
	<input ref="galleryUpload" accept="image/*" type="file" id="galleryUpload" multiple @change="addFilesToStoreGallery" />

	<Teleport to="#galleryItems">
		<div v-if="galleryFiles.length" class="gallery-preview-header">
			<label class="has-text-weight-bold">Gallery Preview</label>
			<button class="button" @click="togglePreview">{{ isPreviewHidden ?
				'Show' : 'Hide' }}</button>
		</div>
		<div v-show="!isPreviewHidden">
			<div v-show="galleryFiles.length" ref="filePreview" class="gallery-preview">
				<GalleryItem v-for="fileItem in galleryFiles" :key="fileItem.id" :file-item="fileItem" :is-loc="false" />
			</div>
			<div v-if="locationFiles.length" class="gallery-preview">
				<label class="has-text-weight-bold">Location Files</label>
				<GalleryItem v-for="fileItem in locationFiles" :key="fileItem.id" :file-item="fileItem" :is-loc="true" />
			</div>
		</div>
	</Teleport>

	<Teleport to="#gallery">
		<div id="gallery">
			<div>==Gallery==</div>
			<div>&lt;gallery&gt;</div>
			<div id="galleryOutput">
				<div v-for="fileItem in galleryFiles" :key="fileItem.id">
					{{ galleryFileItem(fileItem) }}
				</div>
			</div>
			<div>&lt;gallery&gt;</div>
		</div>
		<br />
		<div id="locationGallery" v-if="locationFiles.length">
			<div>===Location===</div>
			<div>&lt;gallery&gt;</div>
			<div id="locationGalleryOutput">
				<div v-for="fileItem in locationFiles" :key="fileItem.id">
					{{ galleryFileItem(fileItem) }}
				</div>
			</div>
			<div>&lt;gallery&gt;</div>
		</div>
	</Teleport>
</template>

<style scoped lang="scss">
.gallery-preview-header {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	gap: 1rem;
	margin-block-end: .5rem;
}
</style>