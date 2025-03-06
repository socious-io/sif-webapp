import Button from 'src/modules/General/components/Button';
import FileUploader from 'src/modules/General/components/FileUploader';
import Input from 'src/modules/General/components/Input';
import MultiSelect from 'src/modules/General/components/MultiSelect';
import RichTextEditor from 'src/modules/General/components/RichTextEditor';
import LocationSearchDropdown from 'src/modules/General/containers/LocationSearchDropdown';
import variables from 'src/styles/constants/_exports.module.scss';
import { translate } from 'src/core/helpers/utils';

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
    register,
    handleSubmit,
    onSubmit,
    setValue,
    description,
    imagePreview,
    watch,
  } = useEditProjectForm();
  return (
    <div className="container px-4 pt-12 pb-24 md:pb-16">
      <ProjectEditHeader onDiscard={goBack} onPublish={handleSubmit(onSubmit)} disabled={false} />
      <FormColumnTemplate
        title={translate('edit-project-location')}
        subtitle={translate('edit-project-location-subtitle')}
      >
        <LocationSearchDropdown onSelect={location => console.log(location)} />
      </FormColumnTemplate>
      <FormColumnTemplate
        title={translate('edit-project-social-cause')}
        subtitle={translate('edit-project-social-cause-subtitle')}
      >
        <MultiSelect
          id={'social-causes'}
          max={5}
          items={items}
          placeholder={translate('edit-project-social-cause-placeholder')}
          componentValue={[]}
          setComponentValue={items => console.log(items)}
          customHeight="156px"
          chipBorderColor={variables.color_primary_200}
          chipBgColor={variables.color_primary_50}
          chipFontColor={variables.color_primary_700}
          chipIconColor={variables.color_primary_500}
        />
      </FormColumnTemplate>
      <FormColumnTemplate title={translate('edit-project-name')} subtitle={translate('edit-project-name-subtitle')}>
        <Input placeholder={translate('edit-project-name-placeholder')} register={register} name="name" required />
      </FormColumnTemplate>
      <FormColumnTemplate
        title={translate('edit-project-website')}
        subtitle={translate('edit-project-website-subtitle')}
      >
        <Input
          placeholder={translate('edit-project-website-placeholder')}
          register={register}
          name="website"
          required
        />
      </FormColumnTemplate>
      <FormColumnTemplate
        title={translate('edit-project-description')}
        subtitle={translate('edit-project-description-subtitle')}
        isLarge
      >
        <RichTextEditor
          register={register}
          name="description"
          label={translate('edit-project-description-label')}
          placeholder={translate('edit-project-description-placeholder')}
          value={description}
          setValue={setValue}
        />
      </FormColumnTemplate>
      <FormColumnTemplate title={translate('edit-project-cover-photo')} isLarge>
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
      <FormColumnTemplate title={translate('edit-project-wallet')} isLarge>
        <></>
      </FormColumnTemplate>
      <div className="flex flex-row-reverse p-6 gap-3 justify-start">
        <Button color="info" variant="outlined" onClick={goBack}>
          {translate('edit-project-cancel')}
        </Button>
        <Button color="primary" variant="contained" onClick={goBack}>
          {translate('edit-project-publish')}
        </Button>
      </div>
    </div>
  );
};
export default EditProjectForm;
