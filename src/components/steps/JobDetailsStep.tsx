// components/steps/JobDetailsStep.tsx
import { useFormContext, useWatch } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { mockManagers } from '@/lib/mockData';
import { FormData } from '@/app/page';

export default function JobDetailsStep() {
  const { control, setValue } = useFormContext<FormData>();
  const department = useWatch({ control, name: 'jobDetails.department' });
  const jobType = useWatch({ control, name: 'jobDetails.jobType' });
  
  const filteredManagers = department 
    ? mockManagers.filter(manager => manager.department === department)
    : [];
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Job Details</h2>
      
      <FormField
        control={control}
        name="jobDetails.department"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Department</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="jobDetails.positionTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Position Title</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Senior Developer" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="jobDetails.startDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Start Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="jobDetails.jobType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Job Type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Full-time" />
                  </FormControl>
                  <FormLabel className="font-normal">Full-time</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Part-time" />
                  </FormControl>
                  <FormLabel className="font-normal">Part-time</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Contract" />
                  </FormControl>
                  <FormLabel className="font-normal">Contract</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="jobDetails.salaryExpectation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {jobType === 'Contract' ? 'Hourly Rate ($)' : 'Annual Salary ($)'}
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder={jobType === 'Contract' ? '50-150' : '30000-200000'}
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="jobDetails.manager"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Manager</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!department}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={department ? "Select manager" : "Select department first"} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {filteredManagers.map((manager) => (
                  <SelectItem key={manager.id} value={manager.id}>
                    {manager.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}