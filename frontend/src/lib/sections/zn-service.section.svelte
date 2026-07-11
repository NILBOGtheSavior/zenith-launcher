<script lang="ts">
    import ZnService from "$lib/components/zn-service.svelte";
    import ZnAddService from "$lib/modal/zn-service.modal.svelte";

    import { onMount } from "svelte";
    import { apiFetch } from "$lib/api.js";
    import { editMode } from "$lib/stores.js";

    type Service = {
        id: number;
        container_name: string;
        name: string;
        url: string;
        icon: string;
        status: string;
    };

    let modalOpen = $state(false);
    let editingService = $state<Service | null>(null);
    let services = $state<Service[]>([]);

    onMount(async () => {
        const { data } = await apiFetch("/docker/services");
        services = data;
    });

    async function refresh() {
        const { data } = await apiFetch("/docker/services");
        services = data;
    }

    function openCreate() {
        editingService = null;
        modalOpen = true;
    }

    function openEdit(service: Service) {
        editingService = service;
        modalOpen = true;
    }

    async function saveService({
        id,
        containerName,
        name,
        url,
    }: {
        id?: number;
        containerName: string;
        name: string;
        url: string;
    }) {
        if (id) {
            await apiFetch(`/docker/services/${id}`, {
                method: "PUT",
                body: JSON.stringify({ containerName, name, url }),
            });
        } else {
            await apiFetch("/docker/services", {
                method: "POST",
                body: JSON.stringify({ containerName, name, url }),
            });
        }
        await refresh();
    }

    async function deleteService(id: number) {
        await apiFetch(`/docker/services/${id}`, { method: "DELETE" });
        await refresh();
    }
</script>

<div class="zn-grid">
    {#each services as service}
        <ZnService
            icon={service.name.slice(0, 2).toUpperCase()}
            name={service.name}
            url={service.url}
            status={service.status}
            onedit={() => openEdit(service)}
        />
    {/each}
    {#if $editMode}
        <ZnService name="Add Service" onclick={openCreate} />
    {/if}
</div>
<ZnAddService
    open={modalOpen}
    editing={editingService}
    onclose={() => (modalOpen = false)}
    onsubmit={saveService}
    ondelete={deleteService}
/>
