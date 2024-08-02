<!-- register.svelte -->
<script lang="ts">
	import { A, Button, Card, Heading, Input, Label, Span } from 'flowbite-svelte';
	import { EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';
	import type { ActionData } from './$types';

	export let form: ActionData;
	let showPassword = false;
</script>

<div
	class="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-800"
>
	<Heading tag="h1" class="mb-4 text-center"><Span gradient>con</Span>tra</Heading>
	<Card>
		<form action="?/login" method="POST" class="flex flex-col space-y-6">
			<Heading tag="h4">Sign in</Heading>
			<Label class="space-y-2">
				<span>Email</span>
				<Input type="email" name="email" placeholder="name@company.com" required />
			</Label>
			<Label class="space-y-2">
				<span>Password</span>
				<Input
					id="password"
					name="password"
					type={showPassword ? 'text' : 'password'}
					placeholder="Your password here"
					required
				>
					<button
						slot="left"
						on:click={() => (showPassword = !showPassword)}
						class="pointer-events-auto"
					>
						{#if showPassword}
							<EyeOutline class="h-6 w-6" />
						{:else}
							<EyeSlashOutline class="h-6 w-6" />
						{/if}
					</button>
				</Input>
			</Label>
			<Button type="submit" class="w-full">Login to your account</Button>
			<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
				Not registered? <A href="/register">Create new account</A>
			</div>
			{#if form?.credentials}
				<p class="error">You have entered the wrong credentials.</p>
			{/if}
		</form>
	</Card>
</div>
