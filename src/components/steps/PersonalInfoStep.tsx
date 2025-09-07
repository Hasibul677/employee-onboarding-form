import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormData } from '@/app/page';

export default function PersonalInfoStep() {
  const { control } = useFormContext<FormData>();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Personal Information</h2>

      <FormField
        control={control}
        name="personalInfo.fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="personalInfo.email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="john.doe@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="personalInfo.phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="+1-123-456-7890" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="personalInfo.dateOfBirth"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Birth</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="personalInfo.profilePicture"
        render={({ field: { onChange, onBlur, ref, name } }) => (
          <FormItem>
            <FormLabel>Profile Picture (Optional)</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept=".jpg,.jpeg,.png"
                name={name}
                onBlur={onBlur}
                ref={ref}
                onChange={(e) => onChange(e.target.files?.[0] || null)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />


    </div>
  );
}