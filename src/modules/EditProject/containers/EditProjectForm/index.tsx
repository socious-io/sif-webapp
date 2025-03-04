import Button from 'src/modules/General/components/Button';
import FileUploader from 'src/modules/General/components/FileUploader';
import Input from 'src/modules/General/components/Input';
import MultiSelect from 'src/modules/General/components/MultiSelect';
import TiptapEditor from 'src/modules/General/components/RichTextEditor';
import LocationSearchDropdown from 'src/modules/General/containers/LocationSearchDropdown';
import variables from 'src/styles/constants/_exports.module.scss';

import { useEditProjectForm } from './useEditProjectForm';
import ProjectEditHeader from '../../components/ProjectEditHeader';
import FormColumnTemplate from '../../templates/FormColumnTemplate';

const EditProjectForm: React.FC = () => {
  const {
    goBack,
    items,
    options,
    selectedCardId,
    setSelectedCardId,
    onSelectCauses,
    onSelectLocation,
    isEnabled,
    socialCauses,
    register,
    handleSubmit,
    onSubmit,
    setValue,
    description,
    imagePreview,
    watch,
  } = useEditProjectForm();
  console.log('data', description);
  return (
    <div className="container pt-12 pb-24 md:pb-16">
      <ProjectEditHeader onDiscard={goBack} onPublish={handleSubmit(onSubmit)} disabled={false} />
      <FormColumnTemplate title="Location" subtitle="What best describes why you're fundraising?">
        <LocationSearchDropdown onSelect={location => console.log(location)} />
      </FormColumnTemplate>
      <FormColumnTemplate title="Social cause" subtitle="What best describes why you're fundraising?">
        <MultiSelect
          id={'social-causes'}
          max={5}
          items={items}
          placeholder={'Search a social cause'}
          componentValue={socialCauses}
          setComponentValue={items => console.log(items)}
          customHeight="156px"
          chipBorderColor={variables.color_primary_200}
          chipBgColor={variables.color_primary_50}
          chipFontColor={variables.color_primary_700}
          chipIconColor={variables.color_primary_500}
        />
      </FormColumnTemplate>
      <FormColumnTemplate title="Project name" subtitle="What is your project name?">
        <Input placeholder="What is your project name?" register={register} name="name" required />
      </FormColumnTemplate>
      <FormColumnTemplate title="Website" subtitle="You project’s website">
        <Input
          placeholder="You project’s website"
          register={register}
          name="website"
          //   errors={errors['projectName']?.message ? [errors['projectName']?.message.toString()] : undefined}
          required
        />
      </FormColumnTemplate>
      <FormColumnTemplate title="Project description" subtitle="What your project is about?" isLarge>
        <TiptapEditor
          placeholder="Enter a description..."
          value={watch('description')}
          setValue={setValue}
          // errors={errors['description']?.message ? [errors['description']?.message.toString()] : undefined}
        />
      </FormColumnTemplate>
      <FormColumnTemplate title="Cover Photo" isLarge>
        <>
          <img className="w-full rounded-lg mb-8" alt="banner" src={imagePreview} />
          <FileUploader
            files={[]}
            onDropFiles={() => console.log}
            fileTypes={['PNG', 'JPG', 'GIF']}
            maxSize={2}
            showFileName={false}
          />
        </>
      </FormColumnTemplate>
      <FormColumnTemplate title="Wallet" isLarge>
        <></>
      </FormColumnTemplate>
      <div className="flex  flex-row-reverse p-6 gap-3 justify-start">
        <Button color="info" variant="outlined" onClick={goBack}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" onClick={goBack}>
          Publish
        </Button>
      </div>
    </div>
  );
};
export default EditProjectForm;
