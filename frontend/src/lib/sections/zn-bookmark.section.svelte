<script lang="ts">
    import ZnBookmark from "$lib/components/zn-bookmark.svelte";
    import ZnAddBookmark from "$lib/modal/zn-bookmark.modal.svelte";
    import { onMount } from "svelte";
    import { apiFetch } from "$lib/api.js";
    import { editMode } from "$lib/stores.js";

    type Bookmark = { id: number; url: string; title: string; tags: string };

    let modalOpen = $state(false);
    let editingBookmark = $state<Bookmark | null>(null);
    let bookmarks = $state<Bookmark[]>([]);

    onMount(async () => {
        const { data } = await apiFetch("/bookmarks");
        bookmarks = data;
    });

    async function refresh() {
        const { data } = await apiFetch("/bookmarks");
        bookmarks = data;
    }

    function openCreate() {
        editingBookmark = null;
        modalOpen = true;
    }

    function openEdit(bookmark: Bookmark) {
        editingBookmark = bookmark;
        modalOpen = true;
    }

    async function saveBookmark({
        id,
        url,
        name,
    }: {
        id?: number;
        url: string;
        name: string;
    }) {
        if (id) {
            await apiFetch(`/bookmarks/${id}`, {
                method: "PUT",
                body: JSON.stringify({ url, title: name, tags: [] }),
            });
        } else {
            await apiFetch("/bookmarks", {
                method: "POST",
                body: JSON.stringify({ url, title: name }),
            });
        }
        await refresh();
    }

    async function deleteBookmark(id: number) {
        await apiFetch(`/bookmarks/${id}`, { method: "DELETE" });
        await refresh();
    }
</script>

<div class="zn-grid">
    {#each bookmarks as bookmark}
        <ZnBookmark
            name={bookmark.title}
            url={bookmark.url}
            onedit={() => openEdit(bookmark)}
        />
    {/each}
    {#if $editMode}
        <ZnBookmark name="Add Bookmark" onclick={openCreate} />
    {/if}
</div>

<ZnAddBookmark
    open={modalOpen}
    editing={editingBookmark}
    onclose={() => (modalOpen = false)}
    onsubmit={saveBookmark}
    ondelete={deleteBookmark}
/>
