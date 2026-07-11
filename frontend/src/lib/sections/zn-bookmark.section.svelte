<script lang="ts">
    import ZnBookmark from "$lib/components/zn-bookmark.svelte";
    import ZnAddBookmark from "$lib/modal/zn-bookmark.modal.svelte";

    import { onMount } from "svelte";
    import { apiFetch } from "$lib/api.js";
    import ZnToggle from "$lib/widgets/zn-toggle.svelte";
    import { editMode } from "$lib/stores.js";

    let modalOpen = $state(false);

    let bookmarks = $state<
        { id: number; url: string; title: string; tags: string }[]
    >([]);

    onMount(async () => {
        const { data } = await apiFetch("/bookmarks");
        bookmarks = data;
    });

    async function addBookmark({ url, name }: { url: string; name: string }) {
        console.log("Button clicked");
        await apiFetch("/bookmarks", {
            method: "POST",
            body: JSON.stringify({
                url,
                title: name,
            }),
        });
        const { data } = await apiFetch("/bookmarks");
        bookmarks = data;
    }

    async function removeBookmark(id: number) {
        await apiFetch(`/bookmarks/${id}`, { method: "DELETE" });
        const { data } = await apiFetch("/bookmarks");
        bookmarks = data;
    }
</script>

<div class="zn-grid">
    {#each bookmarks as bookmark}
        <ZnBookmark
            name={bookmark.title}
            url={bookmark.url}
            onremove={() => removeBookmark(bookmark.id)}
        />
    {/each}
    {#if $editMode}
        <ZnBookmark
            name="Add Bookmark"
            onclick={() => (modalOpen = true)}
        />
    {/if}
</div>
<ZnAddBookmark
    open={modalOpen}
    onclose={() => (modalOpen = false)}
    onsubmit={addBookmark}
/>

