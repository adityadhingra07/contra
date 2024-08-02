<script lang="ts">
	import {
		Button,
		ButtonGroup,
		Card,
		Checkbox,
		Heading,
		Hr,
		Input,
		Label,
		Select,
		Span,
		StepIndicator
	} from 'flowbite-svelte';
	import { dataSharingQuestions, medAdhProgQuestions } from './questions';
	import type { Profile } from './types';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	const profile = $page.data.profile;
	let currentStep = 1;
	let steps = ['General Questions', 'Services', 'Contract Requirements'];

	let formData: Profile = {
		pbmName: '',
		parentCompany: '',
		yearFounded: 0,
		headquartersLocation: '',
		marketShare: '',
		numberOfCoveredLives: '',
		contractTypesTraditional: false,
		contractTypesPrebate: false,
		MedPrograms: {
			medSync: '',
			mtm: '',
			automatedRefill: '',
			digitalHealth: '',
			patientEducation: '',
			incentivePrograms: '',
			homeDelivery: '',
			clinicalPharmacist: '',
			adherencePackaging: '',
			healthCoaching: '',
			behavioralHealth: '',
			pharmacyLoyalty: ''
		},
		DataSharing: {
			completeClaimFile: false,
			limitedDistribution: false,
			specialtyDrugList: false,
			detailedFormulary: false,
			carrierTPAConnectivity: false
		}
	};
	const handleNext = () => {
		currentStep += 1;
	};
	const handlePrevious = () => {
		currentStep -= 1;
	};

	onMount(() => {
		if (profile) {
			formData = {
				pbmName: profile.pbmName || '',
				parentCompany: profile.parentCompany || '',
				yearFounded: profile.yearFounded || '',
				headquartersLocation: profile.headquartersLocation || '',
				marketShare: profile.marketShare || '',
				numberOfCoveredLives: profile.numberOfCoveredLives || '',
				contractTypesTraditional: profile.contractTypesTraditional || false,
				contractTypesPrebate: profile.contractTypesPrebate || false,
				MedPrograms: profile.MedPrograms || formData.MedPrograms,
				DataSharing: profile.DataSharing || formData.DataSharing
			};
		}
	});
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
	<Heading tag="h1" class="mb-4 text-center">
		{#if $page.data.user?.isCompleteProfile === true}
			Edit
		{:else}
			Looks like you are new here 👀. Let's create
		{/if}
		your
		<Span gradient>con</Span>tra profile
	</Heading>
	<StepIndicator class="mb-4 w-1/2" {currentStep} {steps} />
	<Card class="mb-4 max-w-xl">
		<form action="?/createOrUpdateProfile" method="POST" class="flex flex-col space-y-4">
			<div class="space-y-4" hidden={currentStep !== 1}>
				<Heading tag="h6">Company Overview</Heading>
				<div>
					<Label for="pbmName" class="mb-2 block">PBM Name</Label>
					<Input
						id="pbmName"
						name="pbmName"
						bind:value={formData.pbmName}
						placeholder="Enter PBM name"
					/>
				</div>
				<div>
					<Label for="parentCompany" class="mb-2 block">Parent Company</Label>
					<Input
						id="parentCompany"
						name="parentCompany"
						bind:value={formData.parentCompany}
						placeholder="Enter parent company"
					/>
				</div>
				<div>
					<Label for="yearFounded" class="mb-2 block">Year Founded</Label>
					<Input
						id="yearFounded"
						name="yearFounded"
						type="number"
						bind:value={formData.yearFounded}
						placeholder="Enter year founded"
					/>
				</div>
				<div>
					<Label for="headquartersLocation" class="mb-2 block">Headquarters Location</Label>
					<Input
						id="headquartersLocation"
						name="headquartersLocation"
						bind:value={formData.headquartersLocation}
						placeholder="Enter headquarters location"
					/>
				</div>
				<Hr class="my-2" />
				<Heading tag="h6">Market Position</Heading>
				<div>
					<Label for="marketShare" class="mb-2 block">Market Share</Label>
					<Input
						id="marketShare"
						name="marketShare"
						bind:value={formData.marketShare}
						placeholder="Enter market share"
						type="number"
					/>
				</div>
				<div>
					<Label for="numberOfCoveredLives" class="mb-2 block">Number of Covered Lives</Label>
					<Input
						id="numberOfCoveredLives"
						name="numberOfCoveredLives"
						bind:value={formData.numberOfCoveredLives}
						placeholder="Enter number of covered lives"
						type="number"
					/>
				</div>
				<Hr class="my-2" />
				<Heading tag="h6">Contract Types</Heading>
				<div class="flex items-center">
					<Checkbox
						id="traditional"
						name="contractTypesTraditional"
						value="true"
						bind:checked={formData.contractTypesTraditional}
					/>
					&nbsp
					<Label for="traditional">Traditional</Label>
				</div>
				<div class="flex items-center">
					<Checkbox
						id="prebate"
						name="contractTypesPrebate"
						value="true"
						bind:checked={formData.contractTypesPrebate}
					/>
					&nbsp
					<Label for="prebate">Prebate</Label>
				</div>
			</div>
			<div class="space-y-4" hidden={currentStep !== 2}>
				<Heading tag="h6">Medication Adherence Programs</Heading>
				{#each Object.keys(medAdhProgQuestions) as key}
					<div>
						<Label for={key} class="mb-2 block">{medAdhProgQuestions[key]}</Label>
						<Select
							id={key}
							name={`medPrograms_${key}`}
							class="mb-2"
							bind:value={formData.MedPrograms[key]}
						>
							<option value="available">Available</option>
							<option value="included">Included</option>
							<option value="additionalFee">Additional Fee</option>
						</Select>
					</div>
				{/each}
			</div>
			<div class="space-y-4" hidden={currentStep !== 3}>
				<Heading tag="h6">Data Sharing</Heading>
				{#each Object.keys(dataSharingQuestions) as key}
					<div>
						<Label for={key} class="mb-2 block">{dataSharingQuestions[key]}</Label>
						<div class="flex space-x-4">
							<Label>
								<input
									type="radio"
									name={`dataSharing_${key}`}
									bind:group={formData.DataSharing[key]}
									value={true}
								/>
								Yes
							</Label>
							<Label>
								<input
									type="radio"
									name={`dataSharing_${key}`}
									bind:group={formData.DataSharing[key]}
									value={false}
								/>
								No
							</Label>
						</div>
					</div>
				{/each}
			</div>
			{#if currentStep > steps.length - 1}
				<Button type="submit" class="w-full">Save Profile</Button>
			{/if}
		</form>
	</Card>
	<ButtonGroup class="*:!ring-primary-700">
		<Button disabled={currentStep < 2} on:click={handlePrevious}>Previous</Button>
		<Button disabled={currentStep > steps.length - 1} on:click={handleNext}>Next</Button>
	</ButtonGroup>
</div>
