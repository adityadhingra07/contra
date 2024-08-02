<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { Navbar, NavBrand, NavLi, NavUl, Span } from 'flowbite-svelte';
</script>

<Navbar class="w-full border-b px-2 py-2.5 sm:px-4">
	<NavBrand href="/dashboard">
		<div class="text-xl"><Span gradient class="font-semibold">con</Span>tra</div>
	</NavBrand>
	<NavUl>
		{#if $page.data.user}
			<NavLi href="/dashboard" active={true}>Dashboard</NavLi>
			<NavLi href="/profile">Profile</NavLi>
			<NavLi href="/logout">Logout</NavLi>
		{:else}
			<NavLi href="/login">Login</NavLi>
		{/if}
	</NavUl>
</Navbar>
<slot></slot>
