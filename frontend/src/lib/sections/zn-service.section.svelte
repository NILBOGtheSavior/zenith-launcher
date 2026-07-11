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
    let services = $state<Service[]>([]);

    onMount(async () => {
        const { data } = await apiFetch("/docker/services");
        services = data;
    });

    async function addService({
        containerName,
        name,
        url,
    }: {
        containerName: string;
        name: string;
        url: string;
    }) {
        await apiFetch("/docker/services", {
            method: "POST",
            body: JSON.stringify({ containerName, name, url }),
        });
        const { data } = await apiFetch("/docker/services");
        services = data;
    }

    async function removeService(id: number) {
        await apiFetch(`/docker/services/${id}`, { method: "DELETE" });
        const { data } = await apiFetch("/docker/services");
        services = data;
    }
</script>

<div class="zn-grid">
    {#each services as service}
        <ZnService
            icon={service.name.slice(0, 2).toUpperCase()}
            name={service.name}
            url={service.url}
            status={service.status}
            onremove={() => removeService(service.id)}
        />
    {/each}
    {#if $editMode}
        <ZnService
            name="Add Service"
            onclick={() => (modalOpen = true)}
        />
    {/if}
</div>
<ZnAddService
    open={modalOpen}
    onclose={() => (modalOpen = false)}
    onsubmit={addService}
/>
