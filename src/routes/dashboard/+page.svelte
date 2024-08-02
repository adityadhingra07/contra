<script lang="ts">
	import {
		Button,
		ButtonGroup,
		Heading,
		Hr,
		Input,
		Label,
		Modal,
		P,
		Span,
		StepIndicator,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { FileCirclePlusOutline, InboxOutline } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	import type { Contract, Exclusion } from './types';

	const contracts: Contract[] = $page.data.contracts || [];
	console.log(contracts);
	let contractModal = false;
	let currentStep = 1;
	let steps = ['AWP Discounts', 'Rebate Guarantees'];
	const handleNext = () => {
		currentStep += 1;
	};
	const handlePrevious = () => {
		currentStep -= 1;
	};
	let formData = {
		awpDiscounts: {
			networkGuarantees: {
				brandDiscount: {
					year1: '',
					year2: '',
					year3: ''
				},
				dispensingFee: {
					year1: '',
					year2: '',
					year3: ''
				}
			},
			exclusiveSpeciality: {
				brandEffectiveDiscount: {
					year1: '',
					year2: '',
					year3: ''
				},
				genericEffectiveRate: {
					year1: '',
					year2: '',
					year3: ''
				},
				newToMarket: {
					year1: '',
					year2: '',
					year3: ''
				},
				ldd: {
					year1: '',
					year2: '',
					year3: ''
				}
			}
		},
		rebateGuarantees: {
			exclusions: {
				pcsk9: false,
				vaccines: false,
				otcInsulin: false,
				devices: false,
				hivClaims: false,
				ihsClaims: false
			} as Exclusion
		}
	};
	const exclusions: Exclusion = {
		pcsk9: 'PCSK9',
		vaccines: 'Vaccines',
		otcInsulin: 'OTC Insulin',
		devices: 'Devices',
		hivClaims: 'HIV Claims',
		ihsClaims: 'IHS Claims'
	};
</script>

<div class="flex min-h-screen flex-col items-center bg-gray-50 px-4 py-12">
	<Heading tag="h1" class="mb-4 text-center"><Span gradient>con</Span>tra dashboard</Heading>
	{#if contracts.length === 0}
		<div class="empty-dashboard justify-center text-gray-300">
			<InboxOutline class="h-40 w-40" strokeWidth="1px" />
			<P align="center" size="lg" class="mb-4 text-gray-300">No Contracts</P>
			<Button outline on:click={() => (contractModal = true)}>
				<FileCirclePlusOutline class="mr-2" />
				New Contract
			</Button>
		</div>
	{:else}
		<Table striped hoverable={true}>
			<TableHead>
				<TableHeadCell>Contract</TableHeadCell>
				<TableHeadCell>Signed on</TableHeadCell>
				<TableHeadCell>
					<Button pill class="!p-2" size="md" on:click={() => (contractModal = true)}>
						<FileCirclePlusOutline />
					</Button>
				</TableHeadCell>
			</TableHead>
			<TableBody tableBodyClass="divide-y">
				{#each contracts as contract}
					<TableBodyRow>
						<TableBodyCell>{contract?.url}</TableBodyCell>
						<TableBodyCell>{new Date(contract?.createdAt).toLocaleDateString()}</TableBodyCell>
						<TableBodyCell />
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	{/if}
</div>

<Modal bind:open={contractModal} autoclose={false} class="w-full">
	<form class="flex flex-col items-center space-y-6" action="?/saveContract" method="POST">
		<h3 class="mb-4 text-center text-xl font-medium text-gray-900">New Contract</h3>
		<StepIndicator class="mb-4 w-1/2" {currentStep} {steps} />
		<!--	Step 1	-->
		<div class="space-y-4" hidden={currentStep !== 1}>
			<Heading tag="h6">Network Guarantees</Heading>
			<P weight="semibold" class="text-sm text-gray-400">Brand Discount</P>
			<div class="flex flex-row space-x-2">
				<Input
					bind:value={formData.awpDiscounts.networkGuarantees.brandDiscount.year1}
					type="number"
					placeholder="Year 1"
				/>
				<Input
					bind:value={formData.awpDiscounts.networkGuarantees.brandDiscount.year2}
					type="number"
					placeholder="Year 2"
				/>
				<Input
					bind:value={formData.awpDiscounts.networkGuarantees.brandDiscount.year3}
					type="number"
					placeholder="Year 3"
				/>
			</div>
			<P weight="semibold" class="text-sm text-gray-400">Dispensing Fee</P>
			<div class="flex flex-row space-x-2">
				<Input
					bind:value={formData.awpDiscounts.networkGuarantees.dispensingFee.year1}
					type="number"
					placeholder="Year 1"
				/>
				<Input
					bind:value={formData.awpDiscounts.networkGuarantees.dispensingFee.year2}
					type="number"
					placeholder="Year 2"
				/>
				<Input
					bind:value={formData.awpDiscounts.networkGuarantees.dispensingFee.year3}
					type="number"
					placeholder="Year 3"
				/>
			</div>
			<Hr />
			<Heading tag="h6">Exclusive Speciality</Heading>
			<P weight="semibold" class="text-sm text-gray-400">Brand Effective Discount</P>
			<div class="flex flex-row space-x-2">
				<Input
					bind:value={formData.awpDiscounts.exclusiveSpeciality.brandEffectiveDiscount.year1}
					type="number"
					placeholder="Year 1"
				/>
				<Input
					bind:value={formData.awpDiscounts.exclusiveSpeciality.brandEffectiveDiscount.year2}
					type="number"
					placeholder="Year 2"
				/>
				<Input
					bind:value={formData.awpDiscounts.exclusiveSpeciality.brandEffectiveDiscount.year3}
					type="number"
					placeholder="Year 3"
				/>
			</div>
			<P weight="semibold" class="text-sm text-gray-400">Generic Effective Rate</P>
			<div class="flex flex-row space-x-2">
				<Input
					bind:value={formData.awpDiscounts.exclusiveSpeciality.genericEffectiveRate.year1}
					type="number"
					placeholder="Year 1"
				/>
				<Input
					bind:value={formData.awpDiscounts.exclusiveSpeciality.genericEffectiveRate.year2}
					type="number"
					placeholder="Year 2"
				/>
				<Input
					bind:value={formData.awpDiscounts.exclusiveSpeciality.genericEffectiveRate.year3}
					type="number"
					placeholder="Year 3"
				/>
			</div>
			<P weight="semibold" class="text-sm text-gray-400">New to Market</P>
			<div class="flex flex-row space-x-2">
				<Input
					bind:value={formData.awpDiscounts.exclusiveSpeciality.newToMarket.year1}
					type="number"
					placeholder="Year 1"
				/>
				<Input
					bind:value={formData.awpDiscounts.exclusiveSpeciality.newToMarket.year2}
					type="number"
					placeholder="Year 2"
				/>
				<Input
					bind:value={formData.awpDiscounts.exclusiveSpeciality.newToMarket.year3}
					type="number"
					placeholder="Year 3"
				/>
			</div>
			<P weight="semibold" class="text-sm text-gray-400">LDD</P>
			<div class="flex flex-row space-x-2">
				<Input
					bind:value={formData.awpDiscounts.exclusiveSpeciality.ldd.year1}
					type="number"
					placeholder="Year 1"
				/>
				<Input
					bind:value={formData.awpDiscounts.exclusiveSpeciality.ldd.year2}
					type="number"
					placeholder="Year 2"
				/>
				<Input
					bind:value={formData.awpDiscounts.exclusiveSpeciality.ldd.year3}
					type="number"
					placeholder="Year 3"
				/>
			</div>
		</div>
		<!--	Step 2	-->
		<div class="space-y-4" hidden={currentStep !== 2}>
			<Heading tag="h6">Exclusions</Heading>
			{#each Object.keys(exclusions) as key}
				<div>
					<P weight="semibold" class="text-sm text-gray-400">{exclusions[key]}</P>
					<div class="flex space-x-4">
						<Label>
							<input
								type="radio"
								bind:group={formData.rebateGuarantees.exclusions[key]}
								value={true}
							/> Yes
						</Label>
						<Label>
							<input
								type="radio"
								bind:group={formData.rebateGuarantees.exclusions[key]}
								value={false}
							/> No
						</Label>
					</div>
				</div>
			{/each}
		</div>
		{#if currentStep > steps.length - 1}
			<Button type="submit">Save Contract</Button>
		{/if}
	</form>
	<div class="flex w-full justify-center">
		<ButtonGroup class="*:!ring-primary-700">
			<Button disabled={currentStep < 2} on:click={handlePrevious}>Previous</Button>
			<Button disabled={currentStep > steps.length - 1} on:click={handleNext}>Next</Button>
		</ButtonGroup>
	</div>
</Modal>
