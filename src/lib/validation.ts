import { z } from 'zod';

const phoneRegex = /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/;

export const personalInfoSchema = z.object({
  fullName: z.string()
    .min(1, 'Full name is required')
    .refine((name) => name.trim().split(/\s+/).length >= 2, {
      message: 'Full name must contain at least 2 words',
    }),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().regex(phoneRegex, 'Phone number must be in format +1-123-456-7890'),
  dateOfBirth: z.string()
    .refine((dob) => {
      const birthDate = new Date(dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      return age > 18 || (age === 18 && monthDiff >= 0);
    }, 'Must be at least 18 years old'),
  profilePicture: z.instanceof(File).optional().or(z.null()),
}).refine((data) => {
  if (data.profilePicture) {
    const validTypes = ['image/jpeg', 'image/png'];
    const maxSize = 2 * 1024 * 1024; // 2MB
    return validTypes.includes(data.profilePicture.type) && data.profilePicture.size <= maxSize;
  }
  return true;
}, {
  message: 'Profile picture must be JPG/PNG and under 2MB',
  path: ['profilePicture'],
});

export const jobDetailsSchema = z.object({
  department: z.enum(['Engineering', 'Marketing', 'Sales', 'HR', 'Finance']),
  positionTitle: z.string().min(3, 'Position title must be at least 3 characters'),
  startDate: z.string()
    .refine((date) => new Date(date) >= new Date(new Date().setHours(0, 0, 0, 0)), {
      message: 'Start date cannot be in the past',
    })
    .refine((date) => {
      const selectedDate = new Date(date);
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 90);
      return selectedDate <= maxDate;
    }, 'Start date cannot be more than 90 days in the future'),
  jobType: z.enum(['Full-time', 'Part-time', 'Contract']),
  salaryExpectation: z.number().min(0, 'Salary must be a positive number'),
  manager: z.string().min(1, 'Manager is required'),
}).superRefine((data, ctx) => {
  // Department-specific validation for start date (HR/Finance can't start on weekend)
  if (['HR', 'Finance'].includes(data.department)) {
    const startDate = new Date(data.startDate);
    const dayOfWeek = startDate.getDay(); // 0 = Sunday, 5 = Friday, 6 = Saturday
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'HR and Finance cannot start on a Friday or Saturday',
        path: ['startDate'],
      });
    }
  }

  // Salary validation based on job type
  if (data.jobType === 'Full-time') {
    if (data.salaryExpectation < 30000 || data.salaryExpectation > 200000) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Full-time salary must be between $30,000 and $200,000',
        path: ['salaryExpectation'],
      });
    }
  } else if (data.jobType === 'Contract') {
    if (data.salaryExpectation < 50 || data.salaryExpectation > 150) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Contract hourly rate must be between $50 and $150',
        path: ['salaryExpectation'],
      });
    }
  }
});

export const skillsSchema = z.object({
  primarySkills: z.array(z.string()).min(3, 'Select at least 3 primary skills'),
  experience: z.record(z.string(), z.number().min(0).max(50)),
  workingHours: z.object({
    start: z.string(),
    end: z.string(),
  }).refine((data) => data.start < data.end, {
    message: 'End time must be after start time',
  }),
  remoteWorkPreference: z.number().min(0).max(100),
  managerApproved: z.boolean().optional(),
  extraNotes: z.string().max(500, 'Notes cannot exceed 500 characters').optional(),
}).refine((data) => {
  if (data.remoteWorkPreference > 50 && !data.managerApproved) {
    return false;
  }
  return true;
}, {
  message: 'Manager approval is required for remote work preference over 50%',
  path: ['managerApproved'],
});

export const emergencyContactSchema = z.object({
  contactName: z.string().min(1, 'Contact name is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  phoneNumber: z.string().regex(phoneRegex, 'Phone number must be in format +1-123-456-7890'),
  guardianContact: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
  }).optional(),
});

export const reviewSchema = z.object({
  confirmation: z.boolean().refine(val => val, {
    message: 'You must confirm that all information is correct',
  }),
});

export const formSchema = z.object({
  personalInfo: personalInfoSchema,
  jobDetails: jobDetailsSchema,
  skills: skillsSchema,
  emergencyContact: emergencyContactSchema,
  review: reviewSchema.optional(),
});