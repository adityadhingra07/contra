import type { Question } from './types';

export const medAdhProgQuestions: Question = {
	medSync: 'Medication Synchronization (Med Sync)',
	mtm: 'Medication Therapy Management (MTM)',
	automatedRefill: 'Automated Refill Programs',
	digitalHealth: 'Digital and Mobile Health Tools',
	patientEducation: 'Patient Education and Counseling',
	incentivePrograms: 'Incentive Programs',
	homeDelivery: 'Home Delivery Services',
	clinicalPharmacist: 'Clinical Pharmacist Interventions',
	adherencePackaging: 'Adherence Packaging Solutions',
	healthCoaching: 'Health Coaching and Support Programs',
	behavioralHealth: 'Behavioral Health Interventions',
	pharmacyLoyalty: 'Pharmacy Loyalty Programs'
};

export const dataSharingQuestions: Question = {
	completeClaimFile:
		'PBM agrees to share a complete claim file, at no charge, at a minimum of a monthly basis during the administration of this contract?',
	limitedDistribution:
		'PBM agrees to share its limited distribution drug list at an NDC level for request and reconciliation purposes.',
	specialtyDrugList:
		'PBM agrees to share its specialty drug list at an NDC level for request and reconciliation purposes.',
	detailedFormulary: 'PBM agrees to share a detailed formulary list at an NDC level.',
	carrierTPAConnectivity: 'PBM will provide a list of all carrier and TPA connectivity.'
};
