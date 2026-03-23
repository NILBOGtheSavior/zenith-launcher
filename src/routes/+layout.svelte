<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
    import styles from '$lib/style.css'

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
    <link rel="styleshet" href={styles} />
</svelte:head>

{@render children()}
