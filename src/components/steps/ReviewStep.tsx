// components/steps/ReviewStep.tsx
import { useFormContext, useWatch } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { mockManagers } from '@/lib/mockData';
import { FormData } from '@/app/page';

export default function ReviewStep() {
  const { control } = useFormContext<FormData>();
  
  const personalInfo = useWatch({ control, name: 'personalInfo' });
  const jobDetails = useWatch({ control, name: 'jobDetails' });
  const skills = useWatch({ control, name: 'skills' });
  const emergencyContact = useWatch({ control, name: 'emergencyContact' });
  
  const selectedManager = mockManagers.find(manager => manager.id === jobDetails.manager);
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Review Your Information</h2>
      
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Personal Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium">{personalInfo.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{personalInfo.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="font-medium">{personalInfo.phoneNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p className="font-medium">{personalInfo.dateOfBirth}</p>
          </div>
          {personalInfo.profilePicture && (
            <div>
              <p className="text-sm text-gray-500">Profile Picture</p>
              <p className="font-medium">{personalInfo.profilePicture.name}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Job Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Department</p>
            <p className="font-medium">{jobDetails.department}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Position Title</p>
            <p className="font-medium">{jobDetails.positionTitle}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Start Date</p>
            <p className="font-medium">{jobDetails.startDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Job Type</p>
            <p className="font-medium">{jobDetails.jobType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              {jobDetails.jobType === 'Contract' ? 'Hourly Rate' : 'Annual Salary'}
            </p>
            <p className="font-medium">
              ${jobDetails.salaryExpectation}
              {jobDetails.jobType === 'Contract' ? '/hour' : ''}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Manager</p>
            <p className="font-medium">
              {selectedManager ? `${selectedManager.name} (${selectedManager.department})` : 'Not selected'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Skills & Preferences</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Primary Skills</p>
            <ul className="list-disc list-inside">
              {skills.primarySkills?.map((skill) => (
                <li key={skill} className="font-medium">
                  {skill} {skills.experience && skills.experience[skill] ? `(${skills.experience[skill]} years)` : ''}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm text-gray-500">Working Hours</p>
            <p className="font-medium">
              {skills.workingHours?.start} - {skills.workingHours?.end}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Remote Work Preference</p>
            <p className="font-medium">{skills.remoteWorkPreference}%</p>
          </div>
          {skills.remoteWorkPreference > 50 && (
            <div>
              <p className="text-sm text-gray-500">Manager Approval</p>
              <p className="font-medium">{skills.managerApproved ? 'Approved' : 'Not approved'}</p>
            </div>
          )}
          {skills.extraNotes && (
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Extra Notes</p>
              <p className="font-medium">{skills.extraNotes}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Emergency Contact</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Contact Name</p>
            <p className="font-medium">{emergencyContact.contactName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Relationship</p>
            <p className="font-medium">{emergencyContact.relationship}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="font-medium">{emergencyContact.phoneNumber}</p>
          </div>
          {emergencyContact.guardianContact && (
            <>
              <div>
                <p className="text-sm text-gray-500">Guardian Name</p>
                <p className="font-medium">{emergencyContact.guardianContact.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Guardian Phone</p>
                <p className="font-medium">{emergencyContact.guardianContact.phone}</p>
              </div>
            </>
          )}
        </div>
      </div>
      
      <FormField
        control={control}
        name="review.confirmation"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-6">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                I confirm all information is correct
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}