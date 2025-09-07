import { useFormContext, useWatch } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormData } from '@/app/page';


const relationships = [
  'Parent',
  'Spouse',
  'Sibling',
  'Child',
  'Friend',
  'Other'
];

export default function EmergencyContactStep() {
  const { control } = useFormContext<FormData>();
  const dateOfBirth = useWatch({ control, name: 'personalInfo.dateOfBirth' });
  
  // Calculate age based on date of birth
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };
  
  const isUnder21 = dateOfBirth ? calculateAge(dateOfBirth) < 21 : false;
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Emergency Contact</h2>
      
      <FormField
        control={control}
        name="emergencyContact.contactName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contact Name</FormLabel>
            <FormControl>
              <Input placeholder="Emergency contact name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="emergencyContact.relationship"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Relationship</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {relationships.map((relationship) => (
                  <SelectItem key={relationship} value={relationship}>
                    {relationship}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="emergencyContact.phoneNumber"
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
      
      {isUnder21 && (
        <div className="space-y-4 p-4 border rounded-md">
          <h3 className="font-medium">Guardian Contact (Required for employees under 21)</h3>
          
          <FormField
            control={control}
            name="emergencyContact.guardianContact.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guardian Name</FormLabel>
                <FormControl>
                  <Input placeholder="Guardian name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="emergencyContact.guardianContact.phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guardian Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1-123-456-7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
}