import { useFormContext, useWatch } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { skillsByDepartment } from '@/lib/mockData';
import { FormData } from '@/app/page';
import { Input } from '../ui/input';

export default function SkillsStep() {
  const { control } = useFormContext<FormData>();
  const department = useWatch({ control, name: 'jobDetails.department' });
  const remotePreference = useWatch({ control, name: 'skills.remoteWorkPreference' });
  const selectedSkills = useWatch({ control, name: 'skills.primarySkills' });
  
  const departmentSkills = department ? skillsByDepartment[department] : [];
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Skills & Preferences</h2>
      
      <FormField
        control={control}
        name="skills.primarySkills"
        render={() => (
          <FormItem>
            <FormLabel>Primary Skills (Select at least 3)</FormLabel>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {departmentSkills.map((skill) => (
                <FormField
                  key={skill}
                  control={control}
                  name="skills.primarySkills"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={skill}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(skill)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, skill])
                                : field.onChange(
                                    field.value?.filter((value) => value !== skill)
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{skill}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {selectedSkills && selectedSkills.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Experience for Selected Skills (years)</h3>
          {selectedSkills.map((skill) => (
            <FormField
              key={skill}
              control={control}
              name={`skills.experience.${skill}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{skill}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      max="50"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="skills.workingHours.start"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="skills.workingHours.end"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={control}
        name="skills.remoteWorkPreference"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Remote Work Preference: {field.value}%</FormLabel>
            <FormControl>
              <Slider
                min={0}
                max={100}
                step={5}
                defaultValue={[field.value]}
                onValueChange={(value) => field.onChange(value[0])}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {remotePreference > 50 && (
        <FormField
          control={control}
          name="skills.managerApproved"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Manager has approved remote work over 50%
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
      )}
      
      <FormField
        control={control}
        name="skills.extraNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Extra Notes (Optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Any additional information..."
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}